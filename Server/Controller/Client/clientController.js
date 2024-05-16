
const db = require("../../Model/main");
const Client = db.clients;
const FamilleClient = db.familleClients;
const Dossier = db.Dossier;
const SecteurGeo = db.secteurGeos;
const TypeTarif = db.TypeTarif;
const ModeReglement = db.ModeRegl;
const Vendeur = db.vendeurs;
const User = db.User
const Technicien = db.Technicien
const secteurGeo =db.secteurGeos

const addClient = async (req, res) => {

	if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
		return res.status(403).send({ message: 'authorized access' })
	}
	const data = {
		CodeClient: req.body.CodeClient,
		Nom: req.body.Nom,
		Civilite: req.body.Civilite,
		Login: req.body.Login,
		MotDePasse: req.body.MotDePasse,
		Email: req.body.Email,
		pays: req.body.pays,
		adresse: req.body.adresse,
		ville: req.body.ville,
		telephone: req.body.telephone
	};
	const familleClientId = req.body.familleClientId;
	const secteurGeoId = req.body.secteurGeoId;
	const typeTarifId = req.body.typeTarifId;
	const modeReglementId = req.body.modeReglementId;
	const vendeurId = req.body.vendeurId;

	if (!familleClientId) {
		res.status(400).send(" familleClientId  are required");
		return;
	}

	let familleClient;
	let secteurGeo;
	let typeTarif;
	let modeReglement;
	let vendeur;

	try {
		const existinglogin =await User.findOne({ where: { login: data.Login } })
		console.log("user", existinglogin)
		const existlogin = await Technicien.findOne({ where: { login: data.Login } })
		console.log("tech", existlogin)
		const exislogin = await Client.findOne({ where: { Login: data.Login } })
		console.log("client", exislogin)

		if (existinglogin || exislogin || existlogin) {
			return res.status(400).send({ message: ' login doit etre unique' })
		}
		familleClient = await FamilleClient.findByPk(familleClientId);
		if (!familleClient) {
			res.status(400).send("Invalid familleClientId");
			return;
		}

		if (secteurGeoId) {
			secteurGeo = await SecteurGeo.findByPk(secteurGeoId);
			if (secteurGeo.dossierId !== familleClient.dossierId) {
				res
					.status(400)
					.send("SecteurGeo is not in the same dossier as familleClient");
				return;
			}
		}

		if (!modeReglementId) {
			modeReglement = familleClient.modeReglementId;
		} else {
			modeReglement = await ModeReglement.findByPk(modeReglementId);
			if (
				!modeReglement ||
				modeReglement.dossierId !== familleClient.dossierId
			) {
				res
					.status(400)
					.send("ModeReglement is not in the same dossier as familleClient");
				return;
			}
			modeReglement = modeReglementId;
		}

		if (!typeTarifId) {
			typeTarif = familleClient.typeTarifId;
		} else {
			typeTarif = await TypeTarif.findByPk(typeTarifId);
			if (!typeTarif || typeTarif.dossierId !== familleClient.dossierId) {
				res
					.status(400)
					.send("TypeTarif is not in the same dossier as familleClient");
				return;
			}

			typeTarif = typeTarifId;
		}

		if (!vendeurId) {
			vendeur = familleClient.vendeurId;
		} else {
			vendeur = await Vendeur.findByPk(vendeurId);
			if (!vendeur || vendeur.dossierId !== familleClient.dossierId) {
				res
					.status(400)
					.send("Vendeur is not in the same dossier as familleClient");
				return;
			}
			vendeur = vendeurId;
		}
	} catch (error) {
		console.error("Error checking familleClient:", error);
		res.status(500).send("Failed to verify familleClient");
		return;
	}

	try {
		if (!data.CodeClient) {
			let existingCodes;
			let count = 1;

			do {
				data.CodeClient = `Client${count}`;
				existingCodes = await Client.findOne({
					where: {
						"$familleClient.dossierId$": familleClient.dossierId,
						CodeClient: data.CodeClient,
					},
					include: {
						model: FamilleClient,
						as: "familleClient",
						attributes: [],
					},
				});

				count++;
			} while (existingCodes);
		} else {
			const existingCode = await Client.findOne({
				where: {
					"$familleClient.dossierId$": familleClient.dossierId,
					CodeClient: data.CodeClient,
				},
				include: {
					model: FamilleClient,
					as: "familleClient",
					attributes: [],
				},
			});

			if (existingCode) {
				res
					.status(400)
					.send("CodeClient must be unique within the familleClient");
				return;
			}
		}
		const client = {
			...data,
			familleClientId: familleClient.id,
			secteurGeoId: secteurGeo ? secteurGeo.id : null,
			idTypetarif: typeTarif,
			idReg: modeReglement,
			vendeurId: vendeur,
		};
		const newClient = await Client.create(client);
		res.send(newClient);
	} catch (error) {
		console.error("Error adding client:", error);
		res.status(500).send("Failed to add client");
	}
};

