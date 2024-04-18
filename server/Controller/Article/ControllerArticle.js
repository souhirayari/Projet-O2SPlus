const Article = require('../../Model/main').Article
const jwt = require('jsonwebtoken');
const { FamArticle, Marque, FourArticle } = require('../../Model/main');
const { where } = require('sequelize');
const Fournisseur = require('../../Model/main').Fournisseur;



exports.AddArticle = async (req, res) => {
    try {
        const {
            codeArticle,
            libelle,
            type,
            TVA,
            prixAchat,
            prixTTC,
            prixHT,
            image,
            valorisation,
            modele,
            typeModele,
            puissance,
            durreGarantie,
            couverture,
            condition,
            gereEnStock,
            Serialize,
            IdMarque,
            idFamArt,
            idFournisseur,
            prixAchatFournisseur
        } = req.body;

        if (!await this.verifmarque(idFamArt, IdMarque)) {
            return res.status(400).send({ message: 'marqueId n\'appartent pas à ce dossier' });
        }

        const familleIds = await this.getAllfamilleIds(idFamArt);
        const existingArticle = await this.verifArticle(codeArticle, familleIds);
        if (existingArticle) {
            return res.status(400).send({ message: 'Cet article existe déjà dans une famille d\'articles de ce dossier.' });
        }


        if (!codeArticle || !libelle || !type || !prixAchat) {
            return res.status(400).send({ message: 'Veuillez fournir toutes les informations requises.' });
        }

        const newArticle = {
            codeArticle,
            libelle,
            type,
            TVA,
            prixAchat,
            prixTTC,
            prixHT,
            image,
            valorisation,
            modele,
            typeModele,
            puissance,
            durreGarantie,
            couverture,
            condition,
            gereEnStock,
            Serialize,
            IdMarque,
            idFamArt,
        };



        const article = await Article.create(newArticle);
        const fournisseur = await this.verifFournisseur(idFournisseur, idFamArt)
        if (fournisseur) {
            await FourArticle.create({
                idArticle: article.idArticle,
                idFournisseur: idFournisseur,
                prixAchat: prixAchatFournisseur
            });
        } else {
            return res.status(200).send({ message: 'Votre article a été créé mais founisseur n\'apprteint pas a ce dossier.' });
        }

        return res.status(200).send({ message: 'Votre article a été créé avec founisseur.' });

    } catch (err) {
        console.error("Erreur lors de la création de l'article :", err);
        res.status(500).send({ message: "Erreur interne du serveur !" });
    }
};


// verification de existance de article
exports.verifArticle = async (codeArticle, familleIds) => {
    try {
        const testcode = await Article.findOne({ where: { codeArticle: codeArticle, idFamArt: familleIds } });
        return testcode;
    } catch (err) {
        console.error("Erreur dans la vérification de l'article :", err);
        throw new Error("Erreur interne du serveur !");
    }
};

// verification de existance de Marque
exports.verifmarque = async (familleId, IdMarque) => {
    try {
        const famille = await FamArticle.findOne({ where: { idFamArt: familleId } });
        if (!famille) {
            throw new Error('Famille d\'articles non trouvée');
        }
        const testcode = await Marque.findOne({ where: { idMarque: IdMarque, dossierId: familleId } });
        return testcode;
    } catch (err) {
        console.error("Erreur dans la vérifMarque ControlleurArticle :", err);
        throw new Error("Erreur interne du serveur !");
    }
};
// verification de existance de Fournisseur 
exports.verifFournisseur = async (idFournisseur, idFamArt) => {

    try {
        const famille = await FamArticle.findOne({ where: { idFamArt: idFamArt } })
        const fournisseur = await Fournisseur.findOne({ where: { idFournisseur: idFournisseur } })
        if (fournisseur.dossierId != famille.dossierId) {
            return false
        }
        return true


    } catch (err) {
        console.error("erreur dans verifFournisseur ControlleurArticle ", err)
        throw new Error("Erreur interne du serveur !");
    }
}

// recuperation des ids de tous dossier de familleid donné
exports.getAllfamilleIds = async (familleId) => {
    try {
        const famille = await FamArticle.findOne({ where: { idFamArt: familleId } });
        if (!famille) {
            throw new Error('Famille d\'articles non trouvée');
        }
        const familles = await FamArticle.findAll({ where: { dossierId: famille.dossierId } });
        const familleIds = familles.map(famille => famille.idFamArt);
        return familleIds;
    } catch (err) {
        console.error("Erreur lors de la récupération des identifiants de famille :", err);
        throw new Error("Erreur interne du serveur !");
    }
};


exports.deleteArticle = async (req, res) => {
    try {
        const { codeArticle, dossierId } = req.params

        await Article.destroy({ where: { codeArticle: codeArticle, dossierId: dossierId } });

        res.status(200).json({ success: true, message: 'Article supprimé avec succès' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.findAllArticle = async (req, res) => {
    try {
        const articles = await Article.findAll({
            include: [
                {
                    model: FamArticle,
                    as: "FamilleArticle"
                }

            ]
        })
        if (articles.length == 0) {
            return res.status(404).send({ message: "aucun Article trouvée" })
        }
        return res.status(200).send(articles)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.findAllArticlebyDossier = async (req, res) => {
    try {
        const dossierId = req.params.dossierId
        const familles = await FamArticle.findAll({
            where: {
                dossierId: dossierId
            }
        })
        if (familles.length === 0) {
            return res.status(404).send({ message: "Aucune famille d'articles trouvée pour ce dossier" });
        }
        const familleIds = familles.map(famille => famille.idFamArt);

        const articles = await Article.findAll({
            where: { idFamArt: familleIds },
            include: [
                {
                    model: FamArticle,
                    as: "FamilleArticle"
                }

            ]

        });
        if (articles.length == 0) {
            return res.status(404).send({ message: "aucun Article trouvée" })
        }
        return res.status(200).send(articles)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
}
exports.updateArticle = async (req, res) => {
    try {
        const id = req.params.id;
        const article = await Article.findOne({ where: { id: id } });

        if (!article) {
            return res.status(404).json({ success: false, message: "Article non trouvé" });
        }

        await Article.update(req.body, { where: { id: id } });

        res.status(200).json({ success: true, message: "Article mis à jour avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
};