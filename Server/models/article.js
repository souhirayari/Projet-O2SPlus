module.exports = (sequelize, DataTypes) => {
	const Article = sequelize.define(
		"article",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			Libelle: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			tableName: "t-article",
		}
	);
	return Article;
};
