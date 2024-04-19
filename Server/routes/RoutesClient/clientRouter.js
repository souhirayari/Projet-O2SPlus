const clientController = require("../../Controller/Client/clientController");
const router = require("express").Router();

router.post("/addClient", clientController.addClient);
router.get("/getDossierIdOfClient/:id", clientController.getDossierIdOfClient);
router.get("/getClientById/:id", clientController.getClientById);
router.delete("/deleteClient/:id", clientController.deleteClient);
router.put("/updateClient/:id", clientController.updateClient);
router.get("/getAllClientByFamilleClient/:familleClientId",clientController.getAllClientByFamilleClient
);
router.get(
	"/getAllClientByDossier/:dossierId",
	clientController.getAllClientByDossier
);

module.exports = router;
