module.exports = (sequelize, DataTypes) => {
	const Dossier = sequelize.define(
		"dossier",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			RaisonSociale: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			AdresseSecondaire: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			Pays: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			CodePostal: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			Ville: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			Telephone: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			Mobile: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			Email: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isEmail: {
						args: true,
						msg: "Please enter a valid email",
					},
				},
			},
			SiteWeb: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isUrl: {
						args: true,
						msg: "Please enter a valid url",
					},
				},
			},
			MatriculeFiscale: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			Actif: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
		},
		{
			tableName: "t-dossier",
		}
	);

	return Dossier;
};
