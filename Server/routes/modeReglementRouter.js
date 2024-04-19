const modeReglementController = require("../controllers/modeReglementController");
const router = require("express").Router();

router.post("/addModeReglement", modeReglementController.addModeReglement);
router.get(
	"/getAllModeReglementByDossier/:dossierId",
	modeReglementController.getAllModeReglementByDossier
);

router.delete(
	"/deleteModeReglement/:id",
	modeReglementController.deleteModeReglement
);

router.put(
	"/updateModeReglement/:id",
	modeReglementController.updateModeReglement
);

router.get(
	"/getModeReglementById/:id",
	modeReglementController.getModeReglementById
);

module.exports = router;
