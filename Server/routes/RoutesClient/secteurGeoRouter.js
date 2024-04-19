const secteurGeoController = require("../../Controller/Client/secteurGeoController");
const router = require("express").Router();

router.post("/addSecteurGeo", secteurGeoController.addSecteurGeo);
router.get(
	"/getAllSecteurGeoByDossier/:dossierId",
	secteurGeoController.getAllSecteurGeoByDossier
);

router.delete("/deleteSecteurGeo/:id", secteurGeoController.deleteSecteurGeo);
router.put("/updateSecteurGeo/:id", secteurGeoController.updateSecteurGeo);
router.get("/getSecteurGeoById/:id", secteurGeoController.getSecteurGeoById);

module.exports = router;
