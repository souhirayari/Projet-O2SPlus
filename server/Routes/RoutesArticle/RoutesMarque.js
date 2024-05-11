
const {AddMarque,deleteMarque , findAllMarque, updateMarque, findAllMarqueByDossier } = require("../../Controller/Article/ControllerMarque");
const {authMiddleware}=require('../../Controller/Auth/AuthController')

const router = require('express').Router();

module.exports = app => {
    router.post('/addmarque',authMiddleware,AddMarque);
    router.delete('/deleteMarque/:id', authMiddleware,deleteMarque)
    router.get('/findAllMarque', authMiddleware,findAllMarque)
    router.get('/findAllmarqueByDossier/:dossierId', authMiddleware,findAllMarqueByDossier)
    router.put('/updateMarque/:id', authMiddleware,updateMarque)
    

    app.use('/api/article', router);
};
