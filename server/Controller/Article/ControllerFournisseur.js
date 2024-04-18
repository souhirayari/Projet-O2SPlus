const Fournisseur = require('../../Model/main').Fournisseur
const jwt = require('jsonwebtoken');
const { findbyId } = require('../Administration/ControllerDossier');
const { ModeRegl, Dossier } = require('../../Model/main');


exports.AddFournisseur = async (req, res) => {
    try {
        const {
            codeFourniseur,
            genre,
            nom,
            Adresse,
            CodePostal,
            Ville,
            Telephone,
            Mobile,
            Pays,
            Email,
            SiteWeb,
            delais,
            dossierId,
            idReg
        } = req.body

        if (!dossierId) {
            return res.status(400).send({ message: 'Set dossierId.' });
        }

        const dossier = await findbyId(dossierId);
        if (!dossier) {
            return res.status(404).send({ message: 'Dossier not found' });
        }

        const modeReg = await ModeRegl.findOne({ where: { idReg: idReg } })
        if (modeReg.dossierId != dossierId) {
            return res.status(404).send({ message: 'mode Reglement n\'appartient pas à ce dossier' });

        }

        if (!codeFourniseur || !genre || !nom || !Adresse || !CodePostal || !Ville || !Telephone || !Mobile || !Pays || !Email || !delais) {
            return res.status(400).send({ message: 'Set inforamtion' });
        }
        const existingFournisseur = await Fournisseur.findOne({ where: { codeFourniseur: codeFourniseur, dossierId: dossierId } });
        if (existingFournisseur) {
            return res.status(400).send({ message: 'Fournisseur with this codeFourniseur already exists.' });
        }

        await Fournisseur.create(req.body);
        return res.status(200).send({ message: 'Your Fournisseur has been created.' });

    } catch (err) {
        console.error("Error creating Fournisseur:", err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.deleteFournisseur = async (req, res) => {
    try {
        const { codeFourniseur, dossierId } = req.params;

        await Fournisseur.destroy({ where: { codeFourniseur: codeFourniseur, dossierId: dossierId } });

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
        const id = req.params.id;
        const fournisseur = await Fournisseur.findOne({ where: { id: id } });

        if (!fournisseur) {
            return res.status(404).json({ success: false, message: " Fournisseur non trouvé" });
        }

        await Fournisseur.update(req.body, { where: { id: id } });

        res.status(200).json({ success: true, message: "Fournisseur mis à jour avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
};