
module.exports = (sequelize, Sequelize) => {
	const ZoneIntervention = sequelize.define(
		"zoneIntervention",
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
			Duree: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			Note: {
				type: Sequelize.STRING,
				allowNull: true,
			},
		},
		{
			tableName: "t-zoneIntervention",
		}
	);
	return ZoneIntervention;
};
