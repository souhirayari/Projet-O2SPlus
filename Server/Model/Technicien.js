
module.exports = (sequelize, Sequelize) => {
    const TechnicienModel = sequelize.define('Technicien', {
        idTech: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        login: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nom: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        prenom: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        genre: {
            type: Sequelize.ENUM,
            allowNull: true,
            values: ['Homme', 'Femme']
        },
        dateNaissance: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        specialite: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        adresse: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        ville: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        codePostal: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        pays: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isIn: [['Actif', 'Suspendu', 'Inactif', 'Retraité']]
            }
        },
        IsActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        activationCode: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return TechnicienModel;
};
