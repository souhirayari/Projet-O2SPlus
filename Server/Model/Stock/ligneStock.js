module.exports = (sequelize, Sequelize) => {
	const LigneStock = sequelize.define(
		"ligneStock",
		{
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},

			Quantite: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},

			PrixUnitaire: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},

			Type: {
				type: Sequelize.ENUM("Entree", "Sortie"),
				allowNull: true,
			},
		},
		{
			tableName: "t-ligneStock",
		}
	);
	return LigneStock;
};
