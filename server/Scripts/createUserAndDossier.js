const db = require('../Model/main');
const Dossier= db.Dossier
const User= db.User

const userInfo = {
    login: "SouhirAyari@gmail.com",
    password: "3112",
    Role: "user",
};

const dossierInfo = {
    RaisonSociale: "mbm",
    Adresse: "tunis",
    CodePostal: "2000",
    Ville: "tunis",
    Telephone: 397855578,
    Mobile: 658758,
    Email: "mbm@gmail.com",
    SiteWeb: "https://isa2m.rnu.tn/",
    MatriculeFiscale: "6123543"
};

async function createUserAndDossier() {
    try {
        // Créez l'utilisateur et le dossier
        const user = await User.create(userInfo);
        const dossier = await Dossier.create(dossierInfo);

        // Associez le dossier à l'utilisateur
        await user.addDossier(dossier);

        console.log("Utilisateur créé avec succès avec le dossier associé.");
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur avec le dossier associé :", error);
    }
}

// Appelez la fonction pour l'exécuter
createUserAndDossier();
