const utilisateurController = require("../controllers/utilisateurController");
const router = require("express").Router();

router.post("/addUtilisateur", utilisateurController.addUtilisateur);
router.get("/getAllUtilisateur", utilisateurController.getAllUtilisateur);
router.get("/getUtilisateurById/:id", utilisateurController.getUtilisateurById);
router.put("/updateUtilisateur/:id", utilisateurController.updateUtilisateur);
router.delete(
	"/deleteUtilisateur/:id",
	utilisateurController.deleteUtilisateur
);

router.post(
	"/assignUtilisateurToDossier",
	utilisateurController.assignUtilisateurToDossier
);
router.post("/login", utilisateurController.userLogin);

module.exports = router;
