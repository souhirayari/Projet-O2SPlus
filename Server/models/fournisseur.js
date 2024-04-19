module.exports = (sequelize, DataTypes) => {
	const Fournisseur = sequelize.define(
		"fournisseur",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			Nom: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			CodeFournisseur: {
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
			Interlocuteur: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			Telephone: {
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
			tableName: "t-fournisseur",
		}
	);
	return Fournisseur;
};
