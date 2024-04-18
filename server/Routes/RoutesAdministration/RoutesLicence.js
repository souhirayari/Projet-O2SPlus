
const { AddLicence, updateLicence, findAllLicence, findOnelicence,DeleteLicence } = require('../../Controller/Administration/ControllerLicence')
const {authMiddleware}=require('../../Controller/Auth/AuthController')

const router=require("express").Router();

module.exports= app => {
    router.post('/AddLicence',authMiddleware,AddLicence)
    router.delete('/delete/:id',authMiddleware,DeleteLicence)
    router.put('/update/:id',authMiddleware,updateLicence)
    router.get('/findAll',authMiddleware,findAllLicence)
    router.get('/findOne/:id',authMiddleware,findOnelicence)

    app.use('/api/licence', router);

}