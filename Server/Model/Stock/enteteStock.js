module.exports = (sequelize, Sequelize) => {
	const EnteteStock = sequelize.define(
		"enteteStock",
		{
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			Date: {
				type: Sequelize.DATEONLY,
				allowNull: true,
			},
			CodeEntete: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			Type: {
				type: Sequelize.ENUM("Entree", "Sortie"),
				allowNull: true,
			},
		},
		{
			tableName: "t-enteteStock",
		}
	);
	return EnteteStock;
};
