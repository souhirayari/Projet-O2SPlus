const db = require("../models");
const Dossier = db.dossiers;
const Utilisateur = db.utilisateurs;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const addUtilisateur = async (req, res) => {
	const data = {
		Login: req.body.Login,
		Role: req.body.Role,
		MotDePasse: req.body.MotDePasse,
		Email: req.body.Email,
	};

	let dossier; // Declare dossier outside the if block

	if (!["AdminSite", "AdminDossier", "Utilisateur"].includes(data.Role)) {
		res.status(400).send("Invalid Role");
		return;
	}

	if (data.Role !== "AdminSite") {
		const dossierId = req.body.dossierId;

		if (!dossierId) {
			res.status(400).send("dossierId is required for non-AdminSite roles");
			return;
		}

		try {
			dossier = await Dossier.findByPk(dossierId);

			if (!dossier) {
				res.status(400).send("Invalid dossierId");
				return;
			}

			// Additional validation or checks on the dossier object as needed (e.g., status, permissions)
		} catch (error) {
			console.error("Error checking dossier:", error);
			res.status(500).send("Failed to verify dossier");
			return;
		}
	}

	try {
		const hashedPassword = await bcrypt.hash(data.MotDePasse, 10);
		data.MotDePasse = hashedPassword;
		const utilisateur = await Utilisateur.create(data);

		if (data.Role !== "AdminSite" && dossier) {
			const result = await assignUtilisateurToDossier(
				utilisateur.id,
				dossier.id
			); // Use dossier.id from fetched object
			if (!result.success) {
				res.status(500).send(result.message);
				return;
			}
		}

		res.status(200).send(utilisateur);
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).send("Failed to create user");
	}
};

const userLogin = async (req, res) => {
	const data = {
		Login: req.body.Login,
		MotDePasse: req.body.MotDePasse,
	};
	const utilisateur = await Utilisateur.findOne({
		where: { Login: data.Login },
	});
	if (!utilisateur) {
		return res.status(400).send("Invalid Login");
	}
	const validPassword = await bcrypt.compare(
		data.MotDePasse,
		utilisateur.MotDePasse
	);
	if (!validPassword) {
		return res.status(400).send("Invalid Password");
	}
	const token = jwt.sign(
		{
			Id_Utilisateur: utilisateur.id,
			Login: utilisateur.Login,
			Role: utilisateur.Role,
			DossierId: utilisateur.dossierId,
			Email: utilisateur.Email,
		},
		"RANDOM-TOKEN",
		{ expiresIn: "24h" }
	);

	//   return success response
	res.status(200).send({
		message: "Login Successful",
		token,
		Utilisateur: {
			Login: utilisateur.Login,
			Role: utilisateur.Role,
			dossierId: utilisateur.dossierId,
			Id_Utilisateur: utilisateur.id,
			Email: utilisateur.Email,
		},
	});
};

const getAllUtilisateur = async (req, res) => {
	const utilisateurs = await Utilisateur.findAll();
	res.status(200).send(utilisateurs);
};

const getUtilisateurById = async (req, res) => {
	const id = req.params.id;
	const utilisateur = await Utilisateur.findByPk(id);
	res.status(200).send(utilisateur);
};

const updateUtilisateur = async (req, res) => {
	const id = req.params.id;
	const data = {
		Role: req.body.role,
		MotDePasse: req.body.motDePasse,
		Email: req.body.email,
	};
	await Utilisateur.update(data, {
		where: { id: id },
	});
	res.status(200).send("Utilisateur updated successfully!");
};

const deleteUtilisateur = async (req, res) => {
	const id = req.params.id;
	await Utilisateur.destroy({
		where: { id: id },
	});
	res.status(200).send("Utilisateur deleted successfully!");
};

const assignUtilisateurToDossier = async (utilisateurId, dossierId) => {
	try {
		// Find the utilisateur and dossier
		const utilisateur = await Utilisateur.findByPk(utilisateurId);
		const dossier = await Dossier.findByPk(dossierId);

		// Check if both utilisateur and dossier exist
		if (!utilisateur || !dossier) {
			throw new Error("Utilisateur or Dossier not found");
		}

		// Associate utilisateur with dossier
		await utilisateur.setDossier(dossier);

		return {
			success: true,
			message: "Utilisateur assigned to Dossier successfully",
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: "Error assigning Utilisateur to Dossier",
		};
	}
};

module.exports = {
	addUtilisateur,
	getAllUtilisateur,
	getUtilisateurById,
	updateUtilisateur,
	deleteUtilisateur,
	assignUtilisateurToDossier,
	userLogin,
};
