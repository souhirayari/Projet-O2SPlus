import React, { useEffect, useState } from 'react'
import { CCallout, CNavItem, CNavTitle } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Assurez-vous d'importer FontAwesomeIcon
import {
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom'



function View() {
  const currentPageUrl = window.location.pathname;
  const newUrl = currentPageUrl.split('/consulterutilisateur')[0] + '/utilisateurs';
  console.log(newUrl)
  const { userId } = useParams();
  const [User, setUser] = useState({});

  const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
  const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
  useEffect(() => {
    async function getData() {
      try {
        const resUser = await fetch(`http://localhost:5000/api/users/findOneUser/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
          }
        });

        if (!resUser.ok) {
          return console.log("erreur fetching data");

        }

        const jsonUser = await resUser.json();
        setUser(jsonUser.user);

      } catch (err) {
        console.error("erreur dans getData DashBordView", err);
      }
    }

    getData();
  }, [userId]); // Ajoutez UserId en tant que dépendance pour recharger les données lorsque l'ID du User change

  const extractDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  console.log(User)
  return (
    <div className=''>
      <div className='Revenir'>
        <a href={newUrl}><FontAwesomeIcon icon={faArrowLeft} size="xl" style={{ color: "#5856d6", }} /> Utilisateurs </a>
      </div>
      <br />
      <div>
        <h2>{User.prenom + ' ' + User.nom}</h2>
        <span>Role  {User.Role} </span> </div>
      <div className='clloutflex'>
        <CCallout color="primary" className='viewmodel' style={{ width: '600px' }}>
          <CNavTitle><h4>Information </h4></CNavTitle>

          <CNavItem>Date Naissance <CNavTitle>{User.dateNaissance}</CNavTitle></CNavItem>
          <CNavItem>Genre <CNavTitle>{User.genre}</CNavTitle></CNavItem>
          <CNavItem>login <CNavTitle>{User.login}</CNavTitle></CNavItem>


        </CCallout>
        <CCallout color="success" className='viewmodel' style={{ width: '700px' }}>
          <CNavTitle><h4>Adresse </h4></CNavTitle>
          <CNavItem>Pays <CNavTitle>{User.pays}</CNavTitle></CNavItem>
          <CNavItem>Adresse <CNavTitle>{User.adresse}</CNavTitle></CNavItem>
          <CNavItem>Ville <CNavTitle>{User.ville}</CNavTitle></CNavItem>
          <CNavItem>Code Postal <CNavTitle>{User.codePostal}</CNavTitle></CNavItem>


        </CCallout>
      </div>
      <CCallout color="secondary" className='viewmodel'>
        <CNavTitle><h4>Professionnlle </h4></CNavTitle>

        <CNavItem>Email <CNavTitle>{User.email}</CNavTitle></CNavItem>
        <CNavItem>statut <CNavTitle>{User.statut}</CNavTitle></CNavItem>
        <CNavItem>emploi <CNavTitle>{User.emploi}</CNavTitle></CNavItem>
        <CNavItem>Embauché le <CNavTitle>{extractDate(User.createdAt)}</CNavTitle></CNavItem>
        <br />
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
        euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
        veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
        commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
        molestie consequat, vel illum dolore eu feugiat
      </CCallout>






    </div>
  )
}

export default View