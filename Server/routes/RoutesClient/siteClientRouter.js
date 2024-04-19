const siteClientController = require("../../Controller/Client/siteClientController");
const router = require("express").Router();

router.post("/addSiteClient", siteClientController.addSiteClient);
router.get(
	"/getAllSiteByClient/:clientId",
	siteClientController.getAllSiteByClient
);
router.get("/getSiteClient/:id", siteClientController.getSiteClient);
router.delete("/deleteSiteClient/:id", siteClientController.deleteSiteClient);
router.put("/updateSiteClient/:id", siteClientController.updateSiteClient);
router.get(
	"/getDossierIdBySiteClientId/:siteClientId",
	siteClientController.getDossierIdBySiteClientId
);
router.get(
	"/getAllSitesByDossierId/:dossierId",
	siteClientController.getAllSitesByDossierId
);

module.exports = router;
