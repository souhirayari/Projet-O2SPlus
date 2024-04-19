const db = require("../models");

const Dossier = db.dossiers;
const Utilisateur = db.utilisateurs;

const addDossier = async (req, res) => {
	const data = {
		RaisonSociale: req.body.RaisonSociale,
		AdresseSecondaire: req.body.AdresseSecondaire,
		Pays: req.body.Pays,
		CodePostal: req.body.CodePostal,
		Ville: req.body.Ville,
		Telephone: req.body.Telephone,
		Mobile: req.body.Mobile,
		Email: req.body.Email,
		SiteWeb: req.body.SiteWeb,
		MatriculeFiscale: req.body.MatriculeFiscale,
		Actif: req.body.Actif,
	};
	const dossier = await Dossier.create(data);
	res.status(200).send(dossier);
};

const getAllDossier = async (req, res) => {
	const dossiers = await Dossier.findAll();
	res.status(200).send(dossiers);
};

const getDossierById = async (req, res) => {
	const id = req.params.id;
	const dossier = await Dossier.findByPk(id);
	res.status(200).send(dossier);
};

const updateDossier = async (req, res) => {
	const id = req.params.id;
	const data = {
		RaisonSociale: req.body.RaisonSociale,
		AdresseSecondaire: req.body.AdresseSecondaire,
		Pays: req.body.Pays,
		CodePostal: req.body.CodePostal,
		Ville: req.body.Ville,
		Telephone: req.body.Telephone,
		Mobile: req.body.Mobile,
		Email: req.body.Email,
		SiteWeb: req.body.SiteWeb,
		MatriculeFiscale: req.body.MatriculeFiscale,
		Actif: req.body.Actif,
	};
	await Dossier.update(data, {
		where: { id: id },
	});
	res.status(200).send("Dossier updated successfully!");
};

const deleteDossier = async (req, res) => {
	const id = req.params.id;
	await Dossier.destroy({
		where: { id: id },
	});
	res.status(200).send("Dossier deleted successfully!");
};

const getUtilisateurDossier = async (req, res) => {
	const id = req.params.id;
	const dossier = await Dossier.findByPk(id, {
		include: ["utilisateurs"],
	});
	res.status(200).send(dossier);
};

const assignUtilisateurToDossier = async (req, res) => {
	try {
		const { dossierId, utilisateurId } = req.body;

		const dossier = await Dossier.findByPk(dossierId);
		if (!dossier) {
			return res.status(404).send("Dossier not found");
		}

		const utilisateur = await Utilisateur.findByPk(utilisateurId);
		if (!utilisateur) {
			return res.status(404).send("Utilisateur not found");
		}

		// Perform the assignment using associations (recommended):
		utilisateur.setDossier(dossier); // Link utilisateur to dossier
		await utilisateur.save(); // Save the association

		// Alternatively, use UPDATE query, though not recommended for flexibility:
		// await Utilisateur.update({ dossierId }, { where: { id: utilisateurId } });

		res.status(200).send("Utilisateur assigned to dossier successfully");
	} catch (error) {
		console.error("Error assigning utilisateur to dossier:", error);
		res.status(500).send("Internal server error");
	}
};

const getLicenceDossier = async (req, res) => {
	const id = req.params.id;
	const dossier = await Dossier.findByPk(id, {
		include: ["licences"],
	});
	res.status(200).send(dossier);
};

module.exports = {
	addDossier,
	getAllDossier,
	getDossierById,
	updateDossier,
	deleteDossier,
	getUtilisateurDossier,
	assignUtilisateurToDossier,
	getLicenceDossier,
};
