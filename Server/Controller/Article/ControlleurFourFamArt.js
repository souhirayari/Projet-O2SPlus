const FamArtFourni = require('../../Model/main').FamArtFourni;
const { Fournisseur, FamArticle } = require('../../Model/main');

exports.findAllFourFamilleBydossier = async (req, res) => {
    try {
        const dossierId = req.params.dossierId;

        // Récupérer les IDs des familles d'articles associées à ce dossier
        const famIds = await this.getfamilleids(dossierId);

        // Trouver les lignes de la table FamArtFourni qui ont des IDs de famille dans la liste famIds
        const famArtFourniRows = await FamArtFourni.findAll({
            where: { idFamArt: famIds },
          
        });
        if (famArtFourniRows.length === 0) {
            return res.status(404).send({ message: "Aucune ligne trouvée" });
        }

        return res.status(200).send(famArtFourniRows);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
}

exports.getfamilleids = async (dossierId) => {
    try {
        const famille = await FamArticle.findAll({ where: { dossierId: dossierId } });
        // Utilisez la méthode map pour extraire les IDs des familles
        const familleIds = famille.map(fam => fam.idFamArt);
        return familleIds;
    } catch (err) {
        console.error("Erreur dans getfamilleids :", err);
        throw new Error("Erreur interne du serveur !");
    }
};
