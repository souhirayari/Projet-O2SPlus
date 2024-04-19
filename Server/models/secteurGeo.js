module.exports = (sequelize, DataTypes) => {
	const SecteurGeo = sequelize.define(
		"secteurGeo",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			Libelle: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			CodeSecteurGeo: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: "t-secteurGeo",
		}
	);
	return SecteurGeo;
};
