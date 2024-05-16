import React, { useEffect, useState } from 'react'
import { CButton, CSpinner, CCallout, CNavTitle, CBadge } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Assurez-vous d'importer FontAwesomeIcon
import {
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'; // Don't forget to import toast if you're using it

function ConsulterFamilleClient() {
  const currentPageUrl = window.location.pathname;
  const newUrl = currentPageUrl.split('/consulterfamilleClient')[0] + '';
  const { id } = useParams()
  const [familleClient, setFamilleClient] = useState({}); // Correct assignment using useState
  const [isLoading, setIsLoading] = useState(true); // Declare isLoading state

  useEffect(() => {
    async function getFamille() {
      try {
        const res = await fetch(`http://localhost:5000/api/familleClient/getFamilleClient/${id}`, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });

        if (!res.ok) {
          throw new Error('Erreur lors de la récupération des familles clients');
        }

        const jsonRes = await res.json();
        setFamilleClient(jsonRes);
        setIsLoading(false); // Set isLoading to false when data is fetched
      } catch (error) {
        console.error('Erreur get famille client:', error);
        toast.error('Erreur lors du chargement des données');
      }
    }
    getFamille();
  }, [id]);

  const extractDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  console.log(familleClient);

  // Render loading state if data is still loading
  if (isLoading) {
    return <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <CSpinner color="primary" />
      <p>Chargement en cours...</p>
    </div>
  }
  const getBadge = (status) => {
    switch (status) {
      case 'Actif':
        return 'success'
      case 'Suspendu':
        return 'warning'
      case 'Retarité':
        return 'secondary'
      case 'Inactif':
        return 'danger'
      default:
        return 'primary'
    }
  }
  // Render fetched data
  return (
    <div>
      <div className='Revenir'>
        <a href={newUrl}><FontAwesomeIcon icon={faArrowLeft} size="xl" style={{ color: "#5856d6", }} /> Famille Clients </a>
      </div>
      <br />
      <h2>Famille Client Détails</h2>
      <div>
        <CCallout color="success" className='viewmodel'>
          <CNavTitle>Code Famille Client  {familleClient.CodeFamilleClient}</CNavTitle>
          <CNavTitle>Libélle {familleClient.Libelle}</CNavTitle>
          <CNavTitle>Création le  {extractDate(familleClient.createdAt)}</CNavTitle>

        </CCallout>
      </div>
      <div className='details'>
        <div>
          <CCallout color="primary" className='viewmodel' style={{ width: '380px', height: '200px' }}>
            <CNavTitle className='title'>Type Tarif </CNavTitle>
            <br />
            <CNavTitle >Libelle Type Tarif   : {familleClient.typeTarif.libelle} </CNavTitle>
            <CNavTitle >Type Prix : {familleClient.typeTarif.type}</CNavTitle>


          </CCallout>
        </div>
        <div>
          <CCallout color="dark" className='viewmodel' style={{ width: '380px', height: '200px' }}>
            <CNavTitle className='title'>Mode Réglement</CNavTitle>
            <br />
            <CNavTitle >Libelle Mode Réglement   : {familleClient.modeReglement.libelle} </CNavTitle>
            <CNavTitle >Type Paiment : {familleClient.modeReglement.TypePaiment}</CNavTitle>
            <CNavTitle >Mode Paiment : {familleClient.modeReglement.modePaiment}</CNavTitle>
            <CNavTitle >Pourcentage : {familleClient.modeReglement.pourcentage}</CNavTitle>


          </CCallout></div>
        <div><CCallout color="warning" className='viewmodel' style={{ width: '380px', height: '200px' }}>
          <CNavTitle className='title'>Vendeur </CNavTitle>
          <br />
          <CNavTitle>Nom de vendeur : {familleClient.vendeur.Nom}</CNavTitle>
          <CNavTitle>Email de vendeur : {familleClient.vendeur.Email}</CNavTitle>
          <CNavTitle>Telephone de vendeur : {familleClient.vendeur.Telephone}</CNavTitle>
          <CNavTitle>Status de vendeur : <CBadge color={getBadge(familleClient.vendeur.status)}> {familleClient.vendeur.status}</CBadge>
          </CNavTitle>


        </CCallout>
        </div>
      </div>
    </div>
  );
}

export default ConsulterFamilleClient;
