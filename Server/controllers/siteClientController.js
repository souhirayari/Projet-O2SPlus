const db = require("../models");
const SiteClient = db.siteClients;
const Client = db.clients;
const FamilleClient = db.familleClients;
const Dossier = db.dossiers;

const addSiteClient = async (req, res) => {
	const data = {
		Pays: req.body.Pays,
		Nom: req.body.Nom,
		Ville: req.body.Ville,
		CodePostal: req.body.CodePostal,
		Adresse: req.body.Adresse,
		Interlocuteur: req.body.Interlocuteur,
		Telephone: req.body.Telephone,
		Email: req.body.Email,
		Note: req.body.Note,
		Principale: req.body.Principale,
	};
	const clientId = req.body.clientId;

	if (!clientId) {
		res.status(400).send("clientId is required");
		return;
	}

	let client;

	try {
		client = await Client.findByPk(clientId);

		if (!client) {
			res.status(400).send("Invalid clientId");
			return;
		}
	} catch (error) {
		console.error("Error checking client:", error);
		res.status(500).send("Failed to verify client");
		return;
	}

	try {
		const existingSites = await SiteClient.count({
			where: { clientId: client.id },
		});

		if (existingSites === 0) {
			data.Principale = true;
		} else if (data.Principale === "true") {
			await SiteClient.update(
				{ Principale: false },
				{ where: { clientId: client.id, Principale: true } }
			);
		}

		const siteClient = await SiteClient.create({
			...data,
			clientId: client.id,
		});

		res.send(siteClient);
	} catch (error) {
		console.error("Error adding siteClient:", error);
		res.status(500).send("Failed to add siteClient");
	}
};

const deleteSiteClient = async (req, res) => {
	const id = req.params.id;

	try {
		const siteClient = await SiteClient.findByPk(id);

		if (!siteClient) {
			res.status(404).send("SiteClient not found");
			return;
		}

		await siteClient.destroy();

		res.send("SiteClient deleted successfully");
	} catch (error) {
		console.error("Error deleting siteClient:", error);
		res.status(500).send("Failed to delete siteClient");
	}
};

const updateSiteClient = async (req, res) => {
	const id = req.params.id;

	try {
		const siteClient = await SiteClient.findByPk(id);

		if (!siteClient) {
			res.status(404).send("SiteClient not found");
			return;
		}

		const data = {
			Pays: req.body.Pays,
			Nom: req.body.Nom,
			Ville: req.body.Ville,
			CodePostal: req.body.CodePostal,
			Adresse: req.body.Adresse,
			Interlocuteur: req.body.Interlocuteur,
			Telephone: req.body.Telephone,
			Email: req.body.Email,
			Note: req.body.Note,
			Principale: req.body.Principale,
		};

		if (data.Principale) {
			await SiteClient.update(
				{ Principale: false },
				{ where: { clientId: siteClient.clientId, Principale: true } }
			);
		}

		await siteClient.update(data);

		res.send(siteClient);
	} catch (error) {
		console.error("Error updating siteClient:", error);
		res.status(500).send("Failed to update siteClient");
	}
};

const getSiteClient = async (req, res) => {
	const id = req.params.id;

	try {
		const siteClient = await SiteClient.findByPk(id);

		if (!siteClient) {
			res.status(404).send("SiteClient not found");
			return;
		}

		res.send(siteClient);
	} catch (error) {
		console.error("Error getting siteClient:", error);
		res.status(500).send("Failed to get siteClient");
	}
};

const getAllSiteByClient = async (req, res) => {
	const clientId = req.params.clientId;

	try {
		const client = await Client.findByPk(clientId);

		if (!client) {
			res.status(404).send("Client not found");
			return;
		}
	} catch (error) {}

	try {
		const siteClients = await SiteClient.findAll({
			where: { clientId },
		});

		res.send(siteClients);
	} catch (error) {
		console.error("Error getting siteClients:", error);
		res.status(500).send("Failed to get siteClients");
	}
};

const getDossierIdBySiteClientId = async (req, res) => {
	const siteClientId = req.params.siteClientId;

	try {
		const siteClient = await SiteClient.findByPk(siteClientId);
		if (!siteClient) {
			res.status(404).send("SiteClient not found");
			return;
		}

		const clientId = siteClient.clientId;
		const client = await Client.findByPk(clientId);
		const familleClientId = client.familleClientId;
		const familleClient = await db.familleClients.findByPk(familleClientId);
		const dossierId = familleClient.dossierId;
		return res.status(200).json({ dossierId });
	} catch (error) {
		console.error("Error getting dossierId of siteClient:", error);
		return null;
	}
};

const getAllSitesByDossierId = async (req, res) => {
	const dossierId = req.params.dossierId;

	try {
		const dossier = await Dossier.findByPk(dossierId, {
			include: [
				{
					model: FamilleClient,
					as: "familleClients",
					include: [
						{
							model: Client,
							as: "clients",
							include: [
								{
									model: SiteClient,
									as: "siteClients",
								},
							],
						},
					],
				},
			],
		});

		if (!dossier) {
			res.status(404).send("Dossier not found");
			return;
		}

		const sites = [];
		dossier.familleClients.forEach((familleClient) => {
			familleClient.clients.forEach((client) => {
				client.siteClients.forEach((site) => {
					sites.push(site);
				});
			});
		});

		res.send(sites);
	} catch (error) {
		console.error("Error getting sites by dossierId:", error);
		res.status(500).send("Failed to get sites by dossierId");
	}
};

module.exports = {
	addSiteClient,
	deleteSiteClient,
	updateSiteClient,
	getSiteClient,
	getAllSiteByClient,
	getDossierIdBySiteClientId,
	getAllSitesByDossierId,
};
