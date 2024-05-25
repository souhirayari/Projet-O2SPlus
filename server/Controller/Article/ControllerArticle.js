const Article = require('../../Model/main').Article
const jwt = require('jsonwebtoken');
const { FamArticle, Marque, FourArticle } = require('../../Model/main');
const { where } = require('sequelize');
const Fournisseur = require('../../Model/main').Fournisseur;



// Importez les modules nécessaires, y compris auth s'il n'est pas déjà importé

exports.AddArticle = async (req, res) => {
    try {
        // Assurez-vous que auth est correctement défini et contient l'utilisateur actuel

        // Vérifiez le rôle de l'utilisateur
        if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

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
            idMarque,
            idFamArt,
            idFournisseur,
            prixAchatFournisseur
        } = req.body;
        console.log(req.body)


        const familleIds = await this.getAllfamilleIds(idFamArt);
        console.log(familleIds)
        // Vérifiez si l'article existe déjà dans une famille d'articles du dossier
        const existingArticle = await this.verifArticle(codeArticle, familleIds);
        if (existingArticle) {
            return res.status(400).send({ message: 'Cet article existe déjà dans une famille d\'articles de ce dossier.' });
        }

        // Vérifiez si toutes les informations requises sont fournies
        if (!codeArticle || !libelle || !prixAchat) {
            return res.status(400).send({ message: 'Veuillez fournir toutes les informations requises.' });
        }

        // Créez un nouvel article
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
            idMarque,
            idFamArt,
        };

        // Sauvegardez le nouvel article dans la base de données
        const article = await Article.create(newArticle);

        // Vérifiez si le fournisseur appartient au même dossier que la famille d'articles
        const isFournisseurValid = await this.verifFournisseur(idFournisseur, idFamArt);
        if (isFournisseurValid) {
            // Si le fournisseur est valide, créez une association entre l'article et le fournisseur
            await FourArticle.create({
                idArticle: article.idArticle,
                idFournisseur: idFournisseur,
                prixAchat: prixAchatFournisseur
            });
        } else {
            return res.status(200).send({ message: 'Votre article a été créé mais le fournisseur n\'appartient pas à ce dossier.' });
        }

        // Retournez un message de réussite
        return res.status(200).send({ message: 'Votre article a été créé avec succès.' });
    } catch (err) {
        console.error("Erreur lors de la création de l'article :", err);
        res.status(500).send({ message: "Erreur interne du serveur !" });
    }
};

// Les fonctions verifArticle, verifmarque, verifFournisseur et getAllfamilleIds restent inchangées


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
        console.log(famille)
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

    if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    try {
        const { id } = req.params

        await Article.destroy({ where: { idArticle: id } });

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
        // Vérifier l'autorisation
        const userRole = auth.user.Role;
        if (userRole !== 'adminDossier' && userRole !== 'user') {
            return res.status(403).json({ message: 'Unauthorized access' });
        }


        const dossierId = req.params.dossierId;

        // Récupérer les familles d'articles
        const familles = await FamArticle.findAll({
            where: { dossierId: dossierId }
        });

        if (familles.length === 0) {
            return res.status(404).send({ message: "Aucune famille d'articles trouvée pour ce dossier" });
        }

        // Récupérer les marques
        const marques = await Marque.findAll({
            where: { dossierId: dossierId }
        });


        if (marques.length === 0) {
            return res.status(404).send({ message: "Aucune marque trouvée pour ce dossier" });
        }

        // Extraire les identifiants de famille et de marque
        const familleIds = familles.map(famille => famille.idFamArt);
        const marqueIds = marques.map(marque => marque.idMarque);

        // Récupérer les articles avec famille et marque
        const articles = await Article.findAll({
            where: { idFamArt: familleIds, idMarque: marqueIds },
            include: [
                { model: FamArticle, as: "FamilleArticle" },
                { model: Marque, as: "Marque" }
            ]
        });

        if (articles.length === 0) {
            return res.status(404).send({ message: "Aucun article trouvé pour ce dossier" });
        }

        return res.status(200).send(articles);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Erreur interne du serveur!" });
    }
}

exports.updateArticle = async (req, res) => {

    if (auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    try {
        const id = req.params.id;
        const article = await Article.findOne({ where: { idArticle: id } });

        if (!article) {
            return res.status(404).json({ success: false, message: "Article non trouvé" });
        }

        await Article.update(req.body, { where: { idArticle: id } });

        res.status(200).json({ success: true, message: "Article mis à jour avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
};

exports.findOneArticle = async (req, res) => {
    try {
        const idArticle = req.params.idArticle;
        const article = await Article.findOne({
            where: { idArticle: idArticle },
            include: [
                {
                    model: FamArticle,
                    as: "FamilleArticle"
                },
                {
                    model: Marque,
                    as: "Marque"
                }
            ]
        });
        if (!article) {
            return res.status(404).send({ message: "Aucun article trouvé" });
        }
        return res.status(200).send(article);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Erreur interne du serveur !" });
    }
};
