module.exports = (sequelize, DataTypes) => {
	const Vendeur = sequelize.define(
		"vendeur",
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

			CodeVendeur: {
				type: DataTypes.STRING,
				allowNull: true,
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

			Telephone: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			Email: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			tableName: "t-vendeur",
		}
	);
	return Vendeur;
};
