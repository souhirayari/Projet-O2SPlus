const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
	origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dossierRouter = require("./routes/dossierRouter.js");
app.use("/api/dossier", dossierRouter);

const utilisateurRouter = require("./routes/utilisateurRouter.js");
app.use("/api/utilisateur", utilisateurRouter);

const licenceRouter = require("./routes/licenceRouter.js");
app.use("/api/licence", licenceRouter);

const modeReglementRouter = require("./routes/modeReglementRouter.js");
app.use("/api/modeReglement", modeReglementRouter);
const typeTarifRouter = require("./routes/typeTarifRouter.js");
app.use("/api/typeTarif", typeTarifRouter);
const familleClientRouter = require("./routes/familleClientRouter.js");
app.use("/api/familleClient", familleClientRouter);
const secteurGeoRouter = require("./routes/secteurGeoRouter.js");
app.use("/api/secteurGeo", secteurGeoRouter);
const clientRouter = require("./routes/clientRouter.js");
app.use("/api/client", clientRouter);
const siteClientRouter = require("./routes/siteClientRouter.js");
app.use("/api/siteClient", siteClientRouter);
const zoneInterventionRouter = require("./routes/zoneInterventionRouter.js");
app.use("/api/zoneIntervention", zoneInterventionRouter);
const vendeurRouter = require("./routes/vendeurRouter.js");
app.use("/api/vendeur", vendeurRouter);
const fournisseurRouter = require("./routes/fournisseurRouter.js");
app.use("/api/fournisseur", fournisseurRouter);
const depotRouter = require("./routes/depotRouter.js");
app.use("/api/depot", depotRouter);
const enteteStockRouter = require("./routes/enteteStockRouter.js");
app.use("/api/enteteStock", enteteStockRouter);
const articleRouter = require("./routes/articleRouter.js");
app.use("/api/article", articleRouter);
const ligneStockRouter = require("./routes/ligneStockRouter.js");
app.use("/api/ligneStock", ligneStockRouter);
app.listen(3001, () => {
	console.log(`Server running on http://localhost:3001/`);
});
