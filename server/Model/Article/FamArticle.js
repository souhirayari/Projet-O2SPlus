
module.exports = (sequelize, Sequelize) => {
    const FamArticleModel = sequelize.define('FamilleArticle', {
        idFamArt: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        codefamille: {
            type: Sequelize.STRING,
            allowNull: false,
           
        },
        libelle: {
            type: Sequelize.STRING,
            allowNull: false,
           
        },
        coefficient: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        valorisation: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: ['P', 'D',] 
            
        }
    }, 
);

    return FamArticleModel;
};
