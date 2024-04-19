const db = require("../models");
const SecteurGeo = db.secteurGeos;
const Dossier = db.dossiers;

const addSecteurGeo = async (req, res) => {
	const data = {
		Libelle: req.body.Libelle,
		CodeSecteurGeo: req.body.CodeSecteurGeo,
	};
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
		if (!data.CodeSecteurGeo) {
			let existingCodes;
			let count = 1;

			do {
				data.CodeSecteurGeo = `Secteur Géographique${count}`;
				existingCodes = await SecteurGeo.findOne({
					where: {
						dossierId: dossier.id,
						CodeSecteurGeo: data.CodeSecteurGeo,
					},
				});

				count++;
			} while (existingCodes);
		} else {
			const existingCode = await SecteurGeo.findOne({
				where: {
					dossierId: dossier.id,
					CodeSecteurGeo: data.CodeSecteurGeo,
				},
			});

			if (existingCode) {
				res
					.status(400)
					.send("CodeSecteurGeo must be unique within the dossier");
				return;
			}
		}
	} catch (error) {
		console.error("Error checking existing CodeSecteurGeo:", error);
		res.status(500).send("Failed to verify CodeSecteurGeo");
		return;
	}

	try {
		const secteurGeo = await SecteurGeo.create(data);
		await secteurGeo.setDossier(dossier);
		res.status(201).send(secteurGeo);
	} catch (error) {
		console.error("Error creating SecteurGeo:", error);
		res.status(500).send("Failed to create SecteurGeo");
	}
};
const getAllSecteurGeoByDossier = async (req, res) => {
	const dossierId = req.params.dossierId;

	if (!dossierId) {
		res.status(400).send("dossierId is required");
		return;
	}

	try {
		const secteurGeos = await SecteurGeo.findAll({
			where: {
				dossierId: dossierId,
			},
		});

		if (!secteurGeos) {
			res.status(400).send("No SecteurGeos found for dossierId");
			return;
		}

		res.status(200).send(secteurGeos);
	} catch (error) {
		console.error("Error getting SecteurGeos:", error);
		res.status(500).send("Failed to get SecteurGeos");
	}
};

const deleteSecteurGeo = async (req, res) => {
	const id = req.params.id;

	if (!id) {
		res.status(400).send("id is required");
		return;
	}

	try {
		const secteurGeo = await SecteurGeo.findByPk(id);

		if (!secteurGeo) {
			res.status(400).send("Invalid id");
			return;
		}

		await secteurGeo.destroy();
		res.status(200).send("SecteurGeo deleted successfully");
	} catch (error) {
		console.error("Error deleting SecteurGeo:", error);
		res.status(500).send("Failed to delete SecteurGeo");
	}
};

const updateSecteurGeo = async (req, res) => {
	const id = req.params.id;
	const data = {
		Libelle: req.body.Libelle,
		CodeSecteurGeo: req.body.CodeSecteurGeo,
	};

	if (!id) {
		res.status(400).send("id is required");
		return;
	}

	try {
		const secteurGeo = await SecteurGeo.findByPk(id);

		if (!secteurGeo) {
			res.status(400).send("Invalid id");
			return;
		}

		if (data.CodeSecteurGeo) {
			const existingCode = await SecteurGeo.findOne({
				where: {
					dossierId: secteurGeo.dossierId,
					CodeSecteurGeo: data.CodeSecteurGeo,
				},
			});

			if (existingCode && existingCode.id !== secteurGeo.id) {
				res
					.status(400)
					.send("CodeSecteurGeo must be unique within the dossier");
				return;
			}
		}

		await secteurGeo.update(data);
		res.status(200).send(secteurGeo);
	} catch (error) {
		console.error("Error updating SecteurGeo:", error);
		res.status(500).send("Failed to update SecteurGeo");
	}
};

const getSecteurGeoById = async (req, res) => {
	const id = req.params.id;

	if (!id) {
		res.status(400).send("id is required");
		return;
	}

	try {
		const secteurGeo = await SecteurGeo.findByPk(id);

		if (!secteurGeo) {
			res.status(400).send("Invalid id");
			return;
		}

		res.status(200).send(secteurGeo);
	} catch (error) {
		console.error("Error getting SecteurGeo:", error);
		res.status(500).send("Failed to get SecteurGeo");
	}
};

module.exports = {
	addSecteurGeo,
	getAllSecteurGeoByDossier,
	deleteSecteurGeo,
	updateSecteurGeo,
	getSecteurGeoById,
};