const getDossierIdOfClient = async (req, res) => {
	try {
		const clientId = req.params.id;

		// Find the client by id
		const client = await db.clients.findByPk(clientId);

		if (!client) {
			// Handle the case where the client is not found
			return res.status(404).json({ error: "Client not found" });
		}

		// Retrieve the familleClientId from the found client
		const familleClientId = client.familleClientId;

		// Find the familleClient by id
		const familleClient = await db.familleClients.findByPk(familleClientId);

		if (!familleClient) {
			return res.status(404).json({ error: "FamilleClient not found" });
		}

		const dossierId = familleClient.dossierId;
		const responseMessage = `Client appartient au dossier numero : ${dossierId}`;
		return res.status(200).json({ message: responseMessage });
	} catch (error) {
		console.error("Error getting dossierId of client:", error);
		return null;
	}
};

const getClientById = async (req, res) => {
	if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
		return res.status(403).send({ message: 'authorized access' })
	}
	const id = req.params.id;
	const client = await Client.findByPk(id,{
		include: [
			{
				model: FamilleClient,
				as: 'familleClient'
			},
			{
				model: TypeTarif,
				as: 'typeTarif'
			},
			{
				model: ModeReglement,
				as: 'modeReglement'
			},
			{
				model: Vendeur,
				as: 'vendeur'
			},
			{
				model: secteurGeo,
				as: 'secteurGeo'
			}
		]
	});
	if (!client) {
		res.status(404).send("Client not found");
		return;
	}
	res.status(200).send(client);
};

const deleteClient = async (req, res) => {
	if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
		return res.status(403).send({ message: 'authorized access' })
	}
	const id = req.params.id;
	const client = await Client.findByPk(id);
	if (!client) {
		res.status(404).send("Client not found");
		return;
	}
	await client.destroy();
	res.status(200).send("Client deleted successfully");
};

const updateClient = async (req, res) => {
	if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
		return res.status(403).send({ message: 'authorized access' })
	}
	const id = req.params.id;
	const data = {
		CodeClient: req.body.CodeClient,
		Nom: req.body.Nom,
		Civilite: req.body.Civilite,
		Login: req.body.Login,
		MotDePasse: req.body.MotDePasse,
		Email: req.body.Email,
		pays: req.body.pays,
		adresse: req.body.adresse,
		ville: req.body.ville,
		telephone: req.body.telephone,
		familleClientId: req.body.familleClientId,
	};

	const client = await Client.findByPk(id);
	if (!client) {
		res.status(404).send("Client not found");
		return;
	}

	try {
		await client.update(data);
		res.status(200).send("Client updated successfully");
	} catch (error) {
		console.error("Error updating client:", error);
		res.status(500).send("Failed to update client");
	}
};

const getAllClientByFamilleClient = async (req, res) => {
	if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
		return res.status(403).send({ message: 'authorized access' })
	}
	const familleClientId = req.params.familleClientId;
	const familleClient = await FamilleClient.findByPk(familleClientId);
	if (!familleClient) {
		res.status(404).send("FamilleClient not found");
		return;
	}
	const clients = await Client.findAll({
		where: {
			familleClientId: familleClientId,
		},
	});
	if (!clients) {
		res.status(404).send("Clients not found");
		return;
	}
	res.status(200).send(clients);
};

const getAllClientByDossier = async (req, res) => {
	if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
		return res.status(403).send({ message: 'authorized access' })
	}
	const dossierId = req.params.dossierId;
	const dossier = await Dossier.findByPk(dossierId);
	if (!dossier) {
		res.status(404).send("Dossier not found");
		return;
	}
	const familleClients = await FamilleClient.findAll({
		where: {
			dossierId: dossierId,
		},
	});
	if (!familleClients) {
		res.status(404).send("FamilleClients not found");
		return;
	}
	const clients = await Client.findAll({
		where: {
			familleClientId: familleClients.map((f) => f.id),
		},
	});
	if (!clients) {
		res.status(404).send("Clients not found");
		return;
	}
	res.status(200).send(clients);
};

module.exports = {
	addClient,
	getDossierIdOfClient,
	getClientById,
	deleteClient,
	updateClient,
	getAllClientByFamilleClient,
	getAllClientByDossier,
};
