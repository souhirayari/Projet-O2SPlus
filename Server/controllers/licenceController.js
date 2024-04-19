const db = require("../models");

const Dossier = db.dossiers;
const Licence = db.licences;

const addLicence = async (req, res) => {
	const currentDate = new Date().toISOString().split("T")[0];
	const inputDate = req.body.dateValidation;

	// Check if the provided date is not earlier than today
	if (inputDate < currentDate) {
		res.status(400).send("DateValidation must not be earlier than today.");
		return;
	}
	const data = {
		DateValidation: req.body.dateValidation,
		NombreMaxTechniciens: req.body.nombreMaxTechniciens,
		NombreMaxClients: req.body.nombreMaxClients,
		NombreMaxUtilisateur: req.body.nombreMaxUtilisateur,
	};
	const licence = await Licence.create(data);

	const dossierId = req.body.dossierId;
	if (dossierId) {
		const result = await assignLicenceToDossier(licence.id, dossierId);
		if (!result.success) {
			res.status(500).send(result.message);
			return;
		}
	}

	res.status(200).send(licence);
};

const getAllLicence = async (req, res) => {
	const licences = await Licence.findAll();
	res.status(200).send(licences);
};

const getLicenceById = async (req, res) => {
	const id = req.params.id;
	const licence = await Licence.findByPk(id);
	res.status(200).send(licence);
};

const updateLicence = async (req, res) => {
	const id = req.params.id;
	const data = {
		DateValidation: req.body.dateValidation,
		NombreMaxTechniciens: req.body.nombreMaxTechniciens,
		NombreMaxClients: req.body.nombreMaxClients,
		NombreMaxUtilisateur: req.body.nombreMaxUtilisateur,
	};
	await Licence.update(data, {
		where: { id: id },
	});
	res.status(200).send("Licence updated successfully!");
};

const deleteLicence = async (req, res) => {
	const id = req.params.id;
	await Licence.destroy({
		where: { id: id },
	});
	res.status(200).send("Licence deleted successfully!");
};

const assignLicenceToDossier = async (licenceId, dossierId) => {
	try {
		// Find the licence and dossier
		const licence = await Licence.findByPk(licenceId);
		const dossier = await Dossier.findByPk(dossierId);
		if (!dossier) {
			return { success: false, message: "Dossier not found!" };
		}

		// Assign the licence to the dossier
		await licence.setDossier(dossier);
		return {
			success: true,
			message: "Licence assigned to dossier successfully!",
		};
	} catch (err) {
		return { success: false, message: err.message };
	}
};

module.exports = {
	addLicence,
	getAllLicence,
	getLicenceById,
	updateLicence,
	deleteLicence,
	assignLicenceToDossier,
};
