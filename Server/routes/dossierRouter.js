const dossierController = require("../controllers/dossierController.js");

const router = require("express").Router();

router.post("/addDossier", dossierController.addDossier);
router.get("/getAllDossier", dossierController.getAllDossier);
router.get("/getDossierById/:id", dossierController.getDossierById);
router.put("/updateDossier/:id", dossierController.updateDossier);
router.delete("/deleteDossier/:id", dossierController.deleteDossier);
router.get(
	"/getUtilisateurDossier/:id",
	dossierController.getUtilisateurDossier
);

router.post(
	"/addUtilisateurDossier",
	dossierController.assignUtilisateurToDossier
);

router.get("/getLicenceDossier/:id", dossierController.getLicenceDossier);

module.exports = router;
