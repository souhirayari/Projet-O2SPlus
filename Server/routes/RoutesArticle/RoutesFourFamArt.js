const { findAllFourFamilleBydossier } = require("../../Controller/Article/ControlleurFourFamArt");

const { authMiddleware } = require('../../Controller/Auth/AuthController')
const router = require('express').Router();

module.exports = app => {
    router.get('/findAllfamArtFourBydossier/:dossierId', findAllFourFamilleBydossier);

    app.use('/api/article', router);
};
