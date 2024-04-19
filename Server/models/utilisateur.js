module.exports = (sequelize, DataTypes) => {
	const Utilisateur = sequelize.define(
		"utilisateur",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			Login: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			MotDePasse: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			Role: {
				type: DataTypes.ENUM(
					"AdminSite",
					"AdminDossier",
					"Utilisateur",
					"Vendeur"
				),
				allowNull: false,
			},
			Email: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			tableName: "t-utilisateur",
		}
	);
	return Utilisateur;
};
