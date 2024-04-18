import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import UpdateDossier from '../UpdateComponent/UpdateDossier';

function Dossier({ searchTerm }) {
  const [dossiers, setDossiers] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedDossier, setSelectedDossier] = useState(null); // Ajout de l'état pour le dossier sélectionné
  const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
  const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
  useEffect(() => {
    async function fetchData() {
      try {


        const resDossiers = await fetch('http://localhost:3000/api/dossier/findAll', {
          headers: {
            'authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
          }
        });

        if (!resDossiers.ok) {
          if (resDossiers.status === 404) {
            setDossiers([]);
          } else {
            throw new Error('Erreur lors de la récupération des dossiers');
          }
        } else {
          const jsonDossiers = await resDossiers.json();
          setDossiers(jsonDossiers);
        }
      } catch (error) {
        console.error('Erreur fetchData:', error);
      }
    }

    fetchData();
  }, []);

  const handleDeleteDossier = async (id) => {
    try {
      const resDossier = await fetch(`http://localhost:3000/api/dossier/delete/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
        }
      });

      if (!resDossier.ok) {
        throw new Error('Erreur lors de la suppression de dossiers');
      } else {
        toast.success('La suppression a été effectuée avec succès!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Erreur handleDeleteDossier:', error);
    }
  }

  const handleClose = () => setShow(false);
  const extractDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const filteredDossiers = dossiers.filter(dossier => {
    const raisonSocialeMatch = dossier.RaisonSociale.toLowerCase().includes(searchTerm.toLowerCase());
    const dateCreationMatch = extractDate(dossier.createdAt).includes(searchTerm);
    return raisonSocialeMatch || dateCreationMatch;
  });


  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Raison sociale</th>
            <th>Matricule fiscale</th>
            <th>Email</th>
            <th>Site Web</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Statut Licence</th> {/* Ajout de la colonne pour le statut de la licence */}
            <th>Crée le</th>
            <th colSpan={3}>Action</th>
          </tr>
        </thead>
        <tbody className='TabAff'>
          {filteredDossiers.length === 0 ? (
            <tr><td colSpan="9">Aucun Dossier disponible</td></tr>
          ) : (
            filteredDossiers.map((dossier, index) => {
              const sortedLicences = dossier.licence.sort((a, b) => new Date(b.DateFin) - new Date(a.DateFin)); // Tri des licences par date
              const latestLicence = sortedLicences[0]; // Récupération de la dernière licence
              return (
                <tr key={index}>
                  <td><input type="checkbox" name="" id="" /></td>
                  <td>{dossier.RaisonSociale}</td>
                  <td>{dossier.MatriculeFiscale}</td>
                  <td>{dossier.Email}</td>
                  <td>{dossier.SiteWeb}</td>
                  <td>{dossier.Telephone}</td>
                  <td>{dossier.Adresse}</td>
                  <td>{latestLicence ? latestLicence.statut : "N/A"}</td>
                  <td>{extractDate(dossier.createdAt)}</td>
                  <td className='btnEdit' onClick={() => { setShow(true); setSelectedDossier(dossier); }}>Edit</td>
                  <td className='btnView'><a href={`/dossier/${dossier.id}`}><FontAwesomeIcon icon={faEye} /></a></td>
                  <td className='btnsupp' onClick={() => handleDeleteDossier(dossier.id)}><FontAwesomeIcon icon={faTrashAlt} /></td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
      <UpdateDossier show={show} handleClose={handleClose} dossier={selectedDossier} />
    </>
  );

}

export default Dossier;
