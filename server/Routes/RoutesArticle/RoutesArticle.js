const {AddArticle,deleteArticle , findAllArticle, updateArticle, findAllArticlebyDossier } = require("../../Controller/Article/ControllerArticle");


const router = require('express').Router();

module.exports = app => {
    router.post('/AddArticle',AddArticle);
    router.delete('/deleteArticle/:codeArticle/:dossierId', deleteArticle)
    router.get('/findAllArticle', findAllArticle)
    router.get('/findAllArticle/:dossierId', findAllArticlebyDossier)
    router.put('/updateArticle/:id', updateArticle)
    


    app.use('/api/article', router);
};
