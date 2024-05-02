const { User, Dossier } = require('../../Model/main');
const { Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserDossier = require('../../Model/main').userDossier;


exports.VerifyUser = async (req, res) => {
    try {
        const { activationCode } = req.body;
        const user = await User.findOne({
            where: Sequelize.literal(`BINARY activationCode = '${activationCode}'`)
        });
        if (!user) return res.status(404).json({ success: false, error: "User not found" });

        // Mettre à jour l'attribut IsActive
        user.IsActive = true;

        // Sauvegarder les modifications dans la base de données
        await user.save();

        return res.status(200).json({ success: true, message: "User activated successfully" });

    } catch (err) {
        console.error("Error verifyUser:", err);
        res.status(500).json({ success: false, message: "Internal server error!" });
    }
};


// authMiddleware.js
exports.authMiddleware = async (req, res, next) => {
    // Récupérer le jeton JWT à partir des en-têtes de la requête
    const token = req.headers.authorization;
    if (!token) {
        // Si aucun jeton n'est fourni, renvoyer une réponse non autorisée
        return res.status(401).json({ message: 'No token provided' });
    } else {
        const jwtToken = token.split(" ")[1];
        // Vérifier et décoder le jeton JWT
        jwt.verify(jwtToken, 'user', (err, decoded) => {
            if (err) {
                // En cas d'erreur lors de la vérification du jeton, renvoyer une réponse non autorisée
                return res.status(401).json({ message: 'Failed to authenticate token' });
            }
            // Si le jeton est valide, ajouter les informations de l'utilisateur décrypté à l'objet de requête
            auth = decoded
            next();
        });
    }
};


exports.SignIn = async (req, res) => {
    try {
        const { login, password } = req.body;

        const user = await User.findOne({
            where: Sequelize.literal(`BINARY login = '${login}'`)
        });

        if (!user) return res.status(404).json({ success: false, error: "User not found" });

        const passwordisValid = bcrypt.compareSync(password, user.password)
        if (!passwordisValid) {
            return res.status(401).json({ success: false, error: 'Invalid password' });
        }

        if (user && passwordisValid && !user.IsActive) {
            res.status(500).send({ message: 'verifier le confimation' })
        }

        let redirectPath = '';
        let dossierId = null; // Initialiser dossierId

        switch (user.Role) {
            case 'adminSite':
                redirectPath = '/';
                break;
            case 'user':
                dossierId = user.dossierId; // Affecter dossierId pour l'utilisateur
                redirectPath = '/user';
                break;
            case 'adminDossier':
                const userDossier = await UserDossier.findOne({ where: { UtilisateurId: user.id } });
                console.log(userDossier)
                dossierId = userDossier.DossierId ? userDossier.DossierId : null; // Affecter dossierId pour l'admin de dossier s'il existe
                const dossier = await Dossier.findOne({ where: { id: dossierId } });
                redirectPath = dossier ? `/dossier${dossier.RaisonSociale}/accueil` : '/erreur'; // Correction de la construction de redirectPath
                break;
            default:
                return res.status(401).json({ success: false, error: 'Invalid Role' });
        }
       
        const usertoken = {
            id :user.id,
            login,
            Role: user.Role,
            dossierId: dossierId // Utiliser le dossierId déterminé ci-dessus
        }

        const token = jwt.sign({ user: usertoken }, 'user', { expiresIn: '24h' });
        console.log('token sign in ', token)
        res.status(200).json({
            success: true,
            redirectPath,
            token,
            user: usertoken

        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error!' });
    }
};

