
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



module.exports = db;
