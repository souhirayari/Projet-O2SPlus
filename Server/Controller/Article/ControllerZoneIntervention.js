const db = require("../../Model/main");
const ZoneIntervention = db.zoneInterventions;
const Dossier = db.Dossier;

const addZoneIntervention = async (req, res) => {
	const data = {
		Libelle: req.body.Libelle,
		Duree: req.body.Duree,
		Note: req.body.Note,
	};
	const dossierId = req.body.dossierId;

	if (!dossierId) {
		res.status(400).send(" dossierId is required");
		return;
	}

	let dossier;

	try {
		dossier = await Dossier.findByPk(dossierId);
		if (!dossier) {
			res.status(400).send("Invalid dossierId");
			return;
		}

		const zoneIntervention = await ZoneIntervention.create({
			...data,
			dossierId: dossier.id,
		});
		res.status(201).send(zoneIntervention);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

const updateZoneIntervention = async (req, res) => {
	const id = req.params.id;

	try {
		const zoneIntervention = await ZoneIntervention.findByPk(id);
		if (!zoneIntervention) {
			res.status(404).send("ZoneIntervention not found");
			return;
		}

		zoneIntervention.Libelle = req.body.Libelle;
		zoneIntervention.Duree = req.body.Duree;
		zoneIntervention.Note = req.body.Note;

		await zoneIntervention.save();

		res.send(zoneIntervention);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

const deleteZoneIntervention = async (req, res) => {
	const id = req.params.id;

	try {
		const zoneIntervention = await ZoneIntervention.findByPk(id);
		if (!zoneIntervention) {
			res.status(404).send("ZoneIntervention not found");
			return;
		}

		await zoneIntervention.destroy();

		res.send(zoneIntervention);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

const getAllZoneInterventionByDossier = async (req, res) => {
	const dossierId = req.params.dossierId;

	try {
		const dossier = await Dossier.findByPk(dossierId);
		if (!dossier) {
			res.status(404).send("Dossier not found");
			return;
		}

		const zoneInterventions = await ZoneIntervention.findAll({
			where: {
				dossierId: dossierId,
			},
		});

		res.send(zoneInterventions);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

const getZoneInterventionById = async (req, res) => {
	const id = req.params.id;

	try {
		const zoneIntervention = await ZoneIntervention.findByPk(id);
		if (!zoneIntervention) {
			res.status(404).send("ZoneIntervention not found");
			return;
		}

		res.send(zoneIntervention);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

module.exports = {
	addZoneIntervention,
	updateZoneIntervention,
	deleteZoneIntervention,
	getAllZoneInterventionByDossier,
	getZoneInterventionById,
};
