
const {AddMarque,deleteMarque , findAllMarque, updateMarque, findAllMarqueByDossier } = require("../../Controller/Article/ControllerMarque");


const router = require('express').Router();

module.exports = app => {
    router.post('/AddMarque',AddMarque);
    router.delete('/deleteMarque/:id', deleteMarque)
    router.get('/findAllMarque', findAllMarque)
    router.get('/findAllMarqueByDossier/:dossierId', findAllMarqueByDossier)
    router.put('/updateMarque/:id', updateMarque)
    

    app.use('/api/article', router);
};
