import React, { useEffect, useState } from 'react';
import { CButton, CSpinner } from '@coreui/react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Pagination from 'react-bootstrap/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare, faMagnifyingGlass, faEye } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import UpdateFamilleClient from '../Update/UpdateFamilleClient';

function FamClient() {
  const [isLoading, setIsLoading] = useState(true);
  const [familleClient, setFamilleClient] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedFamille, setSelectedFamille] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:5000/api/familleClient/getFamilleClientByDossier/${localStorage.getItem('dossierId')}`, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });

        if (!res.ok) {
          throw new Error('Erreur lors de la récupération des familles clients');
        }

        const jsonRes = await res.json();
        setFamilleClient(jsonRes);
        setIsLoading(false);
        setTimeout(() => {
        }, 1000);
      } catch (error) {
        console.error('Erreur fetchData:', error);
        toast.error('Erreur lors du chargement des données');
      }
    }
    fetchData();
  }, []);

  const handleDeleteFamilleClient = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/familleclient/deleteFamilleClient/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });

      if (!res.ok) {
        throw new Error('Erreur lors de la suppression du famille client');
      }

      toast.success('La suppression a été effectuée avec succès!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Erreur handleDeleteFamilleClient:', error);
      toast.error('Erreur lors de la suppression du famille client');
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
  const filteredMode = familleClient.filter(famille => {
    const libelleMatch = famille.Libelle.toLowerCase().includes(searchTerm.toLowerCase());
    const creematch = extractDate(famille.createdAt).includes(searchTerm);
    const tarifmatch = famille.typeTarif.libelle.toLowerCase().includes(searchTerm.toLowerCase());
    const modematch = famille.modeReglement.libelle.toLowerCase().includes(searchTerm.toLowerCase());
    const vendeurmatech = famille.vendeur.Nom.toLowerCase().includes(searchTerm.toLowerCase());

    return libelleMatch || creematch || vendeurmatech || modematch || tarifmatch;
  });
  const currentItems = filteredMode.slice(startIndex, endIndex);

  const handleClose = () => setShow(false);
  console.log(familleClient)
  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <CSpinner color="primary" />
          <p>Chargement en cours...</p>
        </div>
      ) : (
        <div>
          <div>
            <a href={`${window.location.href}/ajouterfamilleclient`}>
              <CButton color="primary" className='btnAjout'>Ajouter un Famille Client</CButton>
            </a>
          </div>
          <InputGroup className="mb-3" style={{ width: '50%' }}>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: '#5856d6' }} />
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
                <th>Libelle</th>
                <th>Type Tarif</th>
                <th>Mode Réglement</th>
                <th>Vendeur</th>
                <th>Crée le</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody className='TabAff'>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="8">Aucun item trouvé</td>
                </tr>
              ) : (
                currentItems.map((famille, index) => (
                  <tr key={index}>
                    <td><input type="checkbox" name="" id="" /></td>
                    <td>{famille.Libelle}</td>
                    <td>{famille.typeTarif ? famille.typeTarif.libelle : ''}</td>
                    <td>{famille.modeReglement ? famille.modeReglement.libelle : ''}</td>
                    <td>{famille.vendeur ? famille.vendeur.Nom : ''}</td>
                    <td>{extractDate(famille.createdAt)}</td>
                    <td>
                      <a href={`${window.location.href}/consulterfamilleClient/${famille.id}`}>
                        <CButton color="dark" variant="outline">
                          <FontAwesomeIcon icon={faEye} />
                        </CButton>
                      </a>
                    </td>
                    <td className='btnEdit' onClick={() => { setShow(true); setSelectedFamille(famille); }}>
                      <CButton color="primary" variant="outline" className='edit'>
                        <FontAwesomeIcon icon={faPenToSquare} style={{ color: '#5856d6' }} />
                      </CButton>
                    </td>
                    <td className='btnsupp' onClick={() => handleDeleteFamilleClient(famille.id)}>
                      <CButton color="danger" variant="outline" className='supp'>
                        <FontAwesomeIcon icon={faTrashCan} style={{ color: '#f96767' }} />
                      </CButton>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          {/* Pagination */}
          <Pagination>
            {Array.from({ length: Math.ceil(familleClient.length / itemsPerPage) }).map((_, index) => (
              <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}
      <UpdateFamilleClient show={show} handleClose={handleClose} famille={selectedFamille} />
    </>
  );
}

export default FamClient;
