const db = require("../../Model/main");
const Article = db.Article;
const LigneStock = db.ligneStocks;
const EnteteStock = db.enteteStocks;
const Depot = db.depots;
const Dossier = db.Dossier;
const Stock = db.stocks;

const addLigneStock = async (req, res) => {
	const ligneStocksData = req.body;
	console.log("ligneStocksDataFromBack", ligneStocksData);

	if (!ligneStocksData || !Array.isArray(ligneStocksData)) {
		res.status(400).send("Invalid request body");
		return;
	}

	try {
		const groupedData = groupeOperationsByArticleAndDepot(ligneStocksData);
		console.log('group', groupedData)
		const validationPromises = Object.values(groupedData).map(async (group) => {
			const idArticle = group[0].idArticle;
			const enteteStockId = group[0].enteteStockId;
			const depotId = group[0].depotId;

			let article;
			let enteteStock;
			let depotDossier;
			let depot;

			enteteStock = await EnteteStock.findByPk(enteteStockId);
			article = await Article.findByPk(idArticle);
			depotDossier = await Depot.findByPk(enteteStock.depotId);

			if (!depotId) {
				depot = enteteStock.depotId;
			} else {
				depot = await Depot.findByPk(depotId);
				if (!depot || depot.dossierId !== depotDossier.dossierId) {
					throw new Error(
						"Depot is not in the same dossier as enteteStock for ligneStock n° "
					);
				}
				depot = depotId;
			}

			let stock = await Stock.findOne({
				where: {
					idArticle: idArticle,
					depotId: depot,
				},
			});

			let stockQuantity = stock ? stock.Quantite : 0;
			console.log("stockQuantity", stockQuantity);

			// Calculate the final value of quantite for the group
			const entrees = group.filter((data) => data.Type === "Entree");
			console.log('entree', entrees)
			const sorties = group.filter((data) => data.Type === "Sortie");

			const totalEntree = entrees.reduce(
				(sum, data) => sum + parseInt(data.Quantite),
				0
			);

			const totalSortie = sorties.reduce(
				(sum, data) => sum + data.Quantite,
				0
			);
			console.log("totalEntree", totalEntree);
			console.log("totalSortie", totalSortie);

			const finalQuantite = stockQuantity + totalEntree - totalSortie;
			console.log("finalQuantite", finalQuantite);

			// Check if final quantite is not negative
			if (finalQuantite < 0) {
				throw new Error(
					"Not enough quantity in stock for this operation n° " + group[0].id
				);
			}
		});

		await Promise.all(validationPromises);

		// Perform the operations for all groups at once
		const stockPromises = Object.values(groupedData).map(async (group) => {
			const idArticle = parseInt(group[0].idArticle);
			const enteteStockId = parseInt(group[0].enteteStockId);
			const depotId = parseInt(group[0].depotId);

			let article;
			let enteteStock;
			let depotDossier;
			let depot;

			enteteStock = await EnteteStock.findByPk(enteteStockId);
			article = await Article.findByPk(idArticle);
			depotDossier = await Depot.findByPk(enteteStock.depotId);

			if (!depotId) {
				depot = enteteStock.depotId;
			} else {
				depot = await Depot.findByPk(depotId);
				if (!depot || depot.dossierId !== depotDossier.dossierId) {
					throw new Error(
						"Depot is not in the same dossier as enteteStock for ligneStock n° " +
						group[0].id
					);
				}
				depot = depotId;
			}

			let stock = await Stock.findOne({
				where: {
					idArticle: idArticle,
					depotId: depot,
				},
			});

			let stockQuantity = stock ? stock.Quantite : 0;

			// Perform "Entree" operations
			const entrees = group.filter((data) => data.Type === "Entree");
			for (const data of entrees) {
				const Quantite = parseInt(data.Quantite);
				stockQuantity += Quantite;

				if (!stock) {
					stock = await Stock.create({
						idArticle: idArticle,
						depotId: depot,
						Quantite: stockQuantity,
					});
				} else {
					stock.Quantite = stockQuantity;
					await stock.save();
				}

				const ligneStock = await LigneStock.create({
					Quantite: Quantite,
					PrixUnitaire: data.PrixUnitaire,
					idArticle: idArticle,
					enteteStockId: enteteStockId,
					depotId: depot,
					Type: "Entree",
				});
			}

			// Perform "Sortie" operations
			const sorties = group.filter((data) => data.Type === "Sortie");
			for (const data of sorties) {
				const Quantite = parseInt(data.Quantite);
				stockQuantity -= Quantite;

				if (!stock) {
					stock = await Stock.create({
						idArticle: idArticle,
						depotId: depot,
						Quantite: stockQuantity,
					});
				} else {
					stock.Quantite = stockQuantity;
					await stock.save();
				}

				const ligneStock = await LigneStock.create({
					Quantite: Quantite,
					PrixUnitaire: data.PrixUnitaire,
					idArticle: idArticle,
					enteteStockId: enteteStockId,
					depotId: depot,
					Type: "Sortie",
				});
			}

			return groupeOperationsByArticleAndDepot(group);
		});

		const ligneStocks = await Promise.all(stockPromises);

		res.send(ligneStocks.flat());
	} catch (error) {
		res.status(500).send(error.message);
		console.log(error);
	}
};

