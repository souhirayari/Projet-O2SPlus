const TypeTarif = require('../../Model/main').TypeTarif
const jwt = require('jsonwebtoken');
const { findbyId } = require('../Administration/ControllerDossier');
const { Dossier } = require('../../Model/main');


exports.AddTypeTarif = async (req, res) => {
    try {
        if (auth.user.Role !== 'adminDossier') {
            res.status(403).send({ message: 'unauthoried asscess' })
        }
        const {
            codeTypeTarif,
            libelle,
            type,
            dossierId } = req.body

        if (!dossierId) {
            return res.status(400).send({ message: 'Set dossierId.' });
        }

        const dossier = await findbyId(dossierId);
        if (!dossier) {
            return res.status(404).send({ message: 'Dossier not found' });
        }

        if (!codeTypeTarif || !libelle || !type) {
            return res.status(400).send({ message: 'Set inforamtion' });
        }

        const existingTypeTarif = await TypeTarif.findOne({ where: { codeTypeTarif: codeTypeTarif, dossierId: dossierId } });
        if (existingTypeTarif) {
            return res.status(400).send({ message: 'Type Tarif with this codeTypeTarif  already exists.' });
        }

        await TypeTarif.create(req.body);
        return res.status(200).send({ message: 'Your Type Tarif has been created.' });

    } catch (err) {
        console.error("Error creating TypeTarif:", err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.deleteTypeTarif = async (req, res) => {

    if (auth.user.Role !== 'adminDossier') {
        res.status(403).send({ message: 'unauthoried asscess' })
    }

    try {
        const { idtype } = req.params;

        await TypeTarif.destroy({ where: { idTypetarif: idtype } });

        res.status(200).json({ success: true, message: 'Type Tarif supprimé avec succès' });
    } catch (err) {
        console.log("error dans delete typeTarif", err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.findAllTypeTarif = async (req, res) => {
    try {
        const TypeTarifs = await TypeTarif.findAll({
            where: {},
            include: [
                {
                    model: Dossier,
                    as: 'Dossier'
                }
            ]
        })
        if (TypeTarifs.length == 0) {
            return res.status(404).send({ message: "aucun Type Tarif trouvée" })
        }
        return res.status(200).send(TypeTarifs)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.findAllTypeTarifByDossier = async (req, res) => {

    if (auth.user.Role !== 'adminDossier') {
        res.status(403).send({ message: 'unauthoried asscess' })
    }
    try {
        const dossierId = req.params.dossierId
        const TypeTarifs = await TypeTarif.findAll({
            where: { dossierId: dossierId },
        })
        if (TypeTarifs.length == 0) {
            return res.status(404).send({ message: "aucun Type Tarif trouvée" })
        }
        return res.status(200).send(TypeTarifs)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.updateTypeTarif = async (req, res) => {

    if (auth.user.Role !== 'adminDossier') {
        res.status(403).send({ message: 'unauthoried asscess' })
    }
    try {
        console.log(req.params)
        const idtype  = req.params.idtype;
        console.log(idtype)
        const typeTarif = await TypeTarif.findOne({ where: { idTypetarif: idtype } });

        if (!typeTarif) {
            return res.status(404).json({ success: false, message: "Type Tarif non trouvé" });
        }

        await TypeTarif.update(req.body, { where: { idTypetarif: idtype } });

        res.status(200).json({ success: true, message: "Type Tarif mis à jour avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
};