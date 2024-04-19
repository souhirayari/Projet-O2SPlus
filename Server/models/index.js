const dbConfig = require("../config/dbConfig.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
	dbConfig.database,
	dbConfig.user,
	dbConfig.password,
	{
		host: dbConfig.host,
		dialect: dbConfig.dialect,
		logging: false,
		operatorsAliases: false, //for errors

		// pool: {
		// 	max: dbConfig.pool.max,
		// 	min: dbConfig.pool.min,
		// 	acquire: dbConfig.pool.acquire,
		// 	idle: dbConfig.pool.idle,
		// },
	}
);

sequelize.authenticate().catch((err) => {
	console.error("Unable to connect to the database:", err);
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize; //instance
db.dossiers = require("./dossier.js")(sequelize, DataTypes);
db.utilisateurs = require("./utilisateur.js")(sequelize, DataTypes);
db.licences = require("./licence.js")(sequelize, DataTypes);
db.modeReglements = require("./modeReglement.js")(sequelize, DataTypes);
db.typeTarifs = require("./typeTarif.js")(sequelize, DataTypes);
db.vendeurs = require("./vendeur.js")(sequelize, DataTypes);
db.familleClients = require("./familleClient.js")(sequelize, DataTypes);
db.secteurGeos = require("./secteurGeo.js")(sequelize, DataTypes);
db.clients = require("./client.js")(sequelize, DataTypes);
db.siteClients = require("./siteClient.js")(sequelize, DataTypes);
db.zoneInterventions = require("./zoneIntervention.js")(sequelize, DataTypes);
db.fournisseurs = require("./fournisseur.js")(sequelize, DataTypes);
db.depots = require("./depot.js")(sequelize, DataTypes);
db.enteteStocks = require("./enteteStock.js")(sequelize, DataTypes);
db.articles = require("./article.js")(sequelize, DataTypes);
db.ligneStocks = require("./ligneStock.js")(sequelize, DataTypes);
db.stocks = require("./stock.js")(sequelize, DataTypes);
async function initializeDatabase() {
	try {
		await db.sequelize.sync({ force: false, alter: true });
	} catch (error) {
		console.error("Error synchronizing database:", error);
	}
}

// Call the asynchronous function
initializeDatabase();
//---------------------------------------------------------
//Associations
db.dossiers.hasMany(db.utilisateurs, {
	foreignKey: "dossierId",
	as: "utilisateurs",
});
db.utilisateurs.belongsTo(db.dossiers, {
	foreignKey: "dossierId",

	as: "dossier",
});

db.dossiers.hasMany(db.licences, {
	foreignKey: "dossierId",
	as: "licences",
});
db.licences.belongsTo(db.dossiers, {
	foreignKey: "dossierId",
	as: "dossier",
});
db.dossiers.hasMany(db.modeReglements, {
	foreignKey: "dossierId",
	as: "modeReglements",
});
db.modeReglements.belongsTo(db.dossiers, {
	foreignKey: "dossierId",
	as: "dossier",
});
db.dossiers.hasMany(db.typeTarifs, {
	foreignKey: "dossierId",
	as: "typeTarifs",
});

db.typeTarifs.belongsTo(db.dossiers, {
	foreignKey: "dossierId",
	as: "dossier",
});
db.dossiers.hasMany(db.familleClients, {
	foreignKey: "dossierId",
	as: "familleClients",
});

db.familleClients.belongsTo(db.dossiers, {
	foreignKey: "dossierId",
	as: "dossier",
});

db.typeTarifs.hasMany(db.familleClients, {
	foreignKey: "typeTarifId",
	as: "familleClients",
});

db.familleClients.belongsTo(db.typeTarifs, {
	foreignKey: "typeTarifId",
	as: "typeTarif",
});

db.familleClients.belongsTo(db.modeReglements, {
	foreignKey: "modeReglementId",
	as: "modeReglement",
});
db.modeReglements.hasMany(db.familleClients, {
	foreignKey: "modeReglementId",
	as: "familleClients",
});

db.dossiers.hasMany(db.secteurGeos, {
	foreignKey: "dossierId",
	as: "secteurGeos",
});

db.secteurGeos.belongsTo(db.dossiers, {
	foreignKey: "dossierId",
	as: "dossier",
});

db.familleClients.hasMany(db.clients, {
	foreignKey: "familleClientId",
	as: "clients",
});

db.clients.belongsTo(db.familleClients, {
	foreignKey: "familleClientId",
	as: "familleClient",
});

db.clients.hasMany(db.siteClients, {
	foreignKey: "clientId",
	as: "siteClients",
});

db.siteClients.belongsTo(db.clients, {
	foreignKey: "clientId",
	as: "client",
});

db.clients.belongsTo(db.secteurGeos, {
	foreignKey: "secteurGeoId",
	as: "secteurGeo",
});

db.secteurGeos.hasMany(db.clients, {
	foreignKey: "secteurGeoId",
	as: "clients",
});

db.clients.belongsTo(db.typeTarifs, {
	foreignKey: "typeTarifId",
	as: "typeTarif",
});

db.typeTarifs.hasMany(db.clients, {
	foreignKey: "typeTarifId",
	as: "clients",
});

db.clients.belongsTo(db.modeReglements, {
	foreignKey: "modeReglementId",
	as: "modeReglement",
});

db.modeReglements.hasMany(db.clients, {
	foreignKey: "modeReglementId",
	as: "clients",
});

db.dossiers.hasMany(db.zoneInterventions, {
	foreignKey: "dossierId",
	as: "zoneInterventions",
});

db.zoneInterventions.belongsTo(db.dossiers, {
	foreignKey: "dossierId",
	as: "dossier",
});

db.siteClients.belongsTo(db.zoneInterventions, {
	foreignKey: "zoneInterventionId",
	as: "zoneIntervention",
});

db.zoneInterventions.hasMany(db.siteClients, {
	foreignKey: "zoneInterventionId",
	as: "siteClients",
});

db.dossiers.hasMany(db.vendeurs, {
	foreignKey: "dossierId",
	as: "vendeurs",
});

db.vendeurs.belongsTo(db.dossiers, {
	foreignKey: "dossierId",
	as: "dossier",
});

db.vendeurs.hasMany(db.familleClients, {
	foreignKey: "vendeurId",
	as: "familleClients",
});

db.familleClients.belongsTo(db.vendeurs, {
	foreignKey: "vendeurId",
	as: "vendeur",
});

db.vendeurs.hasMany(db.clients, {
	foreignKey: "vendeurId",
	as: "clients",
});

db.clients.belongsTo(db.vendeurs, {
	foreignKey: "vendeurId",
	as: "vendeur",
});

db.dossiers.hasMany(db.fournisseurs, {
	foreignKey: "dossierId",
	as: "fournisseurs",
});

db.fournisseurs.belongsTo(db.dossiers, {
	foreignKey: "dossierId",
	as: "dossier",
});

db.modeReglements.hasMany(db.fournisseurs, {
	foreignKey: "modeReglementId",
	as: "fournisseurs",
});

db.fournisseurs.belongsTo(db.modeReglements, {
	foreignKey: "modeReglementId",
	as: "modeReglement",
});

db.dossiers.hasMany(db.depots, {
	foreignKey: "dossierId",
	as: "depots",
});

db.depots.belongsTo(db.dossiers, {
	foreignKey: "dossierId",
	as: "dossier",
});

db.depots.hasMany(db.enteteStocks, {
	foreignKey: "depotId",
	as: "enteteStocks",
});

db.enteteStocks.belongsTo(db.depots, {
	foreignKey: "depotId",
	as: "depot",
});

db.fournisseurs.hasMany(db.enteteStocks, {
	foreignKey: "fournisseurId",
	as: "enteteStocks",
});

db.enteteStocks.belongsTo(db.fournisseurs, {
	foreignKey: "fournisseurId",
	as: "fournisseur",
});
db.enteteStocks.hasMany(db.ligneStocks, {
	foreignKey: "enteteStockId",
	as: "ligneStocks",
});

db.ligneStocks.belongsTo(db.enteteStocks, {
	foreignKey: "enteteStockId",
	as: "enteteStock",
});

db.ligneStocks.belongsTo(db.depots, {
	foreignKey: "depotId",
	as: "depot",
});

db.depots.hasMany(db.ligneStocks, {
	foreignKey: "depotId",
	as: "ligneStocks",
});

db.dossiers.hasMany(db.articles, {
	foreignKey: "dossierId",
	as: "articles",
});

db.articles.belongsTo(db.dossiers, {
	foreignKey: "dossierId",
	as: "dossier",
});

db.articles.hasMany(db.ligneStocks, {
	foreignKey: "articleId",
	as: "ligneStocks",
});

db.ligneStocks.belongsTo(db.articles, {
	foreignKey: "articleId",
	as: "article",
});

db.stocks.belongsTo(db.articles, {
	foreignKey: "articleId",
	as: "article",
});

db.articles.hasMany(db.stocks, {
	foreignKey: "articleId",
	as: "stocks",
});

db.stocks.belongsTo(db.depots, {
	foreignKey: "depotId",
	as: "depot",
});

db.depots.hasMany(db.stocks, {
	foreignKey: "depotId",
	as: "stocks",
});

//---------------------------------------------------------
module.exports = db;
