
module.exports = (sequelize, Sequelize) => {
    const AppareilModel = sequelize.define('Appareil', {
        idAppareil: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,

		},
        codeAppareil: {
            type: Sequelize.STRING,
            allowNull: false,
           
        },
		libelle: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		numSerie: {
			type: Sequelize.STRING,
			allowNull: true,
			
		},
        modele: {
			type: Sequelize.STRING,
			allowNull: true,
		},
        typeModele: {
			type: Sequelize.STRING,
			allowNull: true,
		},
        puissance: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		genre: {
			type: Sequelize.STRING,
			allowNull: true,
		},
        note: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		TVA: {
			type: Sequelize.DOUBLE,
			allowNull: true,
		},
		prixAchat: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
		prixTTC: {
			type: Sequelize.DOUBLE,
			allowNull: true,
		},
		prixHT: {
			type: Sequelize.DOUBLE,
			allowNull: true,
		},
		dateVente: {
			type: Sequelize.DATE,
			allowNull: true,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		},
        debutGarantie: {
			type: Sequelize.DATE,
			allowNull: true,
		},
        finGarantie: {
			type: Sequelize.DATE,
			allowNull: true,
		},
		
        durreGarantie: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
        couverture: {
			type: Sequelize.ENUM,
			allowNull: true,
            values: ['A', 'M']
		},
        condition: {
			type: Sequelize.ENUM,
			allowNull: true,
            values: ['sur site', 'Atelier']
		},
	});



	  

    return AppareilModel;
};
