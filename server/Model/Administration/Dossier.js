
//modele de dossier
module.exports = (sequelize, Sequelize) => {
    const DossierModel = sequelize.define('Dossier', {
        id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,

		},
		RaisonSociale: {
			type: Sequelize.STRING,
			allowNull: false,
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
			allowNull: true,
			validate: {
				isUrl: {
					args: true,
					msg: "Please enter a valid url",
				},
			},
		},
		MatriculeFiscale: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});



	  

    return DossierModel;
};
