const FamArticle = require('../../Model/main').FamArticle
const jwt = require('jsonwebtoken');
const { findbyId } = require('../Administration/ControllerDossier');
const { Dossier, Fournisseur, FamArtFourni } = require('../../Model/main');
const TypeTarif = require('../../Model/main').TypeTarif;



exports.AddFamille = async (req, res) => {
    try {
        if (auth.user.Role !== 'adminDossier') {
            return res.status(403).send({ message: 'Unathorized access.' });

        }
        const { codefamille, libelle, coefficient, valorisation, dossierId, idFournisseur, delaisliv, principale, equivStokage, idTarif } = req.body;
        const newFamille = { codefamille, libelle, coefficient, valorisation, dossierId };
        if (!dossierId) {
            return res.status(400).send({ message: 'Set dossierId.' });
        }

        const dossier = await findbyId(dossierId);
        if (!dossier) {
            return res.status(404).send({ message: 'Dossier not found' });
        }

        const fournisseur = await Fournisseur.findOne({ where: { idFournisseur: idFournisseur, dossierId: dossierId } });
        if (!fournisseur) {
            return res.status(404).send({ message: 'fournissuer obligatoire' });
        }
        const typeTarif = await TypeTarif.findOne({ where: { idTypetarif: idTarif, dossierId: dossierId } });
        if (!typeTarif) {
            return res.status(404).send({ message: 'type tarif obligatoire' });
        }


        if (!libelle || !coefficient || !valorisation || !codefamille) {
            return res.status(400).send({ message: 'les infomations obligatoire' });
        }

        const familleExists = await this.verifCodefamille(codefamille, dossierId);
        if (familleExists) {
            return res.status(200).send({ message: 'code famille est utilisé, essayer autre.' });
        }

        const famille = await FamArticle.create(newFamille);
        await FamArtFourni.create({
            idFournisseur: idFournisseur,
            idFamArt: famille.idFamArt,
            delaisliv: delaisliv,
            principale: principale,
            equivStokage: equivStokage,
        })
        await famille.addTypeTarif(typeTarif)
        return res.status(200).send({ message: 'Your famille Article has been created.' });

    } catch (err) {
        console.error("Error creating famille article:", err);
        res.status(500).send({ message: "Internal server error!" });
    }
};

exports.verifCodefamille = async (codefamille, dossierId) => {
    try {
        const testcode = await FamArticle.findOne({ where: { codefamille: codefamille, dossierId: dossierId } });
        return testcode;
    } catch (err) {
        console.error("Error dans verifCodefamille :", err);
        throw new Error("Internal server error!"); // Lancez une erreur pour indiquer une erreur interne du serveur
    }
};


exports.deleteFamille = async (req, res) => {
    try {
        if (auth.user.Role !== 'adminDossier') {
            return res.status(403).send({ message: 'Unathorized access.' });

        }
        const { id } = req.params;

        // Récupérer la famille d'article en fonction du codeFamille et du dossierId
        const familleArticle = await FamArticle.findOne({ where: { idFamArt: id } });

        // Vérifier si la famille d'article existe
        if (!familleArticle) {
            return res.status(404).json({ success: false, message: 'famille nest pas trouvé dans dossier.' });
        }

        // Supprimer la famille d'article
        await FamArticle.destroy({ where: { idFamArt: id } });

        res.status(200).json({ success: true, message: 'Famille d\'article supprimée avec succès' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.findAllFamille = async (req, res) => {
    try {
        const FamArticles = await FamArticle.findAll({
            include: [
                {
                    model: Dossier,
                    as: "Dossier"
                }

            ]
        });

        if (FamArticles.length === 0) {
            return res.status(404).send({ message: "Aucune famille trouvée" });
        }

        return res.status(200).send(FamArticles);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
};

exports.findAllFamilleBydossier = async (req, res) => {
    try {
        if (auth.user.Role !== 'adminDossier') {
            return res.status(403).send({ message: 'Unathorized access.' });

        }
        const dossierId = req.params.dossierId
        const famArticles = await FamArticle.findAll({
            where: { dossierId: dossierId },
            include: [
                {
                    model: Fournisseur,
                    as: "Fournisseurs"
                }

            ]
        })
        if (famArticles.length == 0) {
            return res.status(404).send({ message: "aucun famille trouvée" })
        }
        return res.status(200).send(famArticles)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.updateFamille = async (req, res) => {
    try {
        if (auth.user.Role !== 'adminDossier') {
            return res.status(403).send({ message: 'Unathorized access.' });

        }
        const { id } = req.params;
        const familleArt = await FamArticle.findOne({ where: { idFamArt: id } });

        if (!familleArt) {
            return res.status(404).json({ success: false, message: "famille Article non trouvé" });
        }

        await FamArticle.update(req.body, { where: { idFamArt: id } });

        res.status(200).json({ success: true, message: "famille Article mis à jour avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
};