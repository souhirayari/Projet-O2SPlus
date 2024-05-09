const Fournisseur = require('../../Model/main').Fournisseur
const jwt = require('jsonwebtoken');
const { findbyId } = require('../Administration/ControllerDossier');
const { ModeRegl, Dossier } = require('../../Model/main');


exports.AddFournisseur = async (req, res) => {
    try {
        if (auth.user.Role !== 'adminDossier') {
            return res.status(403).json({ message: 'Accès non autorisé' });
        }

        const dossierId = parseInt(req.params.dossierId, 10);
        
        const {
            codeFournisseur,
            genre,
            nom,
            prenom,
            adresse,
            codePostal,
            ville,
            telephone,
            mobile,
            pays,
            email,
            siteWeb,
            delais,
            idReg,
        } = req.body;

        const newFournisseur = {
            codeFournisseur,
            genre,
            nom,
            prenom,
            Adresse :adresse,
            CodePostal :codePostal,
            Ville:ville,
            Telephone :telephone,
            mobile : mobile,
            Pays :pays,
            Email:email,
            siteWeb,
            delais,
            idReg,
            dossierId
        };

        if (!dossierId) {
            return res.status(400).send({ message: 'Veuillez définir le dossierId.' });
        }

        const dossier = await findbyId(dossierId);
        if (!dossier) {
            return res.status(404).send({ message: 'Dossier introuvable' });
        }

        const modeReg = await ModeRegl.findOne({ where: { idReg: idReg } });
        if (!modeReg || modeReg.dossierId !== dossierId) {
            return res.status(404).send({ message: 'Le mode de règlement n\'appartient pas à ce dossier' });
        }

        if (!codeFournisseur || !nom || !telephone || !email || !idReg) {
            return res.status(400).send({ message: 'Veuillez renseigner toutes les informations obligatoires.' });
        }

        const existingFournisseur = await Fournisseur.findOne({ where: { codeFournisseur: codeFournisseur, dossierId: dossierId } });
        if (existingFournisseur) {
            return res.status(400).send({ message: 'Un fournisseur avec ce code fournisseur existe déjà.' });
        }

        await Fournisseur.create(newFournisseur);
        return res.status(200).send({ message: 'Le fournisseur a été créé avec succès.' });
    } catch (err) {
        console.error("Erreur lors de la création du fournisseur:", err);
        res.status(500).send({ message: "Erreur interne du serveur!" });
    }

};
exports.deleteFournisseur = async (req, res) => {
    try {
        if (auth.user.Role !== 'adminDossier') {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        const { idfournisseur } = req.params;

        await Fournisseur.destroy({ where: { idFournisseur: idfournisseur } });

        res.status(200).json({ success: true, message: 'Fournisseur supprimé avec succès' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.findAllFournisseur = async (req, res) => {
    try {
        const fournisseurs = await Fournisseur.findAll({
            where: {},
            include: [
                {
                    model: Dossier,
                    as: 'Dossier'
                }
            ]
        })
        if (fournisseurs.length == 0) {
            return res.status(404).send({ message: "aucun fournisseur trouvée" })
        }
        return res.status(200).send(fournisseurs)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.findAllFournisseurByDossier = async (req, res) => {
    try {
        if (auth.user.Role !== 'adminDossier') {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        const dossierId = req.params.dossierId
        const fournisseurs = await Fournisseur.findAll({
            where: { dossierId: dossierId },
            include: [
                {
                    model: ModeRegl,
                    as: 'ModeRegl'
                }
            ]
        })
        if (fournisseurs.length == 0) {
            return res.status(404).send({ message: "aucun fournisseur trouvée" })
        }
        return res.status(200).send(fournisseurs)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.updateFournisseur = async (req, res) => {
    try {
        if (auth.user.Role !== 'adminDossier') {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        const id = req.params.id;
        console.log(id)
        const fournisseur = await Fournisseur.findOne({ where: { idFournisseur: id } });

        if (!fournisseur) {
            return res.status(404).json({ success: false, message: " Fournisseur non trouvé" });
        }

        await Fournisseur.update(req.body, { where: { idFournisseur: id } });

        res.status(200).json({ success: true, message: "Fournisseur mis à jour avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
};