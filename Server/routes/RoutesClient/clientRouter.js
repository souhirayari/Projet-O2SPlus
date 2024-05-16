const clientController = require("../../Controller/Client/clientController");
const { authMiddleware } = require('../../Controller/Auth/AuthController')
const router = require("express").Router();

router.post("/addClient", authMiddleware, clientController.addClient);
router.get("/getDossierIdOfClient/:id", clientController.getDossierIdOfClient);
router.get("/getClientById/:id", authMiddleware, clientController.getClientById);
router.delete("/deleteClient/:id", authMiddleware, clientController.deleteClient);
router.put("/updateClient/:id", authMiddleware, clientController.updateClient);
router.get("/getAllClientByFamilleClient/:familleClientId", authMiddleware, clientController.getAllClientByFamilleClient
);
router.get(
	"/getAllClientByDossier/:dossierId", authMiddleware,
	clientController.getAllClientByDossier
);

module.exports = router;
