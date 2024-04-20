
const Sequelize = require('sequelize');
const dbconfig = require('../Config/dbConfig');



const sequelize = new Sequelize(

    dbconfig.dataBase,
    dbconfig.user,
    dbconfig.password,
    {
        host: dbconfig.host,
        dialect: dbconfig.dialect,
        pool:
        {
            min: dbconfig.min,
            max: dbconfig.max,
            acquire: dbconfig.acquire,
            idle: dbconfig.idle,
        }

    }
)

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./Administration/User')(sequelize, Sequelize);
db.Dossier = require('./Administration/Dossier')(sequelize, Sequelize);
db.Licence = require('./Administration/Licence')(sequelize, Sequelize);
db.userDossier = require('./Administration/UserDossier')(sequelize, Sequelize)
db.FamArticle = require('./Article/FamArticle')(sequelize, Sequelize)
db.Marque = require('./Article/Marque')(sequelize, Sequelize)
db.Article = require('./Article/Article')(sequelize, Sequelize)
db.Fournisseur = require('./Article/Fournisseur')(sequelize, Sequelize)
db.FourArticle = require('./Article/FournisseurArticle')(sequelize, Sequelize)
db.FamArtFourni = require('./Article/FamArtFourni')(sequelize, Sequelize)
db.TypeTarif = require('./Article/TypeTarif')(sequelize, Sequelize)
db.ModeRegl = require('./Article/ModeRegl')(sequelize, Sequelize)
db.Appareil = require('./Article/Appareil')(sequelize, Sequelize)
db.TarifFamille = require('./Article/TarifFamille')(sequelize, Sequelize)

db.vendeurs = require("../Model/Article/vendeur.js")(sequelize, Sequelize);
db.familleClients = require("../Model/Client/familleClient.js")(sequelize, Sequelize);
db.secteurGeos = require("../Model/Client/secteurGeo.js")(sequelize, Sequelize);
db.clients = require("../Model/Client/client.js")(sequelize, Sequelize);
db.siteClients = require("./Client/siteClient.js")(sequelize, Sequelize);
db.zoneInterventions = require("./Article/zoneIntervention.js")(sequelize, Sequelize);
db.depots = require("./Stock/depot.js")(sequelize, Sequelize);
db.enteteStocks = require("./Stock/enteteStock.js")(sequelize, Sequelize);
db.ligneStocks = require("./Stock/ligneStock.js")(sequelize, Sequelize);
db.stocks = require("./Stock/stock.js")(sequelize, Sequelize);


//Adminisatration
//Dossier -- User
db.Dossier.hasMany(db.User, {
    foreignKey: "dossierId",
    as: "Users",
});

db.User.belongsTo(db.Dossier, {
    foreignKey: "dossierId",
    as: "Dossier",
});

// Dossier -- Licence
db.Dossier.hasMany(db.Licence, {
    foreignKey: "dossierId",
    as: "licence",
});

db.Licence.belongsTo(db.Dossier, {
    foreignKey: "dossierId",
    as: "Dossier",
});

// Dossier -- User
db.Dossier.belongsToMany(db.User, { through: db.userDossier })
db.User.belongsToMany(db.Dossier, { through: db.userDossier });


//Article
// Dossier -- FamilleArticle
db.Dossier.hasMany(db.FamArticle, {
    foreignKey: "dossierId",
    as: "FamilleArticle",
});

db.FamArticle.belongsTo(db.Dossier, {
    foreignKey: "dossierId",
    as: "Dossier",
});

// Dossier -- Marque
db.Marque.belongsTo(db.Dossier,
    {
        foreignKey: "dossierId",
        as: "Dossier"
    })

db.Dossier.hasMany(db.Marque, {
    foreignKey: "dossierId",
    as: "Marque",
});

// Dossier -- fournisseur
db.Fournisseur.belongsTo(db.Dossier,
    {
        foreignKey: "dossierId",
        as: "Dossier"
    })

db.Dossier.hasMany(db.Fournisseur, {
    foreignKey: "dossierId",
    as: "Fournisseur",
});

// dossier -- typetarif 
db.TypeTarif.belongsTo(db.Dossier,
    {
        foreignKey: "dossierId",
        as: "Dossier"
    })

db.Dossier.hasMany(db.TypeTarif, {
    foreignKey: "dossierId",
    as: "TypeTarif",
});

// dossier -- Mode Reglement 
db.ModeRegl.belongsTo(db.Dossier,
    {
        foreignKey: "dossierId",
        as: "Dossier"
    })

db.Dossier.hasMany(db.ModeRegl, {
    foreignKey: "dossierId",
    as: "ModeRegl",
});



// Appareil -- Article -- heritage 
db.Appareil.belongsTo(db.Article,
    { foreignKey: 'idArticle', constraints: false })



