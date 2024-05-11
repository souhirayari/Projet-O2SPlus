const familleClientController = require("../../Controller/Client/familleClientController");
const { authMiddleware } = require('../../Controller/Auth/AuthController')
const router = require("express").Router();

router.post("/addFamilleClient", authMiddleware, familleClientController.addFamilleClient);
router.get(
	"/getFamilleClientByDossier/:dossierId",
	familleClientController.getFamilleClientByDossier
);
router.get("/getFamilleClient/:id", authMiddleware,familleClientController.getFamilleClient);
router.delete(
	"/deleteFamilleClient/:id", authMiddleware,
	familleClientController.deleteFamilleClient
);
router.put(
	"/updateFamilleClient/:id", authMiddleware,
	familleClientController.updateFamilleClient
);

module.exports = router;
