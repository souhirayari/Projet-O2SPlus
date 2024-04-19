module.exports = (sequelize, DataTypes) => {
	const EnteteStock = sequelize.define(
		"enteteStock",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			Date: {
				type: DataTypes.DATEONLY,
				allowNull: true,
			},
			CodeEntete: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			Type: {
				type: DataTypes.ENUM("Entree", "Sortie"),
				allowNull: true,
			},
		},
		{
			tableName: "t-enteteStock",
		}
	);
	return EnteteStock;
};
