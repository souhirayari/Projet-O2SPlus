
const { AddModeRegl, deleteModeRegl, findAllModeRegl, updateModeRegl, findAllModeReglbyDossier } = require("../../Controller/Article/ControllerModeReg");


const router = require('express').Router();

module.exports = app => {
    router.post('/AddModeRegl', AddModeRegl);
    router.delete('/deleteModeRegl/:idMode', deleteModeRegl)
    router.get('/findAllModeRegl', findAllModeRegl)
    router.get('/findAllModeRegl/:dossierId', findAllModeReglbyDossier)
    router.put('/updateModeRegl/:idMode', updateModeRegl)


    app.use('/api/article', router);
};
