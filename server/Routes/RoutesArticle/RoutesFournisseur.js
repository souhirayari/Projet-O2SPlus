const { AddFournisseur, deleteFournisseur, findAllFournisseur, updateFournisseur, findAllFournisseurByDossier } = require("../../Controller/Article/ControllerFournisseur");
const { authMiddleware } = require('../../Controller/Auth/AuthController')


const router = require('express').Router();

module.exports = app => {
    router.post('/AddFournisseur/:dossierId', authMiddleware, AddFournisseur);
    router.delete('/deleteFournisseur/:idfournisseur', authMiddleware, deleteFournisseur)
    router.get('/findAllFournisseur', findAllFournisseur)
    router.get('/findAllFournisseurByDosier/:dossierId', authMiddleware, findAllFournisseurByDossier)
    router.put('/updateFournisseur/:id', authMiddleware, updateFournisseur)


    app.use('/api/article', router);
};
