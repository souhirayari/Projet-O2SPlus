const db = require("../models");
const ModeReglement = db.modeReglements;
const Dossier = db.dossiers;

const addModeReglement = async (req, res) => {
	const data = {
		Libelle: req.body.Libelle,
		CodeModeReglement: req.body.CodeModeReglement,
	};
	const dossierId = req.body.dossierId;

	if (!dossierId) {
		res.status(400).send("dossierId is required  ");
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
		if (!data.CodeModeReglement) {
			let existingCodes;
			let count = 1;

			do {
				data.CodeModeReglement = `Mode Réglement${count}`;
				existingCodes = await ModeReglement.findOne({
					where: {
						dossierId: dossier.id,
						CodeModeReglement: data.CodeModeReglement,
					},
				});

				count++;
			} while (existingCodes);
		} else {
			const existingCode = await ModeReglement.findOne({
				where: {
					dossierId: dossier.id,
					CodeModeReglement: data.CodeModeReglement,
				},
			});

			if (existingCode) {
				res
					.status(400)
					.send("CodeModeReglement must be unique within the dossier");
				return;
			}
		}

		const modeReglement = await ModeReglement.create(data);
		await dossier.addModeReglement(modeReglement);
		res.status(201).send(modeReglement);
	} catch (error) {
		console.error("Error adding modeReglement:", error);
		res.status(500).send("Failed to add modeReglement");
	}
};

const getAllModeReglementByDossier = async (req, res) => {
	const dossierId = req.params.dossierId;

	if (!dossierId) {
		res.status(400).send("dossierId is required");
		return;
	}

	try {
		const dossier = await Dossier.findByPk(dossierId, {
			include: "modeReglements",
		});

		if (!dossier) {
			res.status(400).send("Invalid dossierId");
			return;
		}

		res.status(200).send(dossier.modeReglements);
	} catch (error) {
		console.error("Error getting modeReglements:", error);
		res.status(500).send("Failed to get modeReglements");
	}
};

const deleteModeReglement = async (req, res) => {
	const id = req.params.id;

	if (!id) {
		res.status(400).send("id is required");
		return;
	}

	try {
		const modeReglement = await ModeReglement.findByPk(id);

		if (!modeReglement) {
			res.status(400).send("Invalid id");
			return;
		}

		// Delete the ModeReglement entirely from the database
		await modeReglement.destroy();

		res.status(200).send("ModeReglement deleted successfully!");
	} catch (error) {
		console.error("Error deleting modeReglement:", error);
		res.status(500).send("Failed to delete modeReglement");
	}
};

const updateModeReglement = async (req, res) => {
	const id = req.params.id;
	const data = {
		Libelle: req.body.Libelle,
		CodeModeReglement: req.body.CodeModeReglement,
	};

	if (!id) {
		res.status(400).send("id is required");
		return;
	}

	try {
		const modeReglement = await ModeReglement.findByPk(id);

		if (!modeReglement) {
			res.status(400).send("Invalid id");
			return;
		}

		await ModeReglement.update(data, {
			where: { id: id },
		});

		res.status(200).send("ModeReglement updated successfully!");
	} catch (error) {
		console.error("Error updating modeReglement:", error);
		res.status(500).send("Failed to update modeReglement");
	}
};

const getModeReglementById = async (req, res) => {
	const id = req.params.id;

	const modeReglement = await ModeReglement.findByPk(id);
	res.status(200).send(modeReglement);
};

module.exports = {
	addModeReglement,
	getAllModeReglementByDossier,
	deleteModeReglement,
	updateModeReglement,
	getModeReglementById,
};
