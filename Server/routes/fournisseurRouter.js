const fournisseurController = require("../controllers/fournisseurController");

const router = require("express").Router();

router.post("/addFournisseur", fournisseurController.addFournisseur);
router.get("/getFournisseur/:id", fournisseurController.getFournisseur);
router.put("/updateFournisseur/:id", fournisseurController.updateFournisseur);
router.delete(
	"/deleteFournisseur/:id",
	fournisseurController.deleteFournisseur
);

router.get(
	"/getAllFournisseurByDossier/:dossierId",
	fournisseurController.getAllFournisseurByDossier
);

module.exports = router;
