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

const familleClientRouter = require("./Routes/RoutesClient/familleClientRouter.js");
app.use("/api/familleClient", familleClientRouter);
const secteurGeoRouter = require("./Routes/RoutesClient/secteurGeoRouter.js");
app.use("/api/secteurGeo", secteurGeoRouter);
const clientRouter = require("./Routes/RoutesClient/clientRouter.js");
app.use("/api/client", clientRouter);
const siteClientRouter = require("./Routes/RoutesClient/siteClientRouter.js");
app.use("/api/siteClient", siteClientRouter);
const zoneInterventionRouter = require("./Routes/RoutesArticle/zoneInterventionRouter.js");
app.use("/api/zoneIntervention", zoneInterventionRouter);
const vendeurRouter = require("./Routes/RoutesArticle/vendeurRouter.js");
app.use("/api/vendeur", vendeurRouter);
const depotRouter = require("./Routes/RoutesStock/depotRouter.js");
app.use("/api/depot", depotRouter);
const enteteStockRouter = require("./Routes/RoutesStock/enteteStockRouter.js");
app.use("/api/enteteStock", enteteStockRouter);
const ligneStockRouter = require("./Routes/RoutesStock/ligneStockRouter.js");
app.use("/api/ligneStock", ligneStockRouter);

app.get('/', (req, res) => {
    res.send("hello world")
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Le serveur fonctionne sur le port ${port}`);
});
