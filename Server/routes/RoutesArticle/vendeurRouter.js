const vendeurController = require("../../Controller/Article/ControllerVendeur");
const { authMiddleware } = require('../../Controller/Auth/AuthController')

const router = require("express").Router();

router.post("/addvendeur", authMiddleware, vendeurController.addVendeur);
router.put("/update/:id", authMiddleware, vendeurController.updateVendeur);
router.delete("/delete/:id", authMiddleware, vendeurController.deleteVendeur);
router.get("/getVendeur/:id", authMiddleware, vendeurController.getVendeur);
router.get("/getAllVendeurByDossier/:dossierId", authMiddleware,
	vendeurController.getAllVendeurByDossier
);

router.get("/numberOfVendeursByDossier/:dossierId", authMiddleware,
	vendeurController.numberOfVendeursByDossier
);

module.exports = router;
