const ligneStockController = require("../../Controller/Stock/ligneStockController");
const { authMiddleware } = require('../../Controller/Auth/AuthController')
const router = require("express").Router();

router.post("/addLigneStock", authMiddleware, ligneStockController.addLigneStock);
router.get("/getLigneStock/:id", authMiddleware, ligneStockController.getLigneStock);
router.get(
	"/getLigneStockByEnteteStock/:enteteStockId", authMiddleware,
	ligneStockController.getLigneStockByEnteteStock
);
router.delete("/deleteLigneStock/:id", authMiddleware, ligneStockController.deleteLigneStock);
router.put("/updateLigneStock/:id", authMiddleware, ligneStockController.updateLigneStock);
router.get(
	"/getAllLigneStockByDossier/:dossierId", authMiddleware,
	ligneStockController.getAllLigneStockByDossier
);

router.get(
	"/getQuantityByArticleAndDepot/:articleId/:depotId", authMiddleware,
	ligneStockController.getQuantityByArticleAndDepot
);

router.put(
	"/updateQuantite/:articleId/:depotId/:quantite", authMiddleware,
	ligneStockController.updateQuantite
);

module.exports = router;
