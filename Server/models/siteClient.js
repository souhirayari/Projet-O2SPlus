module.exports = (sequelize, DataTypes) => {
	const SiteClient = sequelize.define(
		"siteClient",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},

			Nom: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			Pays: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			Ville: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			CodePostal: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			Adresse: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			Interlocuteur: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			Telephone: {
				type: DataTypes.STRING,
				allowNull: true,
			},

			Email: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			Principale: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: false,
			},

			Note: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			tableName: "t-siteClient",
		}
	);
	return SiteClient;
};
