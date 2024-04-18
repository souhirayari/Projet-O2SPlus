const {AddFournisseur,deleteFournisseur , findAllFournisseur, updateFournisseur, findAllFournisseurByDossier } = require("../../Controller/Article/ControllerFournisseur");


const router = require('express').Router();

module.exports = app => {
    router.post('/AddFournisseur',AddFournisseur);
    router.delete('/deleteFournisseur/:codeFourniseur/:dossierId', deleteFournisseur)
    router.get('/findAllFournisseur', findAllFournisseur)
    router.get('/findAllFournisseurByDosier/:dossierId', findAllFournisseurByDossier)
    router.put('/updateFournisseur/:id', updateFournisseur)
    

    app.use('/api/article', router);
};
