
const { AddTechnicien,findAll, findByIdTechnicien ,findOneTechnicien, DeleteTechnicien, updateTechnicien ,findAllByDossier} = require('../../Controller/Technicien/ControllerTechnicien')
const {authMiddleware}=require('../../Controller/Auth/AuthController')

const router=require ('express').Router();

module.exports =app =>{
    router.post('/addtechnicien',authMiddleware,AddTechnicien);
    router.get('/findAll',authMiddleware,findAll);
    router.get('/findOneById/:idtech',findByIdTechnicien)
    router.get('/findOneTechnicien/:idtech',authMiddleware,findOneTechnicien)
    router.delete('/delete/:idtech',authMiddleware,DeleteTechnicien)
    router.put('/update/:idtech',authMiddleware,updateTechnicien)
    router.get('/findAllbyDossier/:dossierId',authMiddleware,findAllByDossier);





    app.use('/api/technicien',router);
}