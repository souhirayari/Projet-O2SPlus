//create client class with the following fields: id, CodeClient, Nom , Civilite,

module.exports = (sequelize, DataTypes) => {
	const Client = sequelize.define(
		"client",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			CodeClient: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			Nom: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			Login: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			MotDePasse: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			Email: {
				type: DataTypes.STRING,
				allowNull: true,
			},

			Civilite: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			tableName: "t-client",
		}
	);
	return Client;
};
