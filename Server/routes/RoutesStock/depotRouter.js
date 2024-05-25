const depotController = require("../../Controller/Stock/depotController");
const { authMiddleware } = require('../../Controller/Auth/AuthController')
const router = require("express").Router();

router.post("/addDepot", authMiddleware, depotController.addDepot);

router.get("/getAllDepotByDossier/:id", authMiddleware, depotController.getAllDepotByDossier);
router.get("/getDepot/:id", authMiddleware, depotController.getDepot);
router.put("/updateDepot/:id", authMiddleware, depotController.updateDepot);
router.delete("/deleteDepot/:id", authMiddleware, depotController.deleteDepot);
router.get(
	"/getDepotPrincipalOfDossier/:id", authMiddleware,
	depotController.getDepotPrincipalOfDossier
);

module.exports = router;
