
const { AddTypeTarif, deleteTypeTarif, findAllTypeTarif, updateTypeTarif, findAllTypeTarifByDossier } = require("../../Controller/Article/ControllerTypeTarif");
const { authMiddleware } = require('../../Controller/Auth/AuthController')

const router = require('express').Router();

module.exports = app => {
    router.post('/AddTypeTarif', authMiddleware, AddTypeTarif);
    router.delete('/deleteTypeTarif/:idtype', authMiddleware, deleteTypeTarif)
    router.get('/findAllTypeTarif', findAllTypeTarif)
    router.get('/findAllTypeTarifbyDossier/:dossierId', authMiddleware, findAllTypeTarifByDossier)
    router.put('/updateTypeTarif/:idtype', authMiddleware, updateTypeTarif)


    app.use('/api/article', router);
};

