import React, { useEffect, useState } from 'react'
import { CCallout, CNavItem, CNavTitle, CSpinner } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Assurez-vous d'importer FontAwesomeIcon
import {
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom'



function ConsulterClient() {
  const currentPageUrl = window.location.pathname;
  const newUrl = currentPageUrl.split('/consulterclient')[0] + '';
  const { id } = useParams();
  const [client, setClient] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
  const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`http://localhost:5000/api/client/getClientById/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
          }
        });

        if (!response.ok) {
          return console.log("erreur fetching client");

        }

        const jsonclient = await response.json();
        setClient(jsonclient);
        setIsLoading(false)

      } catch (err) {
        console.error("erreur dans get data client", err);
      }
    }

    getData();
  }, [id]); // Ajoutez UserId en tant que dépendance pour recharger les données lorsque l'ID du User change

  const extractDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return (
    <div className=''>
      <div className='Revenir'>
        <a href={newUrl}><FontAwesomeIcon icon={faArrowLeft} size="xl" style={{ color: "#5856d6", }} /> Clients </a>
      </div>
      <br />
      {isLoading ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <CSpinner color="primary" />
          <p>Chargement en cours...</p>
        </div>
      ) :

        (<>
          <div>
            <h2>Client Détails</h2>
          </div>
          <div className='clloutflex'>
            <CCallout color="primary" className='viewmodel' style={{ width: '500px' }} >
              <CNavTitle><h4>Information </h4></CNavTitle>

              <CNavItem>Nom<CNavTitle>{client.Nom}</CNavTitle></CNavItem>
              <CNavItem>Email <CNavTitle>{client.Email}</CNavTitle></CNavItem>
              <CNavItem>Login <CNavTitle>{client.Login}</CNavTitle></CNavItem>
              <CNavItem>Famille Client<CNavTitle>{client.familleClient.Libelle}</CNavTitle></CNavItem>
              <CNavItem>civilité <CNavTitle>{client.Civilite}</CNavTitle></CNavItem>
              <br />
              <CNavItem>Pays <CNavTitle>{client.pays}</CNavTitle></CNavItem>
              <CNavItem>Adresse <CNavTitle>{client.adresse}</CNavTitle></CNavItem>
              <CNavItem>ville <CNavTitle>{client.ville}</CNavTitle></CNavItem>
              <CNavItem>Telephone <CNavTitle>{client.telephone}</CNavTitle></CNavItem>
              <br />

              <CNavItem>Crée le<CNavTitle>{extractDate(client.createdAt)}</CNavTitle></CNavItem>

            </CCallout>
            {!client.modeReglement ? (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <CSpinner color="primary" />
                <p>Chargement en cours...</p>
              </div>
            ) : (
              <CCallout color="success" className='viewmodel' style={{ width: '500px' }}>
                <CNavTitle><h4>Mode Réglement </h4></CNavTitle>
                <CNavItem>Libelle <CNavTitle>{client.modeReglement.libelle}</CNavTitle></CNavItem>
                <CNavItem>Type Paiment <CNavTitle>{client.modeReglement.TypePaiment}</CNavTitle></CNavItem>
                <CNavItem>Mode Paiment <CNavTitle>{client.modeReglement.modePaiment}</CNavTitle></CNavItem>
                <br />
                <CNavTitle><h4>Type Tarif </h4></CNavTitle>
                <CNavItem>Libelle <CNavTitle>{client.typeTarif.libelle}</CNavTitle></CNavItem>
                <CNavItem>Type Paiment <CNavTitle>{client.typeTarif.type}</CNavTitle></CNavItem>
              </CCallout>
            )}
            {!client.vendeur ? (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <CSpinner color="primary" />
                <p>Chargement en cours...</p>
              </div>
            ) : (
              <CCallout color="secondary" className='viewmodel' style={{ width: '500px' }}>
                <CNavTitle><h4>Vendeur </h4></CNavTitle>
                <CNavItem>Nom <CNavTitle>{client.vendeur.Nom}</CNavTitle></CNavItem>
                <CNavItem>Email <CNavTitle>{client.vendeur.Email}</CNavTitle></CNavItem>
                <CNavItem>telephone <CNavTitle>{client.vendeur.Telephone}</CNavTitle></CNavItem>
                <CNavItem>status <CNavTitle>{client.vendeur.status}</CNavTitle></CNavItem>
                <br />
              </CCallout>
            )}
          </div>
        </>
        )}






    </div>

  )
}

export default ConsulterClient