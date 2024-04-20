//create a model for familleClient with the attributes : id, CodeFamilleClient,Libelle
module.exports = (sequelize, Sequelize) => {
	const FamilleClient = sequelize.define(
		"familleClient",
		{
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			CodeFamilleClient: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			Libelle: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		},
		{
			tableName: "t-familleClient",
		}
	);
	return FamilleClient;
};
