const articleController = require("../controllers/articleController");

const router = require("express").Router();

router.post("/addArticle", articleController.addArticle);
router.get(
	"/getAllAricleByDossier/:dossierId",
	articleController.getAllAricleByDossier
);

module.exports = router;
