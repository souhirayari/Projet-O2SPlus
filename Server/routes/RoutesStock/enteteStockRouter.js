const enteteStockController = require("../../Controller/Stock/enteteStockController");
const { authMiddleware } = require('../../Controller/Auth/AuthController')
const router = require("express").Router();

router.post("/addEnteteStock", authMiddleware, enteteStockController.addEnteteStock);
router.put("/updateEnteteStock/:id", authMiddleware, enteteStockController.updateEnteteStock);
router.delete(
	"/deleteEnteteStock/:id", authMiddleware,
	enteteStockController.deleteEnteteStock
);
router.get(
	"/getEnteteStockByFournisseur/:fournisseurId", authMiddleware,
	enteteStockController.getEnteteStockByFournisseur
);
router.get(
	"/getEnteteStockByDepot/:depotId", authMiddleware,
	enteteStockController.getEnteteStockByDepot
);

router.get(
	"/getAllEnteteStockByDossier/:dossierId", authMiddleware,
	enteteStockController.getAllEnteteStockByDossier
);

router.get(
	"/getAllEntreeEnteteStockByDossier/:dossierId", authMiddleware,
	enteteStockController.getAllEntreeEnteteStockByDossier
);

router.get(
	"/getAllSortieEnteteStockByDossier/:dossierId", authMiddleware,
	enteteStockController.getAllSortieEnteteStockByDossier
);
router.get(
	"/getOneEntete/:code/:dossierId", authMiddleware,
	enteteStockController.getOneEntete
);

router.get(
	"/getOneEntetebyid/:enteteId", authMiddleware,
	enteteStockController.getOneEntetebyId
);

module.exports = router;
