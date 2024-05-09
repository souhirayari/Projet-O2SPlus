const { AddArticle, deleteArticle, findAllArticle, updateArticle, findAllArticlebyDossier, findOneArticle } = require("../../Controller/Article/ControllerArticle");
const { authMiddleware } = require('../../Controller/Auth/AuthController')

const router = require('express').Router();

module.exports = app => {
    router.post('/AddArticle', authMiddleware, AddArticle);
    router.delete('/deleteArticle/:id', authMiddleware, deleteArticle)
    router.get('/findAllArticle', findAllArticle)
    router.get('/findAllArticle/:dossierId', authMiddleware, findAllArticlebyDossier)
    router.get('/findOneArticle/:idArticle', authMiddleware, findOneArticle)
    router.put('/updateArticle/:id', authMiddleware, updateArticle)

    app.use('/api/article', router);
};
