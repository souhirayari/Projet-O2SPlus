const depotController = require("../controllers/depotController");

const router = require("express").Router();

router.post("/addDepot", depotController.addDepot);

router.get("/getAllDepotByDossier/:id", depotController.getAllDepotByDossier);
router.get("/getDepot/:id", depotController.getDepot);
router.put("/updateDepot/:id", depotController.updateDepot);
router.delete("/deleteDepot/:id", depotController.deleteDepot);
router.get(
	"/getDepotPrincipalOfDossier/:id",
	depotController.getDepotPrincipalOfDossier
);

module.exports = router;
