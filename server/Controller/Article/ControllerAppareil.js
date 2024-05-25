const Appareil = require('../../Model/main').Appareil
const jwt = require('jsonwebtoken');
const { Article, FamArticle, Sequelize, clients } = require('../../Model/main');
const moment = require('moment');

const { Op } = require('sequelize'); // Importer Op de sequelize

exports.AddAppareil = async (req, res) => {
    try {
        if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
            res.status(403).send({ message: 'Unauthorized Access' })
        }
        const {
            codeAppareil,
            libelle,
            numSerie,
            modele,
            typeModele,
            puissance,
            genre,
            note,
            TVA,
            prixAchat,
            prixTTC,
            prixHT,
            dateVente,
            debutGarantie,
            finGarantie,
            durreGarantie,
            couverture,
            condition,
            idArticle,
            clientId
        } = req.body



        const existingAppareil = await this.VerifAppareil(idArticle, codeAppareil, numSerie)
        if (existingAppareil) {
            return res.status(400).send({ message: 'Un appareil avec ce codeAppareil ou numero de serie  existe déjà.' });
        }

        if (!codeAppareil || !libelle || !numSerie || !prixAchat) {
            return res.status(400).send({ message: 'Veuillez renseigner toutes les informations obligatoires.' });
        }

        const article = await this.getArticle(idArticle);
        console.log(article)
        const debutGarantieDate = moment(Sequelize.literal('CURRENT_TIMESTAMP'));

        const debutGarantieDateCopy = debutGarantieDate.clone();

        const finGarantieDate = debutGarantieDateCopy.add(article.durreGarantie, 'days').toDate();

        const newAppareil = {
            codeAppareil,
            libelle,
            numSerie,
            modele: modele || article.modele,
            typeModele: typeModele || article.typeModele,
            puissance: puissance || article.puissance,
            genre: genre || article.idFamArt,
            note,
            TVA: TVA || article.TVA,
            prixAchat: prixAchat || article.prixAchat,
            prixTTC: prixTTC || article.prixTTC,
            prixHT: prixHT || article.prixHT,
            dateVente: dateVente,
            debutGarantie: debutGarantieDate,
            finGarantie: finGarantieDate,
            durreGarantie: durreGarantie || article.durreGarantie,
            couverture: couverture || article.couverture,
            condition: condition || article.condition,
            idArticle,
            clientId
        };

        await Appareil.create(newAppareil);
        return res.status(200).send({ message: 'Votre appareil a été créé.' });

    } catch (err) {
        console.error("Erreur lors de la création de l'appareil :", err);
        res.status(500).send({ message: "Erreur lors de la création de l'appareil :" });
    }
}


exports.VerifAppareil = async (articleId, codeAppareil, numSerie) => {

    try {
        const article = await Article.findOne({ where: { idArticle: articleId } })
        if (!article) {
            return res.status(404).send({ message: 'Article not found' });
        }
        const famille = await FamArticle.findOne({ where: { idFamArt: article.idFamArt } })
        const familles = await FamArticle.findAll({ where: { dossierId: famille.dossierId } })
        const famillesIds = familles.map(famille => famille.idFamArt);
        const articles = await Article.findAll({ where: { idFamArt: famillesIds } })
        const ArticlesIds = articles.map(article => article.idArticle);
        const appareil = Appareil.findOne({
            where: {
                idArticle: ArticlesIds,
                [Op.or]: [
                    { codeAppareil: codeAppareil },
                    { numSerie: numSerie }
                ]
            }
        })
        return appareil


    } catch (err) {
        console.error("Error VerifAppareil :", err);
        res.status(500).send({ message: "Internal server error!" });
    }


}
exports.getArticle = async (idArticle) => {

    try {
        const article = await Article.findOne({ where: { idArticle: idArticle } })
        if (!article) {
            return res.status(404).send({ message: 'Article not found' });
        }
        return article

    } catch (err) {
        console.error("Error getArticle :", err);
        res.status(500).send({ message: "Internal server error!" });
    }


}


exports.deleteAppareil = async (req, res) => {
    try {
        if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
            res.status(403).send({ message: 'Unauthorized Access' })
        }
        const idappareil = req.params.idappareil;

        await Appareil.destroy({ where: { idappareil: idappareil } });

        res.status(200).json({ success: true, message: 'Appareil supprimé avec succès' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.findAllAppareil = async (req, res) => {
    try {
        const Appareils = await Appareil.findAll({
            where: {},
            include: [{
                model: Article, // Nom du modèle Article

            }],
        });
        if (Appareils.length == 0) {
            return res.status(404).send({ message: "aucun Appareil trouvée" })
        }
        return res.status(200).send(Appareils)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.findOneAppareil = async (req, res) => {
    try {
        const idappareil = req.params.idappareil
        const appareil = await Appareil.findOne({
            where: { idAppareil: idappareil },
            include: [{
                model: Article,

            }, {
                model: clients,
                as: 'Clients'

            }],
        });

        if (appareil.length == 0) {
            return res.status(404).send({ message: "Aucun Appareil trouvée" })
        }

        return res.status(200).send(appareil)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
}
exports.findAllAppareilbyDossier = async (req, res) => {
    try {
        if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
            res.status(403).send({ message: 'Unauthorized Access' })
        }
        const dossierId = req.params.dossierId
        const familles = await FamArticle.findAll({ where: { dossierId: dossierId } })
        const famillesIds = familles.map(famille => famille.idFamArt);
        const articles = await Article.findAll({ where: { idFamArt: famillesIds } })
        const articleIDs = articles.map(article => article.idArticle);

        const Appareils = await Appareil.findAll({
            where: { idArticle: articleIDs },
            include: [{
                model: Article,
            },
            {
                model: clients,
                as: 'Clients'

            }],
        });

        if (Appareils.length == 0) {
            return res.status(404).send({ message: "aucun Appareil trouvée" })
        }
        return res.status(200).send(Appareils)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
}


exports.updateAppareil = async (req, res) => {
    try {
        if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
            res.status(403).send({ message: 'Unauthorized Access' })
        }
        const idappareil = req.params.idappareil;
        const appareil = await Appareil.findOne({ where: { idAppareil: idappareil } });

        if (!appareil) {
            return res.status(404).json({ success: false, message: "Appareil non trouvé" });
        }

        await Appareil.update(req.body, { where: { idAppareil: idappareil } });

        res.status(200).json({ success: true, message: "Appareil mis à jour avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
};