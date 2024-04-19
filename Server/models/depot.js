module.exports = (sequelize, DataTypes) => {
	const Depot = sequelize.define(
		"depot",
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
			CodeDepot: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			Pays: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			Ville: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			CodePostal: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			AdresseSecondaire: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			Responsable: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			Telephone: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			Principal: {
				type: DataTypes.BOOLEAN,
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
