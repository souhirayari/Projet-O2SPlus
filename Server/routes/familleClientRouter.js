const familleClientController = require("../controllers/familleClientController");
const router = require("express").Router();

router.post("/addFamilleClient", familleClientController.addFamilleClient);
router.get(
	"/getFamilleClientByDossier/:dossierId",
	familleClientController.getFamilleClientByDossier
);
router.get("/getFamilleClient/:id", familleClientController.getFamilleClient);
router.delete(
	"/deleteFamilleClient/:id",
	familleClientController.deleteFamilleClient
);
router.put(
	"/updateFamilleClient/:id",
	familleClientController.updateFamilleClient
);

module.exports = router;
