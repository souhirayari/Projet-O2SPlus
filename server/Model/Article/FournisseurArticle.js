
module.exports=(sequelize,Sequelize)=>{
    const FournisseurArticleModel= sequelize.define ('FourArticle', {
        id:{
			type: Sequelize.INTEGER,
			autoIncrement: true,
            primaryKey: true,
		},
        prixAchat:{
            type: Sequelize.DOUBLE,
            allowNull: false,
        }
        
    });
    
    return FournisseurArticleModel
}