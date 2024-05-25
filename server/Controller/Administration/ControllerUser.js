const User = require('../../Model/main').User;
const jwt = require('jsonwebtoken');
const { findbyId } = require('../Administration/ControllerDossier');
const Dossier = require('../../Model/main').Dossier;
const UserDossier = require('../../Model/main').userDossier
const { Sequelize } = require('sequelize');
const { sendConfirmationEmail } = require('../../MailConfig/NodeMailer');
const bcrypt = require('bcrypt');


exports.AddUserinfo = async (req, res) => {
    console.log(auth)
    try {
        if (auth.user.Role !== 'adminSite' && auth.user.Role !== 'adminDossier') {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        const { login, password, Role, dossierId, nom, prenom, genre, dateNaissance, email, emploi, adresse, ville, codePostal, pays, statut, codeUser, avatar } = req.body;
        const characters = "0123456789AZERTYUIOPMLKJHGFDSQWXCVBNazertyuiopmlkjhgfdsqwxcvbn";
        let activationCode = "";
        for (let i = 0; i < 25; i++) {
            activationCode += characters[Math.floor(Math.random() * characters.length)];
        }
        const passwordBcrypt = bcrypt.hashSync(password, 8);

        // Créer un nouvel utilisateur avec les données fournies
        const newUser = {
            login,
            password: passwordBcrypt,
            Role,
            nom,
            prenom,
            genre,
            dateNaissance,
            email,
            emploi,
            adresse,
            ville,
            codePostal,
            pays,
            statut,
            codeUser,
            avatar,
            activationCode
        };

        // Vérifier si les champs requis sont fournis
        if (!login || !password || !Role || !email) {
            return res.status(400).send({ message: 'Set login, password, and role and email.' });
        }

        // Vérifier si l'utilisateur existe déjà avec le même login
        const existingUser = await User.findOne({ where: { login: login } });
        if (existingUser) {
            return res.status(400).send({ message: 'User with this login already exists.' });
        }

        // Utilisation d'un switch pour gérer les différents cas en fonction du rôle de l'utilisateur
        switch (Role) {
            case 'adminSite':
                // Créer un nouvel utilisateur adminSite
                await User.create(newUser);
                res.status(200).send({ message: 'AdminSite created successfully.' });
                break;

            case 'adminDossier':
            case 'user':
                // Vérifier si un dossier est sélectionné pour le rôle adminDossier ou user
                if (!dossierId) {
                    return res.status(400).send({ message: 'Set dossierId.' });
                }
                // Rechercher le dossier par son ID
                const dossier = await findbyId(dossierId);
                if (!dossier) {
                    return res.status(404).send({ message: 'Dossier not found' });
                }
                // Créer un nouvel utilisateur avec le rôle user ou adminDossier
                const newUserInstance = await User.create({ ...newUser, dossierId: dossierId });
                if (Role === 'adminDossier') {
                    await newUserInstance.addDossier(dossier);
                }
                res.status(200).send({ message: Role === 'user' ? 'Your user has been created.' : 'Your AdminDossier has been created.' });
                break;

            default:
                return res.status(400).send({ message: 'Invalid role specified.' });
        }

        // Envoyer un email de confirmation
        sendConfirmationEmail(newUser.nom, newUser.login, newUser.email, newUser.activationCode, password);

    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).send({ message: "Internal server error!" });
    }
}


exports.findAll = async (req, res) => {
    console.log(auth)
    if (auth.user.Role !== 'adminSite') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    try {
        const users = await User.findAll({ where: {} })
        if (users.length == 0) return res.status(404).send({ message: 'no Users exist' })
        return res.status(200).send(users);

    } catch (err) {
        console.error(err)
        res.status(500).send({ message: ' internal server error !' })
    }
}

exports.findByIdUser = async (req, res) => {

    try {
        const id = req.params.id;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const tokenPayload = {
            id: user.id,
            login: user.login,
            Role: user.Role
        };
        const token = jwt.sign(tokenPayload, 'user', { expiresIn: '24h' });
        res.status(200).json({ success: true, token });

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error!' });
    }
}



exports.findOneUser = async (req, res) => {
    if (auth.user.Role !== 'adminSite' && auth.user.Role !== 'adminDossier' && auth.user.Role !== 'user') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    try {
        const id = req.params.id;
        const user = await User.findOne({
            where: { id: id },
            include: [{ model: Dossier }]
        });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send({ success: true, user });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error!' });
    }
}
exports.DeleteUser = async (req, res) => {
    if (auth.user.Role !== 'adminSite' && auth.user.Role !== 'adminDossier') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    try {
        const id = req.params.id;

        await User.destroy({ where: { id: id } });

        res.status(200).json({ success: true, message: 'user supprimé avec succès' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
};



exports.updateUser = async (req, res) => {

    if (auth.user.Role !== 'adminSite' && auth.user.Role !== 'adminDossier') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    try {
        const id = req.params.id;
        const user = await User.findOne({ where: { id: id } });

        if (!user) {
            return res.status(404).json({ success: false, message: "User non trouvé" });
        }

        await User.update(req.body, { where: { id: id } });

        res.status(200).json({ success: true, message: "User mis à jour avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error!" });
    }
};

exports.findAllByDossier = async (req, res) => {
    console.log(auth)
    if (auth.user.Role !== 'adminSite' && auth.user.Role !== 'adminDossier') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    try {
        const { dossierId } = req.params;
        const usersDossier = await UserDossier.findAll({ where: { DossierId: dossierId } });

        // Récupérez les informations de chaque utilisateur de UserDossier
        const infoUser = await Promise.all(usersDossier.map(async (user) => {
            const userInfo = await User.findOne({ where: { id: user.UtilisateurId } });
            return userInfo;
        }));

        const users = await User.findAll({ where: { dossierId: dossierId } });

        // Vérifiez si les utilisateurs existent dans le dossier
        if (users.length === 0 && infoUser.length === 0) {
            return res.status(404).send({ message: `No users exist in dossier ${dossierId}` });
        }

        // Combinez les utilisateurs des deux tables dans un seul tableau
        const allUsers = [...users, ...infoUser];

        return res.status(200).send(allUsers);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error!' });
    }
};
