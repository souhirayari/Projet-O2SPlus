const Licence = require('../../Model/main').Licence;
const jwt = require('jsonwebtoken');
const { findbyId } = require('../Administration/ControllerDossier');
const { Dossier } = require('../../Model/main');

exports.AddLicence = async (req, res) => {
    try {
        if (auth.user.Role !== 'adminSite') {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        const {
            Datevalidation,
            DateDebut,
            DateFin,
            nombreUser,
            nombreTech,
            nombreclient,
            nombreArticle,
            statut,
            dossierId
        } = req.body;
        if (!Datevalidation || !nombreUser || !nombreTech || !nombreclient || !nombreArticle || !statut || !DateDebut || !DateFin)
            return res.status(400).send({ message: 'Set Information licence' });

        if (!dossierId) return res.status(400).send({ message: 'Set dossierId.' });

        const dossier = await findbyId(dossierId);

        if (!dossier) return res.status(404).send({ message: 'Dossier not found' });


        await Licence.create(req.body);
        res.status(200).send({ message: 'Your licence has been created.' });

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
};

exports.DeleteLicence = async (req, res) => {
    if (auth.user.Role !== 'adminSite') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    try {
        const id = req.params.id;
    
        await Licence.destroy({ where: { idLicence: id } });
        res.status(200).json({ success: true, message: 'Licence supprimée avec succès' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
};

exports.findAllLicence = async (req, res) => {
    
    if (auth.user.Role !== 'adminSite') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    try {
        const Licences = await Licence.findAll({ where: {},
        include:[
            {model :Dossier,
            as:'Dossier'}
        ] });
        if (Licences.length == 0) {
            return res.status(404).send({ message: "Aucune licence trouvée" });
        }
        return res.status(200).send(Licences);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
};

exports.findOnelicence = async (req, res) => {
    if (auth.user.Role !== 'adminSite') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    try {
        const id = req.params.id;
        const licence = await Licence.findOne({ where: { idLicence: id } });
        if (!licence) {
            return res.status(404).json({ success: false, message: "Licence non trouvée" });
        }
        res.status(200).json({ success: true, licence });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
};

exports.updateLicence = async (req, res) => {
    
    if (auth.user.Role !== 'adminSite') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    try {
        const id = req.params.id;
        const licence = await Licence.findOne({ where: { idLicence: id } });
        if (!licence) {
            return res.status(404).json({ success: false, message: "Licence non trouvée" });
        }
        await Licence.update(req.body, { where: { idLicence: id } });
        res.status(200).json({ success: true, message: "Licence mise à jour avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
};

