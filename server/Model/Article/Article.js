
module.exports = (sequelize, Sequelize) => {
	const ArticleModel = sequelize.define('Article', {
		idArticle: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,

		},
		codeArticle: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'uniqueCodeArticlePerFamille' // Définition de la contrainte de validation unique
        },
		libelle: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		type: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		TVA: {
			type: Sequelize.DOUBLE,
			allowNull: true,
		},
		prixAchat: {
			type: Sequelize.DOUBLE,
			allowNull: true,
		},
		prixTTC: {
			type: Sequelize.DOUBLE,
			allowNull: true,
		},
		prixHT: {
			type: Sequelize.DOUBLE,
			allowNull: true,
		},
		image: {
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
		}
		,
		valorisation: {
			type: Sequelize.ENUM,
			allowNull: true,
			values: ['D', 'P']
		},
		modele: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		typeModele: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		puissance: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		durreGarantie: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		couverture: {
			type: Sequelize.ENUM,
			allowNull: true,
			values: ['A', 'M','AM']
		},
		condition: {
			type: Sequelize.ENUM,
			allowNull: true,
			values: ['sur site', 'Atelier']
		},
		gereEnStock: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
		},
		Serialize: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
		},

	});





	return ArticleModel;
};
