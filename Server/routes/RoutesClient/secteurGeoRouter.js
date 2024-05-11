const secteurGeoController = require("../../Controller/Client/secteurGeoController");
const { authMiddleware } = require('../../Controller/Auth/AuthController')
const router = require("express").Router();

router.post("/addSecteurGeo", authMiddleware, secteurGeoController.addSecteurGeo);
router.get(
	"/getAllSecteurGeoByDossier/:dossierId", authMiddleware,
	secteurGeoController.getAllSecteurGeoByDossier
);

router.delete("/deleteSecteurGeo/:id", authMiddleware, secteurGeoController.deleteSecteurGeo);
router.put("/updateSecteurGeo/:id", authMiddleware, secteurGeoController.updateSecteurGeo);
router.get("/getSecteurGeoById/:id", authMiddleware, secteurGeoController.getSecteurGeoById);

module.exports = router;
