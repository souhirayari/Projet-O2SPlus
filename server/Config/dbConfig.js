module.exports={
    host:"localhost",
    user:"root",
    password:"",
    dataBase:"crud",
    dialect:"mysql",

    pool :{
        min: 0,
        max :10,
        acquire:3000000000,
        idle: 100000,

    }
}