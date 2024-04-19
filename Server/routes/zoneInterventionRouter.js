const zoneInterventionController = require("../controllers/zoneInterventionController");

const router = require("express").Router();

router.post(
	"/addZoneIntervention",
	zoneInterventionController.addZoneIntervention
);

router.put(
	"/updateZoneIntervention/:id",
	zoneInterventionController.updateZoneIntervention
);

router.delete(
	"/deleteZoneIntervention/:id",
	zoneInterventionController.deleteZoneIntervention
);

router.get(
	"/getAllZoneInterventionByDossier/:dossierId",
	zoneInterventionController.getAllZoneInterventionByDossier
);

router.get(
	"/getZoneInterventionById/:id",
	zoneInterventionController.getZoneInterventionById
);

module.exports = router;
