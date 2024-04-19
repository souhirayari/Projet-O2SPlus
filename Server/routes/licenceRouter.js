const licenceController = require("../controllers/licenceController");
const router = require("express").Router();

router.post("/addLicence", licenceController.addLicence);
router.get("/getAllLicence", licenceController.getAllLicence);
router.get("/getLicenceById/:id", licenceController.getLicenceById);
router.put("/updateLicence/:id", licenceController.updateLicence);
router.delete("/deleteLicence/:id", licenceController.deleteLicence);

router.post(
	"/assignLicenceToDossier",
	licenceController.assignLicenceToDossier
);

module.exports = router;
