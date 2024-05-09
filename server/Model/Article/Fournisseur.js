
module.exports = (sequelize, Sequelize) => {
    const FournisseurModel = sequelize.define('Fournisseur', {
        idFournisseur: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,

		},
        codeFournisseur: {
            type: Sequelize.STRING,
            allowNull: false,
           
        },
		genre: {
			type: Sequelize.ENUM,
			allowNull: false,
            values:['Madame','Monsieur']
		},
		nom: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		prenom: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		Adresse: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		CodePostal: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		Ville: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		Telephone: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		Mobile: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
        Pays: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		Email: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				isEmail: {
					args: true,
					msg: "Please enter a valid email",
				},
			},
		},
		SiteWeb: {
			type: Sequelize.STRING,
			allowNull: true, // Permettre la valeur null
			validate: {
				isUrl: function (value) {
					// Valider l'URL uniquement si le champ n'est pas vide ou null
					if (value && !validator.isURL(value)) {
						throw new Error('Please enter a valid URL for the image');
					}
				}
			}
		},
		delais:{
			type: Sequelize.INTEGER,
			allowNull: false,
		}
		
	});
    return FournisseurModel;
};
