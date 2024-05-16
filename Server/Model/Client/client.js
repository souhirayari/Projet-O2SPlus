//create client class with the following fields: id, CodeClient, Nom , Civilite,

module.exports = (sequelize, Sequelize) => {
	const Client = sequelize.define(
		"client",
		{
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			CodeClient: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			Nom: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			Login: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			MotDePasse: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			Email: {
				type: Sequelize.STRING,
				allowNull: true,
			},

			Civilite: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			adresse: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			pays: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			ville: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			telephone: {
				type: Sequelize.STRING,
				allowNull: true,
			},

		},
		{
			tableName: "t-client",
		}
	);
	return Client;
};
