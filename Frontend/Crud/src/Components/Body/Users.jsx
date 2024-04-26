import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import UpdateUser from '../UpdateComponent/UpdateUser';

function Users({ searchTerm }) {
    const [users, setUsers] = useState([]);
    const [Dossiers, setDossiers] = useState([]);

    const [show, setShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // Ajout de l'état pour l'utilisateur sélectionné

    const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
    const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets

    useEffect(() => {
        async function fetchData() {

            try {
                const resUsers = await fetch('http://localhost:5000/api/users/findAll', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
                    }
                });


                if (!resUsers.ok) {
                    if (resUsers.status === 404) {
                        setUsers([]);
                    } else {
                        throw new Error('Erreur lors de la récupération des utilisateurs');
                    }
                } else {
                    const jsonUsers = await resUsers.json();
                    setUsers(jsonUsers);
                }

                const resDossier = await fetch('http://localhost:5000/api/dossier/findAll', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
                    }
                });
                if (!resDossier.ok) {
                    if (resDossier.status === 404) {
                        setDossiers([]);
                    } else {
                        throw new Error('Erreur lors de la récupération des utilisateurs');
                    }
                } else {
                    const jsonDossiers = await resDossier.json();
                    setDossiers(jsonDossiers);
                }

            } catch (error) {
                console.error('Erreur fetchData:', error);
            }
        }

        fetchData();
    }, [show]);

    const handleDeleteUser = async (id) => {
        try {
            const resUser = await fetch(`http://localhost:5000/api/users/delete/${id}`, {
                method: "DELETE",

                headers: {
                    'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
                }

            });

            if (!resUser.ok) {
                throw new Error('Erreur lors de la suppression de l\'utilisateur');
            } else {
                toast.success('La suppression a été effectuée avec succès!');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            console.error('Erreur handleDeleteUser:', error);
        }
    };
    const handleClose = () => setShow(false);

    const extractDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };


    const filteredUser = users.filter(user => {
        const EmailMatch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const DateMatch = extractDate(user.createdAt).includes(searchTerm);
        const RoleMatch = user.Role.toLowerCase().includes(searchTerm.toLowerCase());
        const StatutMatch = user.statut.toLowerCase().includes(searchTerm.toLowerCase());
        const EmploiMatch = user.emploi.toLowerCase().includes(searchTerm.toLowerCase());
        const NomMatch = user.nom.toLowerCase().includes(searchTerm.toLowerCase());



        return EmailMatch || DateMatch || RoleMatch || StatutMatch || EmploiMatch || NomMatch;
    });
    return (
        <>
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Emploi</th>
                        <th>Adresse</th>
                        <th>Statut</th>
                        <th>Role</th>
                        <th>Dossier</th>
                        <th>Crée le</th>
                        <th colSpan={3}>Action</th>
                    </tr>
                </thead>
                <tbody className='TabAff'>
                    {filteredUser.length === 0 ? (
                        <tr>
                            <td colSpan="10">Aucun Utilisateur disponible</td>
                        </tr>
                    ) : (
                        filteredUser.map((user, index) => (
                            <tr key={index}>
                                <td><input type="checkbox" name="" id="" /></td>
                                <td>{user.nom + ' ' + user.prenom}</td>
                                <td>{user.email}</td>
                                <td>{user.emploi}</td>
                                <td>{user.adresse}</td>
                                <td>{user.statut}</td>
                                <td>{user.Role}</td>
                                <td>
                                    {Dossiers.find(dossier => dossier.id === user.dossierId)?.RaisonSociale || 'N/A'}
                                </td>

                                <td>{extractDate(user.createdAt)}</td>
                                <td className='btnEdit' onClick={() => { setShow(true); setSelectedUser(user); }}>Edit</td>
                                <td className='btnView'><a href={`/utilisateur/${user.id}`}><FontAwesomeIcon icon={faEye} /></a></td>
                                <td className='btnsupp' onClick={() => handleDeleteUser(user.id)}><FontAwesomeIcon icon={faTrashAlt} /></td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
            <UpdateUser show={show} handleClose={handleClose} user={selectedUser} />
        </>
    );
}

export default Users;
