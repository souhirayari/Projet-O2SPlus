const vendeurController = require("../controllers/vendeurController");

const router = require("express").Router();

router.post("/addVendeur", vendeurController.addVendeur);
router.put("/updateVendeur/:id", vendeurController.updateVendeur);
router.delete("/deleteVendeur/:id", vendeurController.deleteVendeur);
router.get("/getVendeur/:id", vendeurController.getVendeur);
router.get(
	"/getAllVendeurByDossier/:dossierId",
	vendeurController.getAllVendeurByDossier
);

router.get(
	"/numberOfVendeursByDossier/:dossierId",
	vendeurController.numberOfVendeursByDossier
);

module.exports = router;
