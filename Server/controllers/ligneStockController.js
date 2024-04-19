const db = require("../models");
const Article = db.articles;
const LigneStock = db.ligneStocks;
const EnteteStock = db.enteteStocks;
const Depot = db.depots;
const Dossier = db.dossiers;
const Stock = db.stocks;

const addLigneStock = async (req, res) => {
	const data = {
		Quantite: parseInt(req.body.Quantite),
		PrixUnitaire: req.body.PrixUnitaire,
	};
	const articleId = req.body.articleId;
	const enteteStockId = req.body.enteteStockId;
	const depotId = req.body.depotId;
	const Type = req.body.Type;

	if (!enteteStockId || !articleId) {
		res.status(400).send("enteteStockId and articleId are required");
		return;
	}

	let article;
	let enteteStock;
	let depotDossier;
	let type;
	let depot;

	try {
		enteteStock = await EnteteStock.findByPk(enteteStockId);
		article = await Article.findByPk(articleId);
		depotDossier = await Depot.findByPk(enteteStock.depotId);
		if (!article) {
			res.status(400).send("Invalid articleId");
			return;
		}
		if (!enteteStock) {
			res.status(400).send("Invalid enteteStockId");
			return;
		}

		if (depotDossier.dossierId !== article.dossierId) {
			res.status(400).send("Article is not in the same dossier as enteteStock");
			return;
		}

		if (!depotId) {
			depot = enteteStock.depotId;
		} else {
			depot = await Depot.findByPk(depotId);
			if (!depot || depot.dossierId !== depotDossier.dossierId) {
				res.status(400).send("Depot is not in the same dossier as enteteStock");
				return;
			}
			depot = depotId;
		}

		if (!Type) {
			type = enteteStock.Type;
		} else {
			type = Type;
		}

		// Update stock before creating ligneStock
		const stock = await Stock.findOne({
			where: {
				articleId: articleId,
				depotId: depot,
			},
		});

		if (!stock) {
			if (type === "Entree") {
				const createdStock = await Stock.create({
					articleId: articleId,
					depotId: depot,
					Quantite: data.Quantite,
				});
				if (!createdStock) {
					res.status(400).send("Error creating stock");
					return;
				}
			} else {
				res.status(400).send("There is no article in stock to remove");
				return;
			}
		} else if (type === "Entree") {
			await stock.update({
				Quantite: stock.Quantite + data.Quantite,
			});
		} else if (type === "Sortie") {
			await stock.update({
				Quantite: stock.Quantite - data.Quantite,
			});
		}

		// Create ligneStock after updating the stock
		const ligneStock = await LigneStock.create({
			...data,
			articleId: articleId,
			enteteStockId: enteteStockId,
			depotId: depot,
			Type: type,
		});

		res.send(ligneStock);
	} catch (error) {
		res.status(500).send(error);
		console.log(error);
	}
};

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
			const depot = await Depot.findByPk(depotId);
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
			res.send({ quantity: 0 });
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
