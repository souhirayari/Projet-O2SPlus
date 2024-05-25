
const {findAll} = require('../../Controller/Administration/ControllerUserDossier')
const {authMiddleware}=require('../../Controller/Auth/AuthController')

const router=require ('express').Router();

module.exports =app =>{
    router.get('/findAll',authMiddleware,findAll);
  



    app.use('/api/usersDossier',router);
}