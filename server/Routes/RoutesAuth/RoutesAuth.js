
const { VerifyUser, SignIn } = require("../../Controller/Auth/AuthController");

const router = require('express').Router();

module.exports = app => {
    router.post('/verifyUser',VerifyUser);
    router.post('/signin',SignIn)
   


    app.use('/api/auth', router);
};
