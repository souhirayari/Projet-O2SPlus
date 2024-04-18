require('dotenv').config();
const express = require('express')
const bodyparser = require('body-parser')
const app = express();
const cors = require('cors');

const PORT = process.env.PORT


app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.use(cors());


// connct  database
const db = require('./Model/main');
db.sequelize.sync({ force: false, alter: true })
    .then(() => {
        console.log('Database synchronized successfully');
    })
    .catch((error) => {
        console.error('Database failed to connect:', error);
    });

//include routes 
/* 
? administration */
require('./Routes/RoutesAdministration/RoutesUser')(app)
require('./Routes/RoutesAdministration/RoutesDossier')(app)
require('./Routes/RoutesAdministration/RoutesLicence')(app)


/* 
* Article */
require('./Routes/RoutesArticle/RoutesFamilleArticle')(app)
require('./Routes/RoutesArticle/RoutesArticle')(app)
require('./Routes/RoutesArticle/RoutesFournisseur')(app)
require('./Routes/RoutesArticle/RoutesMarque')(app)
require('./Routes/RoutesArticle/RoutesAppareil')(app)
require('./Routes/RoutesArticle/RoutesModeReg')(app)
require('./Routes/RoutesArticle/RoutesTypeTarif')(app)

/*
* Auth */ 
require('./Routes/RoutesAuth/RoutesAuth')(app)




app.get('/', (req, res) => {
    res.send("hello world")
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`)
})
