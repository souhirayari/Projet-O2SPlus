const Technicien = require('../../Model/main').Technicien;
const jwt = require('jsonwebtoken');
const { findbyId } = require('../Administration/ControllerDossier');
const Dossier = require('../../Model/main').Dossier;
const bcrypt = require('bcrypt');
const { User } = require('../../Model/main');


exports.AddTechnicien = async (req, res) => {
    console.log(auth)
    try {
        if (auth.user.Role !== 'adminDossier') {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        const { login, password, dossierId, nom, prenom, genre, dateNaissance, email, specialite, adresse, ville, codePostal, pays, status } = req.body;
        const characters = "0123456789AZERTYUIOPMLKJHGFDSQWXCVBNazertyuiopmlkjhgfdsqwxcvbn";
        let activationCode = "";
        for (let i = 0; i < 25; i++) {
            activationCode += characters[Math.floor(Math.random() * characters.length)];
        }
        const passwordBcrypt = bcrypt.hashSync(password, 8);

        // Créer un nouvel utilisateur avec les données fournies
        const newTechnicien = {
            login,
            password: passwordBcrypt,
            dossierId,
            nom,
            prenom,
            genre,
            dateNaissance,
            email,
            specialite,
            adresse,
            ville,
            codePostal,
            pays,
            status,
            activationCode,
        };

        // Vérifier si les champs requis sont fournis
        if (!login || !password || !email) {
            return res.status(400).send({ message: 'Set login, password,  and email.' });
        }

        // Vérifier si l'utilisateur existe déjà avec le même login
        const existingTechnicien = await User.findOne({ where: { login: login } }) || await Technicien.findOne({ where: { login: login } })
        if (existingTechnicien) {
            return res.status(400).send({ message: 'Technicien with this login already exists.' });
        }

        const newtech = await Technicien.create(newTechnicien)
        // Envoyer un email de confirmation
        return res.status(200).send({ message: 'Technicien is createcd .' });
    } catch (err) {
        console.error("Error creating technicien:", err);
        res.status(500).send({ message: "Internal server error!" });
    }
}


exports.findAll = async (req, res) => {

    try {
        const techniciens = await Technicien.findAll({ where: {} })
        if (techniciens.length == 0) return res.status(404).send({ message: 'no Users exist' })
        return res.status(200).send(techniciens);

    } catch (err) {
        console.error(err)
        res.status(500).send({ message: ' internal server error !' })
    }
}

exports.findByIdTechnicien = async (req, res) => {

    try {
        const idtech = req.params.idtech;
        const technicien = await Technicien.findByPk(idtech);
        if (!technicien) {
            return res.status(404).send({ message: 'User not found' });
        }
        const tokenPayload = {
            id: technicien.idtech,
            login: technicien.login,
        };
        const token = jwt.sign(tokenPayload, 'user', { expiresIn: '24h' });
        res.status(200).json({ success: true, token });

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error!' });
    }
}


exports.findOneTechnicien = async (req, res) => {
    try {
        // Vérifier si l'utilisateur authentifié a le rôle 'adminDossier'
        if (auth.user.Role !== 'adminDossier') {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        // Récupérer l'ID du technicien depuis les paramètres de la requête
        const idtech = req.params.idtech;

        // Rechercher le technicien avec l'ID spécifié et inclure les dossiers associés
        const technicien = await Technicien.findOne({
            where: { idtech: idtech },
            include: [{
                model: Dossier,
                as: 'Dossier' // Assurez-vous que 'as' correspond au nom de l'association dans votre modèle Technicien
            }]
        });

        // Si aucun technicien n'est trouvé, renvoyer une réponse 404
        if (!technicien) {
            return res.status(404).send({ message: 'Technicien not found' });
        }

        // Si un technicien est trouvé, renvoyer ses détails
        res.status(200).send(technicien);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error!' });
    }
}

exports.DeleteTechnicien = async (req, res) => {
    if (auth.user.Role !== 'adminDossier') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    try {
        const idtech = req.params.idtech;

        await Technicien.destroy({ where: { idtech: idtech } });

        res.status(200).json({ success: true, message: 'Technicien supprimé avec succès' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
};



exports.updateTechnicien = async (req, res) => {

    if (auth.user.Role !== 'adminDossier') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    try {
        const idtech = req.params.idtech;
        const technicien = await Technicien.findOne({ where: { idtech: idtech } });

        if (!technicien) {
            return res.status(404).json({ success: false, message: "Technicien non trouvé" });
        }

        await Technicien.update(req.body, { where: { idtech: idtech } });

        res.status(200).json({ success: true, message: "Technicien mis à jour avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
};

exports.findAllByDossier = async (req, res) => {
    console.log(auth)
    if (auth.user.Role !== 'adminDossier') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    try {
        const { dossierId } = req.params;
        console.log('dossierid ', dossierId)
        const techniciens = await Technicien.findAll({ where: { dossierId: dossierId } });

        // Vérifiez si les utilisateurs existent dans le dossier
        if (techniciens.length === 0) {
            return res.status(404).send({ message: `No technicien exist in dossier ${dossierId}` });
        }

        return res.status(200).send(techniciens);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error!' });
    }
};
