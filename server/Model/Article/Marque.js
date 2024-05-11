
module.exports = (sequelize, Sequelize) => {
    const MarqueModel = sequelize.define('Marque', {
        idMarque: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,

        },
        codeMarque: {
            type: Sequelize.STRING,
            allowNull: false,

        },
        libelle: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    })

    return MarqueModel;
};
