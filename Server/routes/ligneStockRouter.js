const ligneStockController = require("../controllers/ligneStockController");

const router = require("express").Router();

router.post("/addLigneStock", ligneStockController.addLigneStock);
router.get("/getLigneStock/:id", ligneStockController.getLigneStock);
router.get(
	"/getLigneStockByEnteteStock/:enteteStockId",
	ligneStockController.getLigneStockByEnteteStock
);
router.delete("/deleteLigneStock/:id", ligneStockController.deleteLigneStock);
router.put("/updateLigneStock/:id", ligneStockController.updateLigneStock);
router.get(
	"/getAllLigneStockByDossier/:dossierId",
	ligneStockController.getAllLigneStockByDossier
);

router.get(
	"/getQuantityByArticleAndDepot/:articleId/:depotId",
	ligneStockController.getQuantityByArticleAndDepot
);

router.put(
	"/updateQuantite/:articleId/:depotId/:quantite",
	ligneStockController.updateQuantite
);

module.exports = router;
