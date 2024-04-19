const typeTarifController = require("../controllers/typeTarifController");
const router = require("express").Router();

router.post("/addTypeTarif", typeTarifController.addTypeTarif);
router.put("/updateTypeTarif/:id", typeTarifController.updateTypeTarif);
router.delete("/deleteTypeTarif/:id", typeTarifController.deleteTypeTarif);
router.get("/getTypeTarif/:id", typeTarifController.getTypeTarif);
router.get(
	"/getAllTypeTarifByDossier/:dossierId",
	typeTarifController.getAllTypeTarifByDossier
);
module.exports = router;
