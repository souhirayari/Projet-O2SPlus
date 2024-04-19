module.exports = (sequelize, Sequelize) => {
	const SiteClient = sequelize.define(
		"siteClient",
		{
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},

			Nom: {
				type: Sequelize.STRING,
				allowNull: false,
			},

			Pays: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			Ville: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			CodePostal: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			Adresse: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			Interlocuteur: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			Telephone: {
				type: Sequelize.STRING,
				allowNull: true,
			},

			Email: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			Principale: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
				defaultValue: false,
			},

			Note: {
				type: Sequelize.STRING,
				allowNull: true,
			},
		},
		{
			tableName: "t-siteClient",
		}
	);
	return SiteClient;
};
