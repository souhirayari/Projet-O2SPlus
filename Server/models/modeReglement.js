module.exports = (sequelize, DataTypes) => {
	const ModeReglement = sequelize.define(
		"modeReglement",
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

			CodeModeReglement: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: "t-modeReglement",
		}
	);
	return ModeReglement;
};
