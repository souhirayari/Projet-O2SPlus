import React, { useEffect, useState } from 'react';
import { CButton } from '@coreui/react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Pagination from 'react-bootstrap/Pagination'; // Import de la pagination
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import UpdateModeRegl from '../Update/UpdateModeRegl';


function ModeRegl() {
  const [Mode, setMode] = useState([]);
  const dossierId = localStorage.getItem('dossierId');
  const tokenString = localStorage.getItem('token');
  const token = JSON.parse(tokenString);
  const [show, setShow] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null); // Ajout de l'état pour l'utilisateur sélectionné
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // État pour suivre la page actuelle
  const itemsPerPage = 7; // Nombre d'éléments par page

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:5000/api/article/findAllModeRegl/${dossierId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) {
          if (res.status === 404) {
            setMode([]);
          } else {
            throw new Error('Erreur lors de la récupération des mde Réglement');
          }
        } else {
          const jsonres = await res.json();
          setMode(jsonres);
        }
      } catch (error) {
        console.error('Erreur fetchData:', error);
      }
    }
    fetchData();
  }, [dossierId, token]);

  const handleDeleteModeRegl = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/article/deleteModeRegl/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error('Erreur lors de la suppression du mode Reglement ');
      } else {
        toast.success('La suppression a été effectuée avec succès!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Erreur handleDeleteModeRegl:', error);
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
  const filteredMode = Mode.filter(mode => {
    const libelleMatch = mode.libelle.toLowerCase().includes(searchTerm.toLowerCase());
    const creematch = extractDate(mode.createdAt).includes(searchTerm);
    const modePaimentmatch = mode.modePaiment.toLowerCase().includes(searchTerm.toLowerCase());
    const TypePaimentmatch = mode.TypePaiment.toLowerCase().includes(searchTerm.toLowerCase());
    return libelleMatch || modePaimentmatch || creematch || TypePaimentmatch;
  });
  const currentItems = filteredMode.slice(startIndex, endIndex);

  const handleClose = () => setShow(false);

  return (
    <>
      <div>
        <div>
          <a href={window.location.href + '/ajoutermodeRegl'}>
            <CButton color="primary" className='btnAjout'>Ajouter un Mode Réglement</CButton>
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
              <th>Libelle</th>
              <th>Type Paiment</th>
              <th>Pourcentage</th>
              <th>Mois</th>
              <th>nombre jours</th>
              <th>modePaiment</th>
              <th>Crée le</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody className='TabAff'>

            {currentItems.length === 0 ?
              (<tr>
                <td colSpan="10">Aucun item trouvé</td>
              </tr>)
              : (currentItems.map((Mode, index) => (
                <tr key={index}>
                  <td><input type="checkbox" name="" id="" /></td>
                  <td>{Mode.libelle}</td>
                  <td>{Mode.TypePaiment}</td>
                  <td>{Mode.pourcentage}</td>
                  <td>{Mode.modePaiment}</td>
                  <td>{Mode.Mois}</td>
                  <td>{Mode.nbj}</td>
                  <td>{extractDate(Mode.createdAt)}</td>
                  <td className='btnEdit' onClick={() => { setShow(true); setSelectedMode(Mode); }}>
                    <CButton color="primary" variant="outline" className='edit'>
                      <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#5856d6" }} />
                    </CButton>
                  </td>
                  <td className='btnsupp' onClick={() => handleDeleteModeRegl(Mode.idReg)}>
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
          {Array.from({ length: Math.ceil(Mode.length / itemsPerPage) }).map((_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      <UpdateModeRegl show={show} handleClose={handleClose} mode={selectedMode} />
    </>
  )
}

export default ModeRegl
