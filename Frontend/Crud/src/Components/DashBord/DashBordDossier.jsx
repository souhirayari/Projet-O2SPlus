import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBarView from '../NavBar/NavBarView';
import DossierView from '../View/DossierView';

function DashBordDossier() {
  const { dossierId } = useParams();
  const [dossier, setDossier] = useState({}); // Initialisez dossier à null pour indiquer qu'aucune donnée n'a encore été chargée

  useEffect(() => {
    async function getData() {
      try {
        const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
        const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
        const resDossier = await fetch(`http://localhost:3000/api/dossier/findOne/${dossierId}`,{
          headers: {
              'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
          }
      });

        if (!resDossier.ok) {
          return console.log("erreur fetching data");

        }

        const jsonDossier = await resDossier.json();
        setDossier(jsonDossier.dossier);

      } catch (err) {
        console.error("erreur dans getData DashBordView", err);
      }
    }

    getData();
  }, [dossierId]); // Ajoutez dossierId en tant que dépendance pour recharger les données lorsque l'ID du dossier changes

  return (
    <div className='box'>
      <NavBarView title={dossier.RaisonSociale} />
      <DossierView dossier={dossier} />
    </div>
  );
}

export default DashBordDossier;
