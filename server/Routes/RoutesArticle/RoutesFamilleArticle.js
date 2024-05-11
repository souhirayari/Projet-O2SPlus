const { AddFamille, deleteFamille, findAllFamille, updateFamille, findAllFamilleBydossier } = require("../../Controller/Article/ControllerFamilleArticle");

const { authMiddleware } = require('../../Controller/Auth/AuthController')
const router = require('express').Router();

module.exports = app => {
    router.post('/AddFamille', authMiddleware, AddFamille);
    router.delete('/deleteFamille/:id', authMiddleware, deleteFamille);
    router.get('/findAllFamille', authMiddleware, findAllFamille)
    router.get('/findAllFamillebydossier/:dossierId', authMiddleware, findAllFamilleBydossier)

    router.put('/updateFamille/:id', authMiddleware, updateFamille)



    app.use('/api/article', router);
};
