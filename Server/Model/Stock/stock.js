module.exports = (sequelize, Sequelize) => {
	const Stock = sequelize.define(
		"stock",
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
		},
		{
			tableName: "t-stock",
		}
	);
	return Stock;
};
