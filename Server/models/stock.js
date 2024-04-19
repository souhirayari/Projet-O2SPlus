module.exports = (sequelize, DataTypes) => {
	const Stock = sequelize.define(
		"stock",
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
		},
		{
			tableName: "t-stock",
		}
	);
	return Stock;
};
