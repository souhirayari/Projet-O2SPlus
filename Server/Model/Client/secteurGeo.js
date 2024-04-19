module.exports = (sequelize, Sequelize) => {
	const SecteurGeo = sequelize.define(
		"secteurGeo",
		{
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			Libelle: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			CodeSecteurGeo: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		},
		{
			tableName: "t-secteurGeo",
		}
	);
	return SecteurGeo;
};
