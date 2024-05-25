const { AddAppareil, deleteAppareil, findAllAppareil, updateAppareil, findAllAppareilbyDossier, findOneAppareil } = require("../../Controller/Article/ControllerAppareil");

const { authMiddleware } = require('../../Controller/Auth/AuthController')
const router = require('express').Router();

module.exports = app => {
    router.post('/AddAppareil', authMiddleware, AddAppareil);
    router.delete('/deleteAppareil/:idappareil', authMiddleware, deleteAppareil)
    router.get('/findAllAppareil', findAllAppareil)
    router.get('/findAllAppareilbyDossier/:dossierId', authMiddleware, findAllAppareilbyDossier)
    router.get('/findOneAppareil/:idappareil', authMiddleware, findOneAppareil)

    router.put('/updateAppareil/:idappareil', authMiddleware, updateAppareil)


    app.use('/api/article', router);
};
