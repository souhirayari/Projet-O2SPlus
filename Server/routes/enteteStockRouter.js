const enteteStockController = require("../controllers/enteteStockController");
const router = require("express").Router();

router.post("/addEnteteStock", enteteStockController.addEnteteStock);
router.put("/updateEnteteStock/:id", enteteStockController.updateEnteteStock);
router.delete(
	"/deleteEnteteStock/:id",
	enteteStockController.deleteEnteteStock
);
router.get(
	"/getEnteteStockByFournisseur/:fournisseurId",
	enteteStockController.getEnteteStockByFournisseur
);
router.get(
	"/getEnteteStockByDepot/:depotId",
	enteteStockController.getEnteteStockByDepot
);

router.get(
	"/getAllEnteteStockByDossier/:dossierId",
	enteteStockController.getAllEnteteStockByDossier
);

router.get(
	"/getAllEntreeEnteteStockByDossier/:dossierId",
	enteteStockController.getAllEntreeEnteteStockByDossier
);

router.get(
	"/getAllSortieEnteteStockByDossier/:dossierId",
	enteteStockController.getAllSortieEnteteStockByDossier
);

module.exports = router;
