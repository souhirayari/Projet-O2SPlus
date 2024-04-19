module.exports = (sequelize, DataTypes) => {
	const TypeTarif = sequelize.define(
		"typeTarif",
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
			CodeTypeTarif: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			Type: {
				type: DataTypes.ENUM("Tarif HT", "Tarif TTC"),
				allowNull: false,
				defaultValue: "Tarif HT",
			},
		},
		{
			tableName: "t-typeTarif",
		}
	);
	return TypeTarif;
};
