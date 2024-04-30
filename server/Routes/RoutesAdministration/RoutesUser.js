
const { AddUserinfo,findAll, findByIdUser ,findOneUser, DeleteUser, updateUser ,findAllByDossier} = require('../../Controller/Administration/ControllerUser')
const {authMiddleware}=require('../../Controller/Auth/AuthController')

const router=require ('express').Router();

module.exports =app =>{
    router.post('/Add',authMiddleware,AddUserinfo);
    router.get('/findAll',authMiddleware,findAll);
    router.get('/findOneById/:id',findByIdUser)
    router.get('/findOneUser/:id',authMiddleware,findOneUser)
    router.delete('/delete/:id',authMiddleware,DeleteUser)
    router.put('/update/:id',authMiddleware,updateUser)
    router.get('/findAll/:dossierId',authMiddleware,findAllByDossier);





    app.use('/api/users',router);
}