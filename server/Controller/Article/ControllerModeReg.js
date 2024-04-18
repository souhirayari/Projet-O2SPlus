const ModeRegl = require('../../Model/main').ModeRegl
const jwt = require('jsonwebtoken');
const { findbyId } = require('../Administration/ControllerDossier');
const { Dossier } = require('../../Model/main');


exports.AddModeRegl = async (req, res) => {
    try {
        const {
            codeReg,
            libelle,
            pourcentage,
            TypePaiment,
            Mois,
            nbj,
            modePaiment,
            dossierId } = req.body


        if (!dossierId) {
            return res.status(400).send({ message: 'Set dossierId.' });
        }

        const dossier = await findbyId(dossierId);
        if (!dossier) {
            return res.status(404).send({ message: 'Dossier not found' });
        }

        if (!codeReg || !libelle || !pourcentage || !TypePaiment || !modePaiment) {
            return res.status(400).send({ message: 'Set inforamtion' });
        }

        const existingcodeReg = await ModeRegl.findOne({ where: { codeReg: codeReg, dossierId: dossierId } });
        if (existingcodeReg) {
            return res.status(400).send({ message: 'Mode Reglement with this codeReg  already exists.' });
        }
        await ModeRegl.create(req.body);
        return res.status(200).send({ message: 'Your Mode Reglement has been created.' });

    } catch (err) {
        console.error("Error creating Mode Reglement:", err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.deleteModeRegl = async (req, res) => {
    try {
        const { codeReg, dossierId } = req.params;

        await ModeRegl.destroy({ where: { codeReg: codeReg, dossierId: dossierId } });

        res.status(200).json({ success: true, message: 'Mode Reglement supprimé avec succès' });
    } catch (err) {
        console.error("Error deleteModeRegl Mode Reglement:", err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.findAllModeRegl = async (req, res) => {
    try {
        const modeRegls = await ModeRegl.findAll({
            where: {},
            include: [
                {
                    model: Dossier,
                    as: 'Dossier'
                }
            ]
        })
        if (modeRegls.length == 0) {
            return res.status(404).send({ message: "aucun Mode Reglement trouvée" })
        }
        return res.status(200).send(modeRegls)
    } catch (err) {
        console.error("Error findAll Mode Reglement:", err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.findAllModeReglbyDossier = async (req, res) => {
    try {
        const dossierId = req.params.dossierId
        const modeRegls = await ModeRegl.findAll({ where: { dossierId: dossierId } })
        if (modeRegls.length == 0) {
            return res.status(404).send({ message: "aucun Mode Reglement trouvée" })
        }
        return res.status(200).send(modeRegls)
    } catch (err) {
        console.error("Error findAll Mode Reglement by dossier:", err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.updateModeRegl = async (req, res) => {
    try {
        const id = req.params.id;
        const modeRegl = await ModeRegl.findOne({ where: { id: id } });

        if (!modeRegl) {
            return res.status(404).json({ success: false, message: "Mode Reglement non trouvé" });
        }

        await ModeRegl.update(req.body, { where: { id: id } });

        res.status(200).json({ success: true, message: "Mode Reglementmis à jour avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
};