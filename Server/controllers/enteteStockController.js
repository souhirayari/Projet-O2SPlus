const db = require("../models");
const EnteteStock = db.enteteStocks;
const Fournisseur = db.fournisseurs;
const Depot = db.depots;
const Dossier = db.dossiers;
const Op = db.Sequelize.Op;

const addEnteteStock = async (req, res) => {
	const data = {
		Date: req.body.Date,
		CodeEntete: req.body.CodeEntete,
		Type: req.body.Type,
	};

	const fournisseurId = req.body.fournisseurId;
	const depotId = req.body.depotId;

	try {
		if (!fournisseurId || !depotId) {
			res.status(400).send("FournisseurId and DepotId are required");
			return;
		}

		const fournisseur = await Fournisseur.findByPk(fournisseurId);
		const depot = await Depot.findByPk(depotId);

		if (fournisseur.dossierId !== depot.dossierId) {
			res.status(400).send("Fournisseur and Depot are not in the same dossier");
			return;
		}

		existingCodeEntete = await EnteteStock.findOne({
			where: {
				CodeEntete: data.CodeEntete,
				"$depot.dossierId$": depot.dossierId,
			},

			include: [
				{
					model: Depot,
					as: "depot",
				},
			],
		});

		if (existingCodeEntete) {
			res.status(400).send("CodeEntete already exists");
			return;
		}

		const enteteStock = await EnteteStock.create({
			...data,
			fournisseurId: fournisseur.id,
			depotId: depot.id,
		});

		res.send(enteteStock);
	} catch (error) {
		console.error("Error adding enteteStock:", error);
	}
};

const updateEnteteStock = async (req, res) => {
	// const id = req.params.id;
	// const data = {
	// 	Date: req.body.Date,
	// 	Type: req.body.Type,
	// };
	// const fournisseurId = req.body.fournisseurId;
	// const depotId = req.body.depotId;
	// try {
	// 	if (!fournisseurId || !depotId) {
	// 		res.status(400).send("FournisseurId and DepotId are required");
	// 		return;
	// 	}
	// 	const fournisseur = await Fournisseur.findByPk(fournisseurId);
	// 	const depot = await Depot.findByPk(depotId);
	// 	if (!fournisseur || !depot) {
	// 		res.status(400).send("Fournisseur or Depot not found");
	// 		return;
	// 	}
	// 	if (fournisseur.dossierId !== depot.dossierId) {
	// 		res.status(400).send("Fournisseur and Depot are not in the same dossier");
	// 		return;
	// 	}
	// 	const enteteStock = await EnteteStock.update(
	// 		{
	// 			...data,
	// 			fournisseurId: fournisseur.id,
	// 			depotId: depot.id,
	// 		},
	// 		{
	// 			where: { id: id },
	// 		}
	// 	);
	// 	return res.send(enteteStock);
	// } catch (error) {
	// 	console.error("Error updating enteteStock:", error);
	// }
};

const deleteEnteteStock = async (req, res) => {
	const id = req.params.id;

	try {
		const enteteStock = await EnteteStock.destroy({
			where: { id: id },
		});

		if (enteteStock === 1) {
			res.send("EnteteStock deleted");
		} else {
			res.status(404).send("EnteteStock not found");
		}
	} catch (error) {
		console.error("Error deleting enteteStock:", error);
	}
};

const getEnteteStockByFournisseur = async (req, res) => {
	const fournisseurId = req.params.fournisseurId;

	try {
		const enteteStocks = await EnteteStock.findAll({
			where: { fournisseurId: fournisseurId },
		});
		res.send(enteteStocks);
	} catch (error) {
		console.error("Error getting enteteStocks:", error);
		res.status(500).send("Failed to get enteteStocks");
	}
};

const getEnteteStockByDepot = async (req, res) => {
	const depotId = req.params.depotId;

	try {
		const enteteStocks = await EnteteStock.findAll({
			where: { depotId: depotId },
		});
		res.send(enteteStocks);
	} catch (error) {
		console.error("Error getting enteteStocks:", error);
		res.status(500).send("Failed to get enteteStocks");
	}
};

const getAllEnteteStockByDossier = async (req, res) => {
	const dossierId = req.params.dossierId;
	const dossier = await Dossier.findByPk(dossierId);
	if (!dossier) {
		res.status(404).send("Dossier not found");
		return;
	}
	const depots = await Depot.findAll({
		where: {
			dossierId: dossierId,
		},
	});
	if (!depots) {
		res.status(404).send("Depots not found");
		return;
	}

	const depotIds = depots.map((depot) => depot.id);
	const enteteStocks = await EnteteStock.findAll({
		where: {
			depotId: depotIds,
		},
	});

	if (!enteteStocks) {
		res.status(404).send("EnteteStocks not found");
		return;
	}

	res.status(200).send(enteteStocks);
};

const getAllEntreeEnteteStockByDossier = async (req, res) => {
	const dossierId = req.params.dossierId;
	const dossier = await Dossier.findByPk(dossierId);
	if (!dossier) {
		res.status(404).send("Dossier not found");
		return;
	}
	const depots = await Depot.findAll({
		where: {
			dossierId: dossierId,
		},
	});
	if (!depots) {
		res.status(404).send("Depots not found");
		return;
	}

	const depotIds = depots.map((depot) => depot.id);
	const enteteStocks = await EnteteStock.findAll({
		where: {
			depotId: depotIds,
		},
	});

	if (!enteteStocks) {
		res.status(404).send("EnteteStocks not found");
		return;
	}

	const enteteStockEntree = enteteStocks.filter(
		(enteteStock) => enteteStock.Type === "Entree"
	);

	res.status(200).send(enteteStockEntree);
};

const getAllSortieEnteteStockByDossier = async (req, res) => {
	const dossierId = req.params.dossierId;
	const dossier = await Dossier.findByPk(dossierId);
	if (!dossier) {
		res.status(404).send("Dossier not found");
		return;
	}
	const depots = await Depot.findAll({
		where: {
			dossierId: dossierId,
		},
	});
	if (!depots) {
		res.status(404).send("Depots not found");
		return;
	}

	const depotIds = depots.map((depot) => depot.id);
	const enteteStocks = await EnteteStock.findAll({
		where: {
			depotId: depotIds,
		},
	});

	if (!enteteStocks) {
		res.status(404).send("EnteteStocks not found");
		return;
	}

	const enteteStockSortie = enteteStocks.filter(
		(enteteStock) => enteteStock.Type === "Sortie"
	);

	res.status(200).send(enteteStockSortie);
};

module.exports = {
	addEnteteStock,
	updateEnteteStock,
	deleteEnteteStock,
	getEnteteStockByFournisseur,
	getEnteteStockByDepot,
	getAllEnteteStockByDossier,
	getAllEntreeEnteteStockByDossier,
	getAllSortieEnteteStockByDossier,
};
