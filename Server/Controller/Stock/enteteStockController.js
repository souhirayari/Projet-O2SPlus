const db = require("../../Model/main");
const EnteteStock = db.enteteStocks;
const Fournisseur = db.Fournisseur;
const Depot = db.depots;
const Dossier = db.Dossier;

const addEnteteStock = async (req, res) => {

	if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
		return res.status(403).send({ message: 'authorized access' })
	}
	const data = {
		Date: req.body.Date,
		CodeEntete: req.body.CodeEntete,
		Type: req.body.Type,
	};
	console.log(req.body)
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

		const existingCodeEntete = await EnteteStock.findOne({
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
			fournisseurId: fournisseur.idFournisseur,
			depotId: depot.id,
		});

		res.send(enteteStock);
	} catch (error) {
		console.error("Error adding enteteStock:", error);
	}
};

const updateEnteteStock = async (req, res) => {
	if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
		return res.status(403).send({ message: 'authorized access' })
	}
	const id = req.params.id;
	const data = {
		Date: req.body.Date,
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
		if (!fournisseur || !depot) {
			res.status(400).send("Fournisseur or Depot not found");
			return;
		}
		if (fournisseur.dossierId !== depot.dossierId) {
			res.status(400).send("Fournisseur and Depot are not in the same dossier");
			return;
		}
		const enteteStock = await EnteteStock.update(
			{
				...data,
				fournisseurId: fournisseur.id,
				depotId: depot.id,
			},
			{
				where: { id: id },
			}
		);
		return res.send(enteteStock);
	} catch (error) {
		console.error("Error updating enteteStock:", error);
	}
};

const deleteEnteteStock = async (req, res) => {
	if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
		return res.status(403).send({ message: 'authorized access' })
	}
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
	if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
		return res.status(403).send({ message: 'authorized access' })
	}
	const fournisseurId = req.params.fournisseurId;

	try {
		const enteteStocks = await EnteteStock.findAll({
			where: { fournisseurId: fournisseurId },
		});
		res.send(enteteStocks);
	} catch (error) {
		res.status(500).send("Failed to get enteteStocks");
	}
};

const getEnteteStockByDepot = async (req, res) => {
	if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
		return res.status(403).send({ message: 'authorized access' })
	}
	const depotId = req.params.depotId;

	try {
		const enteteStocks = await EnteteStock.findAll({
			where: { depotId: depotId },
		});
		res.send(enteteStocks);
	} catch (error) {
		res.status(500).send("Failed to get enteteStocks");
	}
};

const getAllEnteteStockByDossier = async (req, res) => {
	try {
		if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
			return res.status(403).send({ message: 'authorized access' })
		}
		const dossierId = parseInt(req.params.dossierId);

		const dossier = await Dossier.findByPk(dossierId);
		if (!dossier) {
			return res.status(404).send("Dossier not found");
		}

		const depots = await Depot.findAll({
			where: {
				dossierId: dossierId,
			},
		});
		if (depots.length === 0) {
			return res.status(404).send("Depots not found");
		}

		const depotIds = depots.map((depot) => depot.id);
		const enteteStocks = await EnteteStock.findAll({
			where: {
				depotId: depotIds,
			},
			include: [
				{
					model: Fournisseur,
					as: 'fournisseur',
				},
				{
					model: Depot,
					as: 'depot',
				}
			],
		});

		if (enteteStocks.length === 0) {
			return res.status(404).send("EnteteStocks not found");
		}

		res.status(200).send(enteteStocks);
	} catch (error) {
		console.error("Error fetching EnteteStocks:", error);
		res.status(500).send("Internal server error");
	}
};

const getAllEntreeEnteteStockByDossier = async (req, res) => {
	try {
		if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
			return res.status(403).send({ message: 'authorized access' })
		}
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
			}, include: [
				{
					model: Fournisseur,
					as: 'fournisseur',
				},
				{
					model: Depot,
					as: 'depot',
				}
			],
		});

		if (!enteteStocks) {
			res.status(404).send("EnteteStocks not found");
			return;
		}

		const enteteStockEntree = enteteStocks.filter(
			(enteteStock) => enteteStock.Type === "Entree"
		);

		if (!enteteStockEntree) {
			res.status(404).send("Entree EnteteStocks not found");
			return;
		}


		res.status(200).send(enteteStockEntree);
	} catch (err) {
		console.error("Error fetching EnteteStocks:", error);
		res.status(500).send("Internal server error");
	}
};

const getAllSortieEnteteStockByDossier = async (req, res) => {
	try {
		if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
			return res.status(403).send({ message: 'authorized access' })
		}
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
			include: [
				{
					model: Fournisseur,
					as: 'fournisseur',
				},
				{
					model: Depot,
					as: 'depot',
				}
			],
		});

		if (!enteteStocks) {
			res.status(404).send("EnteteStocks not found");
			return;
		}

		const enteteStockSortie = enteteStocks.filter(
			(enteteStock) => enteteStock.Type === "Sortie"
		);

		if (!enteteStockSortie) {
			res.status(404).send("Sortie EnteteStocks not found");
			return;
		}
		res.status(200).send(enteteStockSortie);
	} catch (err) {
		console.error("Error fetching EnteteStocks:", error);
		res.status(500).send("Internal server error");
	}
};

const getOneEntete = async (req, res) => {
	try {
		if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
			return res.status(403).send({ message: 'authorized access' })
		}

		const { code, dossierId } = req.params;
		console.log(code, dossierId)

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

		const enteteStocks = await EnteteStock.findOne({
			where: {
				CodeEntete: code, depotId: depotIds
			},
			include: [
				{
					model: Fournisseur,
					as: 'fournisseur',
				},
				{
					model: Depot,
					as: 'depot',
				}
			],
		});

		if (!enteteStocks) {
			res.status(404).send("EnteteStocks not found");
			return;
		}
		res.status(200).send(enteteStocks);
	} catch (err) {
		console.error("Error fetching EnteteStocks:", err);
		res.status(500).send("Internal server error");
	}
};

const getOneEntetebyId = async (req, res) => {
	try {
		if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
			return res.status(403).send({ message: 'authorized access' })
		}

		const enteteId = req.params.enteteId;
		console.log(enteteId)
		const enteteStocks = await EnteteStock.findOne({
			where: {
				id: enteteId
			},
			include: [
				{
					model: Fournisseur,
					as: 'fournisseur',
				},
				{
					model: Depot,
					as: 'depot',
				}
			],
		});

		if (!enteteStocks) {
			res.status(404).send("EnteteStocks not found");
			return;
		}
		res.status(200).send(enteteStocks);
	} catch (err) {
		console.error("Error fetching EnteteStocks:", err);
		res.status(500).send("Internal server error");
	}
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
	getOneEntete,
	getOneEntetebyId
};
