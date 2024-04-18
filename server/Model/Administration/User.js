
module.exports = (sequelize, Sequelize) => {
    const UserModel = sequelize.define('Utilisateur', {
        id: {
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
            allowNull: false,
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
        emploi: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        adresse: {
            type: Sequelize.STRING,
            allowNull: false,
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
        avatar: {
            type: Sequelize.BLOB,
            allowNull: true,
            validate: {
                isImageOrNull(value) {
                    if (value && !/\.(jpg|jpeg|png|gif)$/.test(value)) {
                        throw new Error('Le type de fichier doit être JPG, JPEG, PNG ou GIF.');
                    }
                }
            }
        },
        statut: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isIn: [['Actif', 'Suspendu', 'Inactif', 'Retraité']]
            }
        },
        Role: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [['adminDossier', 'user', 'adminSite']]
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

    return UserModel;
};
