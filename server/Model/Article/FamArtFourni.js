module.exports = (sequelize, Sequelize) => {
    const FamilleArtFourModel = sequelize.define('FamArtFourni', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        delaisliv: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        principale: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: ['oui', 'non']

        },
        equivStokage: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        }
    });

    return FamilleArtFourModel;
}
