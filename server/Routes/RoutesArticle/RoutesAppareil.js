const {AddAppareil,deleteAppareil , findAllAppareil, updateAppareil, findAllAppareilbyDossier } = require("../../Controller/Article/ControllerAppareil");


const router = require('express').Router();

module.exports = app => {
    router.post('/AddAppareil',AddAppareil);
    router.delete('/deleteAppareil/:codeAppareil/:articleId', deleteAppareil)
    router.get('/findAllAppareil', findAllAppareil)
    router.get('/findAllAppareilbyDossier/:dossierId', findAllAppareilbyDossier)

    router.put('/updateAppareil/:id', updateAppareil)
    

    app.use('/api/article', router);
};
