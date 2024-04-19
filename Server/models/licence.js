module.exports = (sequelize, DataTypes) => {
	const Licence = sequelize.define(
		"licence",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},

			DateValidation: {
				type: DataTypes.DATEONLY,
				allowNull: true,
			},
			NombreMaxTechniciens: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			NombreMaxClients: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			NombreMaxUtilisateur: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
		},
		{
			tableName: "t-licence",
		}
	);
	return Licence;
};