function groupeOperationsByArticleAndDepot(operations) {
	return operations.reduce((groups, operation) => {
		const key = `${operation.idArticle}-${operation.depotId}`;
		if (!groups[key]) {
			groups[key] = [];
		}
		groups[key].push(operation);
		return groups;
	}, {});
}

const getLigneStock = async (req, res) => {
	const id = req.params.id;
	try {
		const ligneStock = await LigneStock.findByPk(id);
		if (!ligneStock) {
			res.status(404).send("LigneStock not found");
			return;
		}
		res.send(ligneStock);
	} catch (error) {
		console.log(error);
		res.status(500).send("Error");
	}
};

const getLigneStockByEnteteStock = async (req, res) => {
	const enteteStockId = req.params.enteteStockId;
	try {
		const ligneStock = await LigneStock.findAll({
			where: {
				enteteStockId: enteteStockId,
			},
			include:
				[{
					model: Article,
					as: 'Article'
				},]
		});
		res.send(ligneStock);
	} catch (error) {
		console.log(error);
		res.status(500).send("Error");
	}
};

const deleteLigneStock = async (req, res) => {
	const id = req.params.id;
	try {
		const ligneStock = await LigneStock.findByPk(id);
		if (!ligneStock) {
			res.status(404).send("LigneStock not found");
			return;
		}
		await ligneStock.destroy();
		res.status(200).send("LigneStock deleted successfully");
	} catch (error) {
		console.log(error);
		res.status(500).send("Error");
	}
};

const updateLigneStock = async (req, res) => {
	const id = req.params.id;
	const data = {
		Quantite: req.body.Quantite,
		PrixUnitaire: req.body.PrixUnitaire,
	};
	const depotId = req.body.depotId;
	const TypeLigne = req.body.Type;

	try {
		let depot;
		let Type;
		const ligneStock = await LigneStock.findByPk(id);

		if (!ligneStock) {
			res.status(404).send("LigneStock not found");
			return;
		}
		if (depotId) {
			depot = await Depot.findByPk(depotId);
			if (!depot) {
				res.status(400).send("Invalid depotId");
				return;
			}
		}
		depot = depotId;

		if (!TypeLigne) {
			Type = ligneStock.Type;
		} else if (TypeLigne !== "Entree" && TypeLigne !== "Sortie") {
			res.status(400).send("Invalid Type");
			return;
		}

		Type = TypeLigne;

		await ligneStock.update({
			...data,
			depotId: depot,
			Type: Type,
		});
		res.status(200).send("LigneStock updated successfully");
	} catch (error) {
		console.error("Error updating ligneStock:", error);
		res.status(500).send("Failed to update ligneStock");
	}
};

const getAllLigneStockByDossier = async (req, res) => {
	const dossierId = req.params.dossierId;
	try {
		const dossier = await Dossier.findByPk(dossierId, {
			include: [
				{
					model: Article,
					as: "articles",
					include: [
						{
							model: LigneStock,
							as: "ligneStocks",
						},
					],
				},
			],
		});
		if (!dossier) {
			res.status(400).send("Invalid dossierId");
			return;
		}

		const ligneStocks = [];
		dossier.articles.forEach((article) => {
			article.ligneStocks.forEach((ligneStock) => {
				ligneStocks.push(ligneStock);
			});
		});
		res.send(ligneStocks);
	} catch (error) {
		console.error("Error getting ligneStocks by dossierId:", error);
		res.status(500).send("Failed to get ligneStocks by dossierId");
	}
};

const getQuantityByArticleAndDepot = async (req, res) => {
	try {
		const articleId = req.params.articleId;
		const depotId = req.params.depotId;
		const stock = await Stock.findOne({
			where: {
				articleId: articleId,
				depotId: depotId,
			},
		});

		if (!stock) {
			res.send("0");
			return;
		}

		res.send(stock.Quantite.toString());
	} catch (error) {
		console.error("Error getting quantity by articleId and depotId:", error);
		res.status(500).send("Failed to get quantity by articleId and depotId");
	}
};

const updateQuantite = async (req, res) => {
	const articleId = req.params.articleId;
	const depotId = req.params.depotId;
	const quantite = req.params.quantite;

	try {
		const stock = await Stock.findOne({
			where: {
				articleId: articleId,
				depotId: depotId,
			},
		});

		if (!stock) {
			res.status(404).send("Stock not found");
			return;
		}

		await stock.update({
			Quantite: quantite,
		});

		res.send(stock);
	} catch (error) {
		console.error("Error updating quantity by articleId and depotId:", error);
		res.status(500).send("Failed to update quantity by articleId and depotId");
	}
};

module.exports = {
	addLigneStock,
	getLigneStock,
	getLigneStockByEnteteStock,
	deleteLigneStock,
	updateLigneStock,
	getAllLigneStockByDossier,
	getQuantityByArticleAndDepot,
	updateQuantite,
};
