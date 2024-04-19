const db = require("../models");
const TypeTarif = db.typeTarifs;
const Dossier = db.dossiers;

const addTypeTarif = async (req, res) => {
	const data = {
		Libelle: req.body.Libelle,
		CodeTypeTarif: req.body.CodeTypeTarif,
		Type: req.body.Type,
	};
	const dossierId = req.body.dossierId;

	if (!dossierId) {
		res.status(400).send("dossierId is required");
		return;
	}

	let dossier;
	if (data.Type && !["Tarif HT", "Tarif TTC"].includes(data.Type)) {
		res.status(400).send("Type should be 'Tarif HT' or 'Tarif TTC'");
		return;
	}

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
		if (!data.CodeTypeTarif) {
			let existingCodes;
			let count = 1;

			do {
				data.CodeTypeTarif = `Type Tarif${count}`;
				existingCodes = await TypeTarif.findOne({
					where: {
						dossierId: dossier.id,
						CodeTypeTarif: data.CodeTypeTarif,
					},
				});

				count++;
			} while (existingCodes);
		} else {
			const existingCode = await TypeTarif.findOne({
				where: {
					dossierId: dossier.id,
					CodeTypeTarif: data.CodeTypeTarif,
				},
			});

			if (existingCode) {
				res.status(400).send("CodeTypeTarif must be unique within the dossier");
				return;
			}
		}

		const typeTarif = {
			...data,
			dossierId: dossier.id,
		};

		const newTypeTarif = await TypeTarif.create(typeTarif);
		res.status(201).send(newTypeTarif);
	} catch (error) {
		console.error("Error adding TypeTarif:", error);
		res.status(500).send("Failed to add TypeTarif");
	}
};

const updateTypeTarif = async (req, res) => {
	const id = req.params.id;
	const data = {
		Libelle: req.body.Libelle,
		CodeTypeTarif: req.body.CodeTypeTarif,
		Type: req.body.Type,
	};

	if (!id) {
		res.status(400).send("id is required");
		return;
	}

	if (data.Type && !["Tarif HT", "Tarif TTC"].includes(data.Type)) {
		res.status(400).send("Type should be 'Tarif HT' or 'Tarif TTC'");
		return;
	}

	try {
		const typeTarif = await TypeTarif.findByPk(id);

		if (!typeTarif) {
			res.status(400).send("Invalid id");
			return;
		}

		await typeTarif.update(data, {
			where: { id: id },
		});
		res.status(200).send("TypeTarif updated successfully");
	} catch (error) {
		console.error("Error updating TypeTarif:", error);
		res.status(500).send("Failed to update TypeTarif");
	}
};

const deleteTypeTarif = async (req, res) => {
	const id = req.params.id;

	const typeTarif = await TypeTarif.findByPk(id);
	await typeTarif.destroy();
	res.status(200).send("TypeTarif deleted successfully");
};

const getTypeTarif = async (req, res) => {
	const id = req.params.id;

	const typeTarif = await TypeTarif.findByPk(id);
	res.status(200).send(typeTarif);
};

const getAllTypeTarifByDossier = async (req, res) => {
	const dossierId = req.params.dossierId;

	const typeTarifs = await TypeTarif.findAll({
		where: { dossierId: dossierId },
	});
	res.status(200).send(typeTarifs);
};

module.exports = {
	addTypeTarif,
	updateTypeTarif,
	deleteTypeTarif,
	getTypeTarif,
	getAllTypeTarifByDossier,
};
