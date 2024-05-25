const db = require("../../Model/main");
const Depot = db.depots;
const Dossier = db.Dossier;

const addDepot = async (req, res) => {
	if (auth.user.Role !== 'adminDossier') {
		return res.status(403).json({ message: 'Unauthorized access' });
	}
	const data = {
		Libelle: req.body.Libelle,
		Pays: req.body.Pays,
		Ville: req.body.Ville,
		CodePostal: req.body.CodePostal,
		AdresseSecondaire: req.body.AdresseSecondaire,
		Responsable: req.body.Responsable,
		Telephone: req.body.Telephone,
		Principal: req.body.Principal,
		CodeDepot: req.body.CodeDepot,
	};
	console.log(req.body)
	const dossierId = req.body.dossierId;

	if (!dossierId) {
		res.status(400).send("dossierId is required");
		return;
	}

	let dossier;
	try {
		dossier = await Dossier.findByPk(dossierId);

		if (!dossier) {
			res.status(400).send("Invalid dossierId");
			return;
		}
	} catch (error) {
		console.error("Error checking dossier:", error);
		res.status(500).send("Failed to verify dossier");
		return;
	}

	try {
		if (!data.CodeDepot) {
			let existingCodes;
			let count = 1;

			do {
				data.CodeDepot = `Depot${count}`;
				existingCodes = await Depot.findOne({
					where: {
						dossierId: dossier.id,
						CodeDepot: data.CodeDepot,
					},
				});

				count++;
			} while (existingCodes);
		} else {
			const existingCode = await Depot.findOne({
				where: {
					dossierId: dossier.id,
					CodeDepot: data.CodeDepot,
				},
			});

			if (existingCode) {
				res.status(400).send("code depot already exists");
				return;
			}
		}

		const existingDepots = await Depot.count({
			where: { dossierId: dossier.id },
		});
		//	console.log("existingDepots", existingDepots);

		if (existingDepots === 0) {
			data.Principal = true;
		} else if (data.Principal === "true") {
			await Depot.update(
				{ Principal: false },
				{ where: { dossierId: dossier.id, Principal: true } }
			);
		}

		const depot = await Depot.create({
			...data,
			dossierId: dossier.id,
		});

		res.status(201).send(depot);
	} catch (error) {
		console.error("Error adding depot:", error);
		res.status(500).send("Failed to add depot");
	}
};

const getAllDepotByDossier = async (req, res) => {
	if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
		return res.status(403).json({ message: 'Unauthorized access' });
	}
	const dossierId = req.params.id;
	//console.log(dossierId);

	if (!dossierId) {
		res.status(400).send("dossierId is required");
		return;
	}

	try {
		const depots = await Depot.findAll({
			where: { dossierId: dossierId },
		});

		res.send(depots);
	} catch (error) {
		console.error("Error getting depots:", error);
		res.status(500).send("Failed to get depots");
	}
};

const getDepot = async (req, res) => {
	const id = req.params.id;

	try {
		const depot = await Depot.findByPk(id);

		if (!depot) {
			res.status(404).send("Depot not found");
			return;
		}

		res.send(depot);
	} catch (error) {
		console.error("Error getting depot:", error);
		res.status(500).send("Failed to get depot");
	}
};

const updateDepot = async (req, res) => {
	if (auth.user.Role !== 'adminDossier') {
		return res.status(403).json({ message: 'Unauthorized access' });
	}
	const id = req.params.id;
	const data = {
		Libelle: req.body.Libelle,
		Pays: req.body.Pays,
		Ville: req.body.Ville,
		CodePostal: req.body.CodePostal,
		AdresseSecondaire: req.body.AdresseSecondaire,
		Responsable: req.body.Responsable,
		Telephone: req.body.Telephone,
		Principal: req.body.Principal,
		CodeDepot: req.body.CodeDepot,
	};

	try {
		const depot = await Depot.findByPk(id);

		if (!depot) {
			res.status(404).send("Depot not found");
			return;
		}

		if (data.Principal === "true") {
			await Depot.update(
				{ Principal: false },
				{ where: { dossierId: depot.dossierId, Principal: true } }
			);
		}

		await depot.update(data);
		res.send(depot);
	} catch (error) {
		console.error("Error updating depot:", error);
		res.status(500).send("Failed to update depot");
	}
};

const deleteDepot = async (req, res) => {
	if (auth.user.Role !== 'adminDossier') {
		return res.status(403).json({ message: 'Unauthorized access' });
	}
	const id = req.params.id;

	try {
		const depot = await Depot.findByPk(id);

		if (!depot) {
			res.status(404).send("Depot not found");
			return;
		}

		await depot.destroy();
		res.send("Depot deleted successfully");
	} catch (error) {
		console.error("Error deleting depot:", error);
		res.status(500).send("Failed to delete depot");
	}
};

const getDepotPrincipalOfDossier = async (req, res) => {
	const id = req.params.id;

	try {
		const depot = await Depot.findOne({
			where: { dossierId: id, Principal: true },
		});

		if (!depot) {
			res.status(404).send("Depot principal not found");
			return;
		}

		res.send(depot);
	} catch (error) {
		console.error("Error getting depot principal:", error);
		res.status(500).send("Failed to get depot principal");
	}
};

module.exports = {
	addDepot,
	getAllDepotByDossier,
	getDepot,
	updateDepot,
	deleteDepot,
	getDepotPrincipalOfDossier,
};
