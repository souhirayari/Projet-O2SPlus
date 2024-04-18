module.exports = (sequelize, Sequelize) => {
    const ModeReglModel = sequelize.define("ModeRegl", {
        idReg: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        codeReg: {
            type: Sequelize.STRING,
            allowNull: false,
           
        },
        libelle: {
            type: Sequelize.STRING,
            allowNull: false,

        },
        pourcentage: {
            type: Sequelize.DOUBLE,
            allowNull: true,

        },
        TypePaiment: {
            type: Sequelize.ENUM,
            allowNull: false,
            values :[
                'c',
                'N',
                'FM',
                'FD'            
            ]

        },
        Mois: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        nbj: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        modePaiment: {
            type: Sequelize.ENUM,
            allowNull: true,
            values:['c','v','cb','e','p']
        }

    });

    return ModeReglModel;
};