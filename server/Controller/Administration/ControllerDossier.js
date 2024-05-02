
const Dossier = require('../../Model/main').Dossier
const jwt = require('jsonwebtoken');
const user = require('../../Model/main').User;
const Licence = require('../../Model/main').Licence;

exports.AddDossier = async (req, res) => {

    if (auth.user.Role !== 'adminSite') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    try {
        const {
            RaisonSociale,
            Adresse,
            CodePostal,
            Ville,
            Telephone,
            Mobile,
            Email,
            SiteWeb,
            MatriculeFiscale } = req.body;

        if (!RaisonSociale || !Adresse || !CodePostal || !Ville || !Telephone || !Mobile || !Email || !SiteWeb || !MatriculeFiscale)
            return res.status(400).send({ message: 'Please provide all dossier information.' })

        await Dossier.create(req.body);
        res.status(200).send({ message: 'Your dossier has been created.' });

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.DeleteDossier = async (req, res) => {
    if (auth.user.Role !== 'adminSite') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    try {
        const id = req.params.id;
        await Dossier.destroy({ where: { id: id } });

        res.status(200).json({ success: true, message: 'Dossier supprimé avec succès' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
};

exports.findAllDossier = async (req, res) => {
    if (auth.user.Role !== 'adminSite') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    try {
        const Dossiers = await Dossier.findAll({
            where: {},
            include: [{ model: user },
            {
                model: Licence,
                as: 'licence'
            }
            ]

        })
        if (Dossiers.length == 0) {
            return res.status(404).send({ message: "aucun dossier trouvée" })
        }


        return res.status(200).send(Dossiers)

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
}


exports.findOneDossier = async (req, res) => {
    if (auth.user.Role !== 'adminSite') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    try {
        const id = req.params.id;
        // Utilisez la méthode findOne pour trouver le dossier par son ID
        const dossier = await Dossier.findOne({
            where: { id: id },
            include: [
                { model: user }, // Incluez le modèle User
                { model: Licence, as: 'licence' } // Utilisez l'alias 'licence' pour le modèle Licence
            ]
        });

        // Vérifiez si le dossier existe
        if (!dossier) {
            throw new Error("Dossier non trouvé");
        }

        res.status(200).send({ success: true, dossier });
    } catch (error) {
        throw new Error(`Erreur lors de la recherche du dossier par ID : ${error.message}`);
    }
}


exports.updateDossier = async (req, res) => {
    if (auth.user.Role !== 'adminSite') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    try {
        const id = req.params.id;
        const dossier = await Dossier.findOne({ where: { id: id } });

        if (!dossier) {
            return res.status(404).json({ success: false, message: "Dossier non trouvé" });
        }

        await Dossier.update(req.body, { where: { id: id } });

        res.status(200).json({ success: true, message: "Dossier mis à jour avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
};

exports.findDossierById = async (req, res) => {
    if (auth.user.Role !== 'adminSite' &&  auth.user.Role !== 'adminDossier') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    try {
        const dossierId = req.params.id
        const dossier = await Dossier.findByPk(dossierId);

        if (dossier) {
            return res.status(200).send(dossier)
        }
    } catch (error) {

        console.error("Error finding dossier by ID:", error);
        throw error;
    }
}


// Fonction pour rechercher un dossier par son ID
exports.findbyId = async (dossierId) => {
    try {

        const dossierData = await Dossier.findByPk(dossierId);

        if (dossierData) {
            return dossierData;
        } else {
            throw new Error("Dossier not found");
        }
    } catch (error) {

        console.error("Error finding dossier by ID:", error);
        throw error;
    }
};