// FamilleArticle -- Article
db.Article.belongsTo(db.FamArticle,
    {
        foreignKey: "idFamArt",
        as: "FamilleArticle"
    })

db.FamArticle.hasMany(db.Article, {
    foreignKey: "idFamArt",
    as: "Article",
});

// FamilleArticle -- Fournisseur
db.FamArticle.belongsToMany(db.Fournisseur, {
    through: db.FamArtFourni,
    foreignKey: 'idFamArt',
    otherKey: 'idFournisseur',
    as: 'Fournisseurs'
})

db.Fournisseur.belongsToMany(db.FamArticle, {
    through: db.FamArtFourni,
    foreignKey: 'idFournisseur',
    otherKey: 'idFamArt',
    as: 'famillearticles '
})

// FamilleArticle -- typeTarif
db.FamArticle.belongsToMany(db.TypeTarif, {
    through: db.TarifFamille,
    foreignKey: 'idFamArt',
    otherKey: 'idTypetarif',
    as: 'TypeTarif'
})

db.TypeTarif.belongsToMany(db.FamArticle, {
    through: db.TarifFamille,
    foreignKey: 'idTypetarif',
    otherKey: 'idFamArt',
    as: 'famillearticles '
})

// Article -- Fournisseur
db.Article.belongsToMany(db.Fournisseur, {
    through: db.FourArticle,
    foreignKey: 'idArticle',
    otherKey: 'idFournisseur',
    as: 'Fournisseurs'
})

db.Fournisseur.belongsToMany(db.Article, {
    through: db.FourArticle,
    foreignKey: 'idFournisseur',
    otherKey: 'idArticle',
    as: 'Articles '
})

// Article -- Marque
db.Article.belongsTo(db.Marque,
    {
        foreignKey: "IdMarque",
        as: "Marque"
    })
db.Marque.hasMany(db.Article, {
    foreignKey: "IdMarque",
    as: "Article",
});

// fournisseur -- mode Reglement
db.ModeRegl.hasMany(db.Fournisseur, {
    foreignKey: 'idReg',
    as: 'fournisseur'
})
db.Fournisseur.belongsTo(db.ModeRegl,
    {
        foreignKey: "idReg",
        as: "ModeRegl"
     })
//-------------------------------------------
db.Dossier.hasMany(db.familleClients, {
	foreignKey: "dossierId",
	as: "familleClients",
});

db.familleClients.belongsTo(db.Dossier, {
	foreignKey: "dossierId",
	as: "dossier",
});

db.TypeTarif.hasMany(db.familleClients, {
	foreignKey: "idTypetarif",
	as: "familleClients",
});

db.familleClients.belongsTo(db.TypeTarif, {
	foreignKey: "idTypetarif",
	as: "typeTarif",
});

db.familleClients.belongsTo(db.ModeRegl, {
	foreignKey: "idReg",
	as: "modeReglement",
});
db.ModeRegl.hasMany(db.familleClients, {
	foreignKey: "idReg",
	as: "familleClients",
});

db.Dossier.hasMany(db.secteurGeos, {
	foreignKey: "dossierId",
	as: "secteurGeos",
});

db.secteurGeos.belongsTo(db.Dossier, {
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

db.clients.belongsTo(db.TypeTarif, {
	foreignKey: "idTypetarif",
	as: "typeTarif",
});

db.TypeTarif.hasMany(db.clients, {
	foreignKey: "idTypetarif",
	as: "clients",
});

db.clients.belongsTo(db.ModeRegl, {
	foreignKey: "idReg",
	as: "modeReglement",
});

db.ModeRegl.hasMany(db.clients, {
	foreignKey: "idReg",
	as: "clients",
});

db.Dossier.hasMany(db.zoneInterventions, {
	foreignKey: "dossierId",
	as: "zoneInterventions",
});

db.zoneInterventions.belongsTo(db.Dossier, {
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

db.Dossier.hasMany(db.vendeurs, {
	foreignKey: "dossierId",
	as: "vendeurs",
});

db.vendeurs.belongsTo(db.Dossier, {
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


db.Dossier.hasMany(db.depots, {
	foreignKey: "dossierId",
	as: "depots",
});

db.depots.belongsTo(db.Dossier, {
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

db.Fournisseur.hasMany(db.enteteStocks, {
	foreignKey: "fournisseurId",
	as: "enteteStocks",
});

db.enteteStocks.belongsTo(db.Fournisseur, {
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

db.Article.hasMany(db.ligneStocks, {
	foreignKey: "idArticle",
	as: "ligneStocks",
});

db.ligneStocks.belongsTo(db.Article, {
	foreignKey: "idArticle",
	as: "Article",
});

db.stocks.belongsTo(db.Article, {
	foreignKey: "idArticle",
	as: "Article",
});

db.Article.hasMany(db.stocks, {
	foreignKey: "idArticle",
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


module.exports = db;
