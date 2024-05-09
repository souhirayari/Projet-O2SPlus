module.exports = (sequelize, Sequelize) => {
	const Vendeur = sequelize.define(
		"vendeur",
		{
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			Nom: {
				type: Sequelize.STRING,
				allowNull: false,
			},

			CodeVendeur: {
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

			Telephone: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			Email: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			status: {
				type: Sequelize.STRING,
				allowNull: true,
				validate: {
					isIn: [['Actif', 'Suspendu', 'Inactif', 'Retraité']]
				}
			},
		},
		{
			tableName: "t-vendeur",
		}
	);
	return Vendeur;
};