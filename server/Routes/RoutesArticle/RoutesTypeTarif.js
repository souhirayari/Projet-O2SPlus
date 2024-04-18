
const { AddTypeTarif, deleteTypeTarif, findAllTypeTarif, updateTypeTarif, findAllTypeTarifByDossier } = require("../../Controller/Article/ControllerTypeTarif");


const router = require('express').Router();

module.exports = app => {
    router.post('/AddTypeTarif', AddTypeTarif);
    router.delete('/deleteTypeTarif/:codeTypeTarif/:dossierId', deleteTypeTarif)
    router.get('/findAllTypeTarif', findAllTypeTarif)
    router.get('/findAllTypeTarifbyDossier/:dossierId', findAllTypeTarifByDossier)
    router.put('/updateTypeTarif/:id', updateTypeTarif)


    app.use('/api/article', router);
};

