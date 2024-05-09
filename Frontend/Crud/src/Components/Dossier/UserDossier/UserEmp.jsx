import React, { useState, useEffect } from 'react';
import '../../../Style/Dossier/userStyle.css'
import {
  CCard,
  CCardBody,
  CCardTitle,
  CCardSubtitle,
  CCardText,
  CCardLink,
  CButton,
  CBadge
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Assurez-vous d'importer FontAwesomeIcon
import {
  faPenToSquare,
  faTrashCan,
  faEye
} from '@fortawesome/free-solid-svg-icons';
import UpdateUserD from '../Update/UpdateUserD';
import { toast } from 'react-toastify';

function UserEmp() {

  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Ajout de l'état pour l'utilisateur sélectionné

  const currentPageUrl = window.location.pathname;
  const newUrl = currentPageUrl.replace('/utilisateurs', '');
  const [users, setUsers] = useState([]);
  const dossierString = localStorage.getItem('dossierId');
  const dossierId = JSON.parse(dossierString);
  const tokenString = localStorage.getItem('token');
  const token = JSON.parse(tokenString);

  useEffect(() => {
    async function fetchData() {
      try {
        const resUsers = await fetch(`http://localhost:5000/api/users/findAll/${dossierId}`, {
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
      } catch (error) {
        console.error('Erreur fetchData:', error);
      }
    }
    fetchData();
  }, [dossierId, token]);

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

  const getBadge = (Role) => {
    switch (Role) {
      case 'user':
        return 'primary'
      case 'adminDossier':
        return 'danger'
      default:
        return 'primary'
    }
  }

  return (
    <>
      <div>
        <a href={window.location.href + '/ajouterUtilisateur'}><CButton color="primary" className='btnAjout'>Ajouter un Utilisateur </CButton> </a>
      </div>
      <div className='gildLayout'>
        {users.map((user, index) => (
          <CCard key={index} style={{ width: '18rem' }}>
            <CCardBody>
              <CCardTitle>{user.nom} {user.prenom}</CCardTitle>
              <CCardSubtitle className="mb-2 text-body-secondary">{user.email}</CCardSubtitle>
              <CCardText>
                <CBadge color={getBadge(user.Role)}>{user.Role}</CBadge>
              </CCardText>
              <div className='btnSupMod'>
                <a href={newUrl + `/consulterutilisateur/${user.id}`}> <CButton color="dark" variant="outline"><FontAwesomeIcon icon={faEye} /></CButton></a>
                <CButton color="primary" variant="outline" className='edit' onClick={() => { setShow(true); setSelectedUser(user); }}><FontAwesomeIcon icon={faPenToSquare} style={{ color: "#5856d6", }} /></CButton>
                <CButton color="danger" variant="outline" className='supp' onClick={() => handleDeleteUser(user.id)}><FontAwesomeIcon icon={faTrashCan} style={{ color: "#f96767", }} /></CButton>
              </div>
            </CCardBody>
          </CCard>
        ))}
      </div>
      <UpdateUserD show={show} handleClose={handleClose} user={selectedUser} />
    </>
  );

}

export default UserEmp;
