
const UserDossier= require('../../Model/main').userDossier;


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
