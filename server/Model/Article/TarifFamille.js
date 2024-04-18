module.exports = (sequelize, Sequelize) => {
    const TarifFamilleModel = sequelize.define('TarifFamille', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        coefficient: {
            type: Sequelize.DOUBLE,
            allowNull: true, 
            defaultValue: 1000.0 
        }
    });
    
    return TarifFamilleModel;
}
