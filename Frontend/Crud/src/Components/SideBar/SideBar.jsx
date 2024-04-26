import React, { useState, useEffect } from 'react';
import '../../Style/Sidebar.css'; // Assurez-vous de créer un fichier CSS pour styliser votre barre latérale
import logo from '../../assets/logo.png'; // Assurez-vous d'importer votre logo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Assurez-vous d'importer FontAwesomeIcon
import { faCaretDown, faCompass, faUser, faGear,faRightToBracket } from '@fortawesome/free-solid-svg-icons'; // Importer les icônes de la bibliothèque FontAwesome

const Sidebar = () => {
    const [dossiers, setDossiers] = useState([]);
    const [users, setUsers] = useState([]);
    const [licences, setLicences] = useState([]);
    const [showDossiers, setShowDossiers] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [showLicences, setShowLicences] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
            const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
            try {
                const resDossiers = await fetch('http://localhost:5000/api/dossier/findAll',{
                    headers: {
                        'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
                    }
                });
                const resUsers = await fetch('http://localhost:5000/api/users/findAll',{
                    headers: {
                        'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
                    }
                });
                const resLicences = await fetch('http://localhost:5000/api/licence/findAll' ,{
                    headers: {
                        'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
                    }
                });

                // Vérifier le statut de la réponse
                if (!resDossiers.ok) {
                    if (resDossiers.status === 404) {
                        setDossiers([]); // Aucun dossier trouvé, initialiser à un tableau vide
                    } else {
                        throw new Error('Erreur lors de la récupération des dossiers');
                    }
                } else {
                    const jsonDossiers = await resDossiers.json();
                    setDossiers(jsonDossiers);
                }

                if (!resUsers.ok) {
                    if (resUsers.status === 404) {
                        setUsers([]); // Aucun utilisateur trouvé, initialiser à un tableau vide
                    } else {
                        throw new Error('Erreur lors de la récupération des utilisateurs');
                    }
                } else {
                    const jsonUsers = await resUsers.json();
                    setUsers(jsonUsers);
                }

                if (!resLicences.ok) {
                    if (resLicences.status === 404) {
                        setLicences([]); // Aucune licence trouvée, initialiser à un tableau vide
                    } else {
                        throw new Error('Erreur lors de la récupération des licences');
                    }
                } else {
                    const jsonLicences = await resLicences.json();
                    setLicences(jsonLicences);
                }
            } catch (error) {
                console.error('Erreur fetchData:', error);
            }
        }

        fetchData();
    }, []);

    const handleDossiersClick = () => {
        setShowDossiers(!showDossiers);
        setShowUsers(false);
        setShowLicences(false);
    };

    const handleUsersClick = () => {
        setShowUsers(!showUsers);
        setShowDossiers(false);
        setShowLicences(false);
    };

    const handleLicencesClick = () => {
        setShowLicences(!showLicences);
        setShowDossiers(false);
        setShowUsers(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setTimeout(() => {
            window.location.href = '/SignIn';
        }, 1000);
        
        // Rediriger l'utilisateur vers la page de connexion ou une autre page appropriée après la déconnexion
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <img src={logo} alt="Logo" className="logo" />
                <h3 className='tableBord'> <FontAwesomeIcon icon={faCompass} /> Tableau de Bord</h3>
            </div>
            <ul className='ulLink'>
                <li>
                    <div className='linkicon'>
                        <a href="/">
                            Gestionnaire des Dossiers
                        </a>
                        <FontAwesomeIcon icon={faCaretDown} onClick={handleDossiersClick} />
                    </div>
                    {showDossiers && (
                        <ul className={`dropdown ${dossiers.length > 3 ? 'scrollable' : ''}`}>
                            {dossiers.length === 0 ? (
                                <li>Aucun Dossier disponible</li>
                            ) : (
                                dossiers.map((dossier, index) => (
                                    <li className='dropDownli' key={index}><a href={`/dossier/${dossier.id}`} className='dropDownA' >Dossier {dossier.RaisonSociale}</a></li>
                                ))
                            )}
                        </ul>
                    )}
                </li>
                <li>
                    <div className='linkicon'>
                        <a href="/Utilisateurs">
                            Gestionnaire des Utilisateurs
                        </a>
                        <FontAwesomeIcon icon={faCaretDown} onClick={handleUsersClick} />
                    </div>
                    {showUsers && (
                        <ul className={`dropdown ${users.length > 3 ? 'scrollable' : ''}`}>
                            {users.length === 0 ? (
                                <li>Aucun Utilisateur disponible</li>
                            ) : (
                                users.map((user, index) => (
                                    <li className='dropDownli' key={index}><a href={`/utilisateur/${user.id}`} className='dropDownA' >Utilisateur {user.nom}</a></li>
                                ))
                            )}
                        </ul>
                    )}
                </li>
                <li>
                    <div className='linkicon'>
                        <a href="/Licences">
                            Gestionnaire des Licences
                        </a>
                        <FontAwesomeIcon icon={faCaretDown} onClick={handleLicencesClick} />
                    </div>
                    {showLicences && (
                        <ul className={`dropdown ${licences.length > 3 ? 'scrollable' : ''}`}>
                            {licences.length === 0 ? (
                                <li>Aucune licence disponible</li>
                            ) : (
                                licences.map((licence, index) => (
                                    <li className='dropDownli' key={index}><a href={`/licence/${licence.idLicence}`} className='dropDownA' >Licence {licence.Dossier.RaisonSociale}</a></li>
                                ))
                            )}
                        </ul>
                    )}
                </li>
            </ul>
            <div className="sidebar-footer">
                <ul className='ulFooter'>
                    <li><a href="/Profile"><FontAwesomeIcon icon={faUser} /> Profile</a></li>
                    <li><a href=""><FontAwesomeIcon icon={faGear} /> Parametere</a></li>
                </ul>
                <div className='btnDecon'>
                    <div onClick={handleLogout} > <FontAwesomeIcon icon={faRightToBracket} />  Déconnexion</div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
