
const UserDossier = require('../../Model/main').userDossier;


exports.create = async (userId, dossierId) => {
    try {
        const userDossier = await UserDossier.create({
            UtilisateurId: userId,
            DossierId: dossierId
        });
        return userDossier;
    } catch (error) {
        console.error("Error creating user-dossier assignment:", error);
        throw error;
    }
};


exports.findAll = async (req, res) => {
    if (auth.user.Role !== 'adminSite') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    try {
        const usersDossier = await UserDossier.findAll({ where: {} })
        if (usersDossier.length == 0) return res.status(404).send({ message: 'no Users exist' })
        return res.status(200).send(usersDossier);

    } catch (err) {
        console.error(err)
        res.status(500).send({ message: ' internal server error !' })
    }
}