
module.exports=(sequelize,Sequelize) =>{
    const TypeTarifModel = sequelize.define('TypeTarif' ,{
        idTypetarif: {
            type: Sequelize.INTEGER,
			autoIncrement: true,
            primaryKey: true,
        },
        codeTypeTarif: {
            type: Sequelize.STRING,
            allowNull: false,
           
        },
        libelle:{
            type : Sequelize.STRING,
            allownull: false,
        },
        type:{
            type: Sequelize.ENUM,
            allownull: true,
            values : ['Tarif HT','Tarif TTC']
        }

    })
   return TypeTarifModel
}