
const { AddDossier, findAllDossier, findOneDossier, DeleteDossier, updateDossier, findDossierById } = require("../../Controller/Administration/ControllerDossier");
const {authMiddleware}=require('../../Controller/Auth/AuthController')
const router = require('express').Router();

module.exports = app => {
    router.post('/AddDossier', authMiddleware,AddDossier);
    router.delete('/delete/:id', authMiddleware, DeleteDossier); // Protégez également cette route avec le middleware
    router.get('/findAll', authMiddleware, findAllDossier); // Protégez toutes les autres routes nécessitant une authentification
    router.get('/findOne/:id', authMiddleware, findOneDossier);
    router.put('/update/:id', authMiddleware, updateDossier);
    router.get('/findDossierById/:id', authMiddleware, findDossierById);

    app.use('/api/dossier', router);
};
