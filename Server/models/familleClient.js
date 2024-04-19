//create a model for familleClient with the attributes : id, CodeFamilleClient,Libelle
module.exports = (sequelize, DataTypes) => {
	const FamilleClient = sequelize.define(
		"familleClient",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			CodeFamilleClient: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			Libelle: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: "t-familleClient",
		}
	);
	return FamilleClient;
};
