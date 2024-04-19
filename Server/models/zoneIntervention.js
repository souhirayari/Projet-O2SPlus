module.exports = (sequelize, DataTypes) => {
	const ZoneIntervention = sequelize.define(
		"zoneIntervention",
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
			Duree: {
				type: DataTypes.TIME,
				allowNull: true,
			},
			Note: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			tableName: "t-zoneIntervention",
		}
	);
	return ZoneIntervention;
};
