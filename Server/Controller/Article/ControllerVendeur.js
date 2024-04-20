const db = require("../../Model/main");
const Vendeur = db.vendeurs;
const Dossier = db.Dossier;

const addVendeur = async (req, res) => {
	const data = {
		Nom: req.body.Nom,
		CodeVendeur: req.body.CodeVendeur,
		Pays: req.body.Pays,
		Ville: req.body.Ville,
		CodePostal: req.body.CodePostal,
		Telephone: req.body.Telephone,
		Email: req.body.Email,
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
		if (!data.CodeVendeur) {
			let existingCodes;
			let count = 1;

			do {
				data.CodeVendeur = `Vendeur${count}`;
				existingCodes = await Vendeur.findOne({
					where: {
						dossierId: dossier.id,
						CodeVendeur: data.CodeVendeur,
					},
				});
				console.log(existingCodes)

				count++;
			} while (existingCodes);
		} else {
			const existingCode = await Vendeur.findOne({
				where: {
					dossierId: dossier.id,
					CodeVendeur: data.CodeVendeur,
				},
			});

			if (existingCode) {
				res.status(400).send("CodeVendeur must be unique within the dossier");
				return;
			}
		}

		data.dossierId = dossier.id;

		const vendeur = await Vendeur.create(data);
		res.send(vendeur);
	} catch (error) {
		console.error("Error adding vendeur:", error);
		res.status(500).send("Failed to add vendeur");
	}
};

const getAllVendeurByDossier = async (req, res) => {
	try {
		const dossierId = req.params.dossierId;
		const vendeurs = await Vendeur.findAll({ where: { dossierId: dossierId } });
		res.send(vendeurs);
	} catch (error) {
		console.error("Error getting vendeurs:", error);
		res.status(500).send("Failed to get vendeurs");
	}
};

const getVendeur = async (req, res) => {
	const id = req.params.id;

	if (!id) {
		res.status(400).send("id is required");
		return;
	}

	try {
		const vendeur = await Vendeur.findByPk(id);
		res.send(vendeur);
	} catch (error) {
		console.error("Error getting vendeur:", error);
		res.status(500).send("Failed to get vendeur");
	}
};

const updateVendeur = async (req, res) => {
	const id = req.params.id;
	const data = {
		Nom: req.body.Nom,
		Pays: req.body.Pays,
		Ville: req.body.Ville,
		CodePostal: req.body.CodePostal,
		Telephone: req.body.Telephone,
		Email: req.body.Email,
	};

	if (!id) {
		res.status(400).send("id is required");
		return;
	}

	try {
		const vendeur = await Vendeur.findByPk(id);

		if (!vendeur) {
			res.status(400).send("Invalid id");
			return;
		}

		await vendeur.update(data, {
			where: {
				id: id,
			},
		});

		res.send(vendeur);
	} catch (error) {
		console.error("Error updating vendeur:", error);
		res.status(500).send("Failed to update vendeur");
	}
};

const deleteVendeur = async (req, res) => {
	const id = req.params.id;

	if (!id) {
		res.status(400).send("id is required");
		return;
	}

	try {
		const vendeur = await Vendeur.findByPk(id);

		await vendeur.destroy();
		res.send("Vendeur deleted successfully");
	} catch (error) {
		console.error("Error deleting vendeur:", error);
		res.status(500).send("No vendeur found to delete");
	}
};

const numberOfVendeursByDossier = async (req, res) => {
	try {
		const dossierId = req.params.dossierId;
		const count = await Vendeur.count({ where: { dossierId: dossierId } });
		res.send({ count });
	} catch (error) {
		console.error("Error getting vendeurs count:", error);
		res.status(500).send("Failed to get vendeurs count");
	}
};

module.exports = {
	addVendeur,
	getAllVendeurByDossier,
	getVendeur,
	updateVendeur,
	deleteVendeur,
	numberOfVendeursByDossier,
};
