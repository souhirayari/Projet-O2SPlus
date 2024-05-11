const zoneInterventionController = require("../../Controller/Article/ControllerZoneIntervention");
const { authMiddleware } = require('../../Controller/Auth/AuthController')
const router = require("express").Router();

router.post(
	"/addZoneIntervention", authMiddleware,
	zoneInterventionController.addZoneIntervention
);

router.put(
	"/updateZoneIntervention/:id", authMiddleware,
	zoneInterventionController.updateZoneIntervention
);

router.delete(
	"/deleteZoneIntervention/:id", authMiddleware,
	zoneInterventionController.deleteZoneIntervention
);

router.get(
	"/getAllZoneInterventionByDossier/:dossierId", authMiddleware,
	zoneInterventionController.getAllZoneInterventionByDossier
);

router.get(
	"/getZoneInterventionById/:id", authMiddleware,
	zoneInterventionController.getZoneInterventionById
);

module.exports = router;
