const db = require("../models");
const Fournisseur = db.fournisseurs;
const Dossier = db.dossiers;
const ModeReglement = db.modeReglements;

const addFournisseur = async (req, res) => {
	const data = {
		Nom: req.body.Nom,
		CodeFournisseur: req.body.CodeFournisseur,
		Pays: req.body.Pays,
		Ville: req.body.Ville,
		CodePostal: req.body.CodePostal,
		AdresseSecondaire: req.body.AdresseSecondaire,
		Interlocuteur: req.body.Interlocuteur,
		Telephone: req.body.Telephone,
		Email: req.body.Email,
		Civilite: req.body.Civilite,
	};

	const dossierId = req.body.dossierId;
	const modeReglementId = req.body.modeReglementId;

	if (modeReglementId) {
		try {
			const modeReglement = await ModeReglement.findOne({
				where: {
					id: modeReglementId,
					dossierId: dossierId,
				},
			});

			if (!modeReglement) {
				res.status(400).send("Invalid modeReglementId");
				return;
			}
		} catch (error) {
			console.error("Error checking modeReglement:", error);
			res.status(500).send("Failed to verify modeReglement");
			return;
		}
	}

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
		if (!data.CodeFournisseur) {
			let existingCodes;
			let count = 1;

			do {
				data.CodeFournisseur = `Fournisseur${count}`;
				existingCodes = await Fournisseur.findOne({
					where: {
						dossierId: dossier.id,
						CodeFournisseur: data.CodeFournisseur,
					},
				});
				count++;
			} while (existingCodes);
		} else {
			const existingCode = await Fournisseur.findOne({
				where: {
					dossierId: dossier.id,
					CodeFournisseur: data.CodeFournisseur,
				},
			});

			if (existingCode) {
				res
					.status(400)
					.send("CodeFournisseur must be unique within the dossier");
			}
		}

		const fournisseur = await Fournisseur.create({
			...data,
			dossierId: dossier.id,
			modeReglementId: modeReglementId,
		});

		res.send(fournisseur);
	} catch (error) {
		console.error("Error checking fournisseur:", error);
		res.status(500).send("Failed to verify fournisseur");
		return;
	}
};

const getFournisseur = async (req, res) => {
	const id = req.params.id;

	try {
		const fournisseur = await Fournisseur.findByPk(id);

		if (!fournisseur) {
			res.status(404).send("Fournisseur not found");
			return;
		}

		res.send(fournisseur);
	} catch (error) {
		console.error("Error getting fournisseur:", error);
		res.status(500).send("Failed to get fournisseur");
	}
};

const getAllFournisseurByDossier = async (req, res) => {
	try {
		const dossierId = req.params.dossierId;
		//console.log(dossierId);
		const fournisseurs = await Fournisseur.findAll({
			where: { dossierId: dossierId },
		});
		res.send(fournisseurs);
	} catch (error) {
		console.error("Error getting fournisseurs:", error);
		res.status(500).send("Failed to get fournisseurs");
	}
};

const updateFournisseur = async (req, res) => {
	const id = req.params.id;
	const data = {
		Nom: req.body.Nom,
		Pays: req.body.Pays,
		Ville: req.body.Ville,
		CodePostal: req.body.CodePostal,
		AdresseSecondaire: req.body.AdresseSecondaire,
		Interlocuteur: req.body.Interlocuteur,
		Telephone: req.body.Telephone,
		Email: req.body.Email,
		Civilite: req.body.Civilite,
	};

	try {
		const fournisseur = await Fournisseur.findByPk(id);

		if (!fournisseur) {
			res.status(404).send("Fournisseur not found");
			return;
		}

		await fournisseur.update(data);
		res.send(fournisseur);
	} catch (error) {
		console.error("Error updating fournisseur:", error);
		res.status(500).send("Failed to update fournisseur");
	}
};

const deleteFournisseur = async (req, res) => {
	const id = req.params.id;

	try {
		const fournisseur = await Fournisseur.findByPk(id);

		if (!fournisseur) {
			res.status(404).send("Fournisseur not found");
			return;
		}

		await fournisseur.destroy();
		res.send("Fournisseur deleted");
	} catch (error) {
		console.error("Error deleting fournisseur:", error);
		res.status(500).send("Failed to delete fournisseur");
	}
};

module.exports = {
	addFournisseur,
	getFournisseur,
	getAllFournisseurByDossier,
	updateFournisseur,
	deleteFournisseur,
};
