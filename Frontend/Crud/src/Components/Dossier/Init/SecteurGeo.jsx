import React, { useEffect, useState } from 'react';
import { CButton } from '@coreui/react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Pagination from 'react-bootstrap/Pagination'; // Import de la pagination
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import UpdateSecteur from '../Update/UpdateSecteur';


function SecteurGeo() {
  const [secteurs, setSecteur] = useState([]);
  const dossierId = localStorage.getItem('dossierId');
  const tokenString = localStorage.getItem('token');
  const token = JSON.parse(tokenString);
  const [show, setShow] = useState(false);
  const [selectedSecteur, setSelectedSecteur] = useState(null); // Ajout de l'état pour l'utilisateur sélectionné
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // État pour suivre la page actuelle
  const itemsPerPage = 7; // Nombre d'éléments par page

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:5000/api/secteurGeo/getAllSecteurGeoByDossier/${dossierId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) {
          if (res.status === 404) {
            setSecteur([]);
          } else {
            throw new Error('Erreur lors de la récupération des Secteur');
          }
        } else {
          const jsonres = await res.json();
          setSecteur(jsonres);
        }
      } catch (error) {
        console.error('Erreur fetchData: Secteur', error);
      }
    }
    fetchData();
  }, [dossierId, token]);

  const handleDeleteSecteur = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/secteurGeo/deleteSecteurGeo/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error('Erreur lors de la suppression du secteur ');
      } else {
        toast.success('La suppression a été effectuée avec succès!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Erreur handleDeleteSecteur geo:', error);
      toast.error('Erreur lors de la suppression du Secteur Geo ');

    }
  };

  const extractDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredSecteur = secteurs.filter(secteur => {
    const libelleMatch = secteur.Libelle.toLowerCase().includes(searchTerm.toLowerCase());
    const creematch = extractDate(secteur.createdAt).includes(searchTerm);
    return libelleMatch || creematch;
  });
  const currentItems = filteredSecteur.slice(startIndex, endIndex);

  const handleClose = () => setShow(false);

  return (
    <>
      <div>
        <div>
          <a href={window.location.href + '/ajoutersecteur'}>
            <CButton color="primary" className='btnAjout'>Ajouter une Secteur Géographique</CButton>
          </a>
        </div>
        <InputGroup className="mb-3" style={{ width: '50%' }}>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#5856d6" }} />
          </InputGroup.Text>
          <Form.Control
            placeholder="Rechercher..."
            aria-label="Search"
            aria-describedby="basic-addon1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <br />
        <Table responsive>
          <thead style={{ textAlign: 'center' }}>
            <tr>
              <th>#</th>
              <th>Libélle</th>
              <th>Crée le</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody className='TabAff'>

            {currentItems.length === 0 ?
              (<tr>
                <td colSpan="10">Aucun item trouvé</td>
              </tr>)
              : (currentItems.map((secteur, index) => (
                <tr key={index}>
                  <td><input type="checkbox" name="" id="" /></td>
                  <td>{secteur.Libelle}</td>
                  <td>{extractDate(secteur.createdAt)}</td>
                  <td className='btnEdit' onClick={() => { setShow(true); setSelectedSecteur(secteur); }}>
                    <CButton color="primary" variant="outline" className='edit'>
                      <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#5856d6" }} />
                    </CButton>
                  </td>
                  <td className='btnsupp' onClick={() => handleDeleteSecteur(secteur.id)}>
                    <CButton color="danger" variant="outline" className='supp'>
                      <FontAwesomeIcon icon={faTrashCan} style={{ color: "#f96767" }} />
                    </CButton>
                  </td>
                </tr>
              )))}
          </tbody>
        </Table>
        {/* Pagination */}
        <Pagination>
          {Array.from({ length: Math.ceil(secteurs.length / itemsPerPage) }).map((_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      <UpdateSecteur show={show} handleClose={handleClose} secteur={selectedSecteur} />
    </>
  )
}

export default SecteurGeo
