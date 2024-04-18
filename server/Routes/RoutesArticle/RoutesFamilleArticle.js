const {AddFamille,deleteFamille , findAllFamille, updateFamille, findAllFamilleBydossier } = require("../../Controller/Article/ControllerFamilleArticle");


const router = require('express').Router();

module.exports = app => {
    router.post('/AddFamille',AddFamille);
    router.delete('/deleteFamille/:codefamille/:dossierId', deleteFamille);
    router.get('/findAllFamille', findAllFamille)
    router.get('/findAllFamillebydossier/:dossierId', findAllFamilleBydossier)

    router.put('/updateFamille/:id', updateFamille)
    


    app.use('/api/article', router);
};
