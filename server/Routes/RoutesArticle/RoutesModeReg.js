
const { AddModeRegl, deleteModeRegl, findAllModeRegl, updateModeRegl, findAllModeReglbyDossier } = require("../../Controller/Article/ControllerModeReg");


const router = require('express').Router();

module.exports = app => {
    router.post('/AddModeRegl', AddModeRegl);
    router.delete('/deleteModeRegl/:codeReg/:dossierId', deleteModeRegl)
    router.get('/findAllModeRegl', findAllModeRegl)
    router.get('/findAllModeRegl/:dossierId', findAllModeReglbyDossier)
    router.put('/updateModeRegl/:id', updateModeRegl)


    app.use('/api/article', router);
};
