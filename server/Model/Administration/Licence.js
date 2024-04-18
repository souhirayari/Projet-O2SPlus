module.exports = (sequelize, Sequelize) => {
    const licenceModel = sequelize.define("licence", {
        idLicence: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Datevalidation: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        DateDebut: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        DateFin: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        nombreUser: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        nombreTech: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        nombreclient: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        nombreArticle: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        statut:{
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

    return licenceModel;
};
