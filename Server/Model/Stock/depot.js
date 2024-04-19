module.exports = (sequelize, Sequelize) => {
	const Depot = sequelize.define(
		"depot",
		{
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			Libelle: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			CodeDepot: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			Pays: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			Ville: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			CodePostal: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			AdresseSecondaire: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			Responsable: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			Telephone: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			Principal: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
				defaultValue: false,
			},
		},
		{
			tableName: "t-depot",
		}
	);
	return Depot;
};
