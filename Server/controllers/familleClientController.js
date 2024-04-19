const db = require("../models");
const FamilleClient = db.familleClients;
const Dossier = db.dossiers;
const TypeTarif = db.typeTarifs;
const ModeReglement = db.modeReglements;
const Vendeur = db.vendeurs;

const addFamilleClient = async (req, res) => {
	const data = {
		Libelle: req.body.Libelle,
		CodeFamilleClient: req.body.CodeFamilleClient,
	};
	const dossierId = req.body.dossierId;
	const typeTarifId = req.body.typeTarifId;
	const modeReglementId = req.body.modeReglementId;
	const vendeurId = req.body.vendeurId;
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

	if (!typeTarifId || !modeReglementId || !vendeurId) {
		res
			.status(400)
			.send("typeTarifId,modeReglementId and vendeur  are required");
		return;
	}

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

	try {
		const vendeur = await Vendeur.findOne({
			where: {
				id: vendeurId,
				dossierId: dossierId,
			},
		});

		if (!vendeur) {
			res.status(400).send("Invalid vendeurId");
			return;
		}
	} catch (error) {
		console.error("Error checking vendeur:", error);
		res.status(500).send("Failed to verify vendeur");
		return;
	}

	try {
		const typeTarif = await TypeTarif.findOne({
			where: {
				id: typeTarifId,
				dossierId: dossierId,
			},
		});

		if (!typeTarif) {
			res.status(400).send("Invalid typeTarifId");
			return;
		}
	} catch (error) {
		console.error("Error checking typeTarif:", error);
		res.status(500).send("Failed to verify typeTarif");
		return;
	}

	try {
		if (!data.CodeFamilleClient) {
			let existingCodes;
			let count = 1;
			do {
				data.CodeFamilleClient = `Famille Client${count}`;
				existingCodes = await FamilleClient.findOne({
					where: {
						dossierId: dossier.id,
						CodeFamilleClient: data.CodeFamilleClient,
					},
				});
				count++;
			} while (existingCodes);
		} else {
			const existingCode = await FamilleClient.findOne({
				where: {
					dossierId: dossier.id,
					CodeFamilleClient: data.CodeFamilleClient,
				},
			});
			if (existingCode) {
				res
					.status(400)
					.send("CodeFamilleClient must be unique within the dossier");
				return;
			}
		}
		const familleClient = {
			...data,
			dossierId: dossierId,
			modeReglementId: modeReglementId,
			typeTarifId: typeTarifId,
			vendeurId: vendeurId,
		};

		const newFamilleClient = await FamilleClient.create(familleClient);
		res.status(201).send(newFamilleClient);
	} catch (error) {
		console.error("Error checking familleClient:", error);
		res.status(500).send("Failed to verify familleClient");
		return;
	}
};

const getFamilleClient = async (req, res) => {
	const id = req.params.id;
	const familleClient = await FamilleClient.findByPk(id);
	if (!familleClient) {
		res.status(404).send("Famille Client not found");
		return;
	}
	res.status(200).send(familleClient);
};

const getFamilleClientByDossier = async (req, res) => {
	const dossierId = req.params.dossierId;
	const familleClient = await FamilleClient.findAll({
		where: {
			dossierId: dossierId,
		},
	});
	if (!familleClient) {
		res.status(404).send("Famille Client not found");
		return;
	}
	res.status(200).send(familleClient);
};

const deleteFamilleClient = async (req, res) => {
	const id = req.params.id;
	const familleClient = await FamilleClient.findByPk(id);
	if (!familleClient) {
		res.status(404).send("Famille Client not found");
		return;
	}
	await familleClient.destroy();
	res.status(200).send("Famille Client deleted successfully");
};

const updateFamilleClient = async (req, res) => {
	const id = req.params.id;
	const data = {
		Libelle: req.body.Libelle,
		CodeFamilleClient: req.body.CodeFamilleClient,
		typeTarifId: req.body.typeTarifId,
		modeReglementId: req.body.modeReglementId,
		CodeFamilleClient: req.body.CodeFamilleClient,
		vendeurId: req.body.vendeurId,
	};

	const familleClient = await FamilleClient.findByPk(id);
	if (!familleClient) {
		res.status(404).send("Famille Client not found");
		return;
	}

	try {
		if (data.CodeFamilleClient) {
			const existingCode = await FamilleClient.findOne({
				where: {
					dossierId: familleClient.dossierId,
					CodeFamilleClient: data.CodeFamilleClient,
				},
			});
			if (existingCode && existingCode.id !== familleClient.id) {
				res
					.status(400)
					.send("CodeFamilleClient must be unique within the dossier");
				return;
			}
		}

		if (data.typeTarifId) {
			const existingTypeTarif = await TypeTarif.findByPk(
				familleClient.typeTarifId
			);

			const newTypeTarif = await TypeTarif.findOne({
				where: {
					id: data.typeTarifId,
					dossierId: familleClient.dossierId,
				},
			});

			if (
				!newTypeTarif ||
				newTypeTarif.dossierId !== existingTypeTarif.dossierId
			) {
				throw new Error("Invalid typeTarifId");
			}
		}

		if (data.modeReglementId) {
			const existingModeReglement = await ModeReglement.findByPk(
				familleClient.modeReglementId
			);

			const newModeReglement = await ModeReglement.findOne({
				where: {
					id: data.modeReglementId,
					dossierId: familleClient.dossierId,
				},
			});

			if (
				!newModeReglement ||
				newModeReglement.dossierId !== existingModeReglement.dossierId
			) {
				throw new Error("Invalid modeReglementId");
			}
		}

		if (data.vendeurId) {
			const existingVendeur = await Vendeur.findByPk(familleClient.vendeurId);

			const newVendeur = await Vendeur.findOne({
				where: {
					id: data.vendeurId,
					dossierId: familleClient.dossierId,
				},
			});

			if (!newVendeur || newVendeur.dossierId !== existingVendeur.dossierId) {
				throw new Error("Invalid vendeurId");
			}
		}

		if (data.modeReglementId || data.typeTarifId || data.vendeurId) {
			const clients = await db.clients.findAll({
				where: {
					familleClientId: familleClient.id,
				},
			});
			for (let i = 0; i < clients.length; i++) {
				const client = clients[i];

				if (
					(!data.modeReglementId ||
						client.modeReglementId === familleClient.modeReglementId) &&
					(!data.typeTarifId ||
						client.typeTarifId === familleClient.typeTarifId) &&
					(!data.vendeurId || client.vendeurId === familleClient.vendeurId)
				) {
					await client.update({
						modeReglementId: data.modeReglementId || client.modeReglementId,
						typeTarifId: data.typeTarifId || client.typeTarifId,
						vendeurId: data.vendeurId || client.vendeurId,
					});
				}
			}
		}

		await familleClient.update(data);
		res.status(200).send(familleClient);
	} catch (error) {
		console.error(error.message);
		res.status(400).send(error.message);
	}
};

module.exports = {
	addFamilleClient,
	getFamilleClient,
	getFamilleClientByDossier,
	deleteFamilleClient,
	updateFamilleClient,
};
