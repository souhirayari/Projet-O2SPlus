module.exports = (sequelize, DataTypes) => {
	const LigneStock = sequelize.define(
		"ligneStock",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},

			Quantite: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},

			PrixUnitaire: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},

			Type: {
				type: DataTypes.ENUM("Entree", "Sortie"),
				allowNull: true,
			},
		},
		{
			tableName: "t-ligneStock",
		}
	);
	return LigneStock;
};
