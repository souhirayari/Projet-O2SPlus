const Marque = require('../../Model/main').Marque
const jwt = require('jsonwebtoken');
const { findbyId } = require('../Administration/ControllerDossier');
const { Model } = require('sequelize');
const { Dossier } = require('../../Model/main');



exports.AddMarque = async (req, res) => {
    try {
        const { codeMarque, libelle, dossierId } = req.body
        const newMarque = { libelle, codeMarque, dossierId }

        if (!dossierId) {
            return res.status(400).send({ message: 'Set dossierId.' });
        }

        const dossier = await findbyId(dossierId);
        if (!dossier) {
            return res.status(404).send({ message: 'Dossier not found' });
        }

        if (!libelle || !codeMarque) {
            return res.status(404).send({ message: 'set information' });
        }

        const existingMarque = await Marque.findOne({ where: { codeMarque: codeMarque, dossierId: dossierId } });
        if (existingMarque) {
            return res.status(400).send({ message: 'Marque with this codeMarque already exists.' });
        }

        await Marque.create(newMarque);
        return res.status(200).send({ message: 'Your Marque has been created.' });

    } catch (err) {
        console.error("Error creating Marque:", err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.deleteMarque = async (req, res) => {
    try {
        const { codeMarque, dossierId } = req.params;

        await Marque.destroy({ where: { codeMarque: codeMarque, dossierId: dossierId } });

        res.status(200).json({ success: true, message: 'Marque  supprimé avec succès' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.findAllMarque = async (req, res) => {
    try {
        const marques = await Marque.findAll({
            where: {},
            include: [
                {
                    model: Dossier,
                    as: 'Dossier'
                }]
        })
        if (marques.length == 0) {
            return res.status(404).send({ message: "aucun Marque trouvée" })
        }
        return res.status(200).send(marques)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.findAllMarqueByDossier = async (req, res) => {
    try {
        const dossierId = req.params.dossierId
        const marques = await Marque.findAll({ where: { dossierId: dossierId } })
        if (marques.length == 0) {
            return res.status(404).send({ message: "aucun Marque trouvée" })
        }
        return res.status(200).send(marques)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
}
exports.updateMarque = async (req, res) => {
    try {
        const id = req.params.id;
        const marque = await Marque.findOne({ where: { id: id } });

        if (!marque) {
            return res.status(404).json({ success: false, message: "Marque  non trouvé" });
        }

        await Marque.update(req.body, { where: { id: id } });

        res.status(200).json({ success: true, message: "Marque mis à jour avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
};

