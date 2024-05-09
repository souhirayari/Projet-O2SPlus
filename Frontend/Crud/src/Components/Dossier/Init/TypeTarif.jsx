import React, { useEffect, useState } from 'react';
import { CButton } from '@coreui/react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Pagination from 'react-bootstrap/Pagination'; // Import de la pagination
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashCan, faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import UpdateTypeTarif from '../Update/UpdateTypeTarif';


function TypeTarif() {
  const [types, setTypes] = useState([]);
  const dossierId = localStorage.getItem('dossierId');
  const tokenString = localStorage.getItem('token');
  const token = JSON.parse(tokenString);
  const [show, setShow] = useState(false);
  const [selectedType, setSelectedType] = useState(null); // Ajout de l'état pour l'utilisateur sélectionné
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // État pour suivre la page actuelle
  const itemsPerPage = 7; // Nombre d'éléments par page

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:5000/api/article/findAllTypeTarifbyDossier/${dossierId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) {
          if (res.status === 404) {
            setTypes([]);
          } else {
            throw new Error('Erreur lors de la récupération des types de tarif');
          }
        } else {
          const jsonres = await res.json();
          setTypes(jsonres);
        }
      } catch (error) {
        console.error('Erreur fetchData:', error);
      }
    }
    fetchData();
  }, [dossierId, token]);

  const handleDeleteTypeTarif = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/article/deleteTypeTarif/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error('Erreur lors de la suppression du type de tarif');
      } else {
        toast.success('La suppression a été effectuée avec succès!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Erreur handleDeleteTypeTarif:', error);
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
  const filteredTypes = types.filter(type => {
    const libelleMatch = type.libelle.toLowerCase().includes(searchTerm.toLowerCase());
    const creematch = extractDate(type.createdAt).includes(searchTerm);
    const typeMatch = type.type.toLowerCase().includes(searchTerm.toLowerCase());
    const codetypetarifMatch = type.codeTypeTarif.toLowerCase().includes(searchTerm.toLowerCase());
    return libelleMatch || typeMatch || creematch || codetypetarifMatch;
  });
  const currentItems = filteredTypes.slice(startIndex, endIndex);

  const handleClose = () => setShow(false);

  return (
    <>
      <div>
        <div>
          <a href={window.location.href + '/ajoutertypetarif'}>
            <CButton color="primary" className='btnAjout'>Ajouter un Type Tarif</CButton>
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
              <th>Code Type Tarif</th>
              <th>Libelle</th>
              <th>Type</th>
              <th>Crée le</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody className='TabAff'>
            {currentItems.map((type, index) => (
              <tr key={index}>
                <td><input type="checkbox" name="" id="" /></td>
                <td>{type.codeTypeTarif}</td>
                <td>{type.libelle}</td>
                <td>{type.type}</td>
                <td>{extractDate(type.createdAt)}</td>
                <td className='btnEdit' onClick={() => { setShow(true); setSelectedType(type); }}>
                  <CButton color="primary" variant="outline" className='edit'>
                    <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#5856d6" }} />
                  </CButton>
                </td>
                <td className='btnsupp' onClick={() => handleDeleteTypeTarif(type.idTypetarif)}>
                  <CButton color="danger" variant="outline" className='supp'>
                    <FontAwesomeIcon icon={faTrashCan} style={{ color: "#f96767" }} />
                  </CButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Pagination */}
        <Pagination>
          {Array.from({ length: Math.ceil(types.length / itemsPerPage) }).map((_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      <UpdateTypeTarif show={show} handleClose={handleClose} typeTarif={selectedType} />
    </>
  )
}

export default TypeTarif;
