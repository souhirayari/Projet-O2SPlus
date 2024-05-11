
const { AddModeRegl, deleteModeRegl, findAllModeRegl, updateModeRegl, findAllModeReglbyDossier } = require("../../Controller/Article/ControllerModeReg");
const {authMiddleware}= require('../../Controller/Auth/AuthController')

const router = require('express').Router();

module.exports = app => {
    router.post('/addmoderegl', authMiddleware,AddModeRegl);
    router.delete('/deleteModeRegl/:idmode', authMiddleware,deleteModeRegl)
    router.get('/findAllModeRegl', authMiddleware,findAllModeRegl)
    router.get('/findAllModeRegl/:dossierId',authMiddleware, findAllModeReglbyDossier)
    router.put('/updateModeRegl/:idmode', authMiddleware,updateModeRegl)


    app.use('/api/article', router);
};
