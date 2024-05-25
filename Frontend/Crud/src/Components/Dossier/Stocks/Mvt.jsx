import React, { useEffect, useState } from 'react';
import {
  CTable,
  CButton,
  CForm,
  CFormInput,
  CPagination,
  CPaginationItem,
  CTableRow,
  CTableHead,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import UpdateEntete from '../Update/UpdateMvt';

function Mvt() {
  const newurlEntree = window.location.href.replace('/stocks', '/stock/entree')
  const newurlSortie = window.location.href.replace('/stocks', '/stock/sortie')

  const [Mvts, setMvts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 7;

  const [show, setShow] = useState(false);
  const [selectedMvt, setSelectedMvt] = useState(null);

  const dossierId = localStorage.getItem('dossierId');
  const tokenString = localStorage.getItem('token');
  const token = tokenString ? JSON.parse(tokenString) : null;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:5000/api/enteteStock/getAllEnteteStockByDossier/${dossierId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) {
          if (res.status === 404) {
            setMvts([]);
          } else {
            throw new Error('Erreur lors de la récupération des MVT');
          }
        } else {
          const jsonres = await res.json();
          const transformedData = jsonres.map((item, index) => ({
            ...item,
            index: index + 1,
            CodeEntete: item.CodeEntete || 'N/A',
            Date: item.Date || 'N/A',
            Type: item.Type || 'N/A',
            Fournisseur: item.fournisseur.nom || 'N/A',
            Depot: item.depot.Libelle || 'N/A',
          }));
          setMvts(transformedData);
        }
      } catch (error) {
        console.error('Erreur fetchData:', error);
      }
    }

    if (dossierId && token) {
      fetchData();
    }
  }, [dossierId, token]);
  console.log(Mvts)
  const handleDeleteMvt = async (id) => {
    try {
      console.log('ID de l\'appareil à supprimer :', id);
      const res = await fetch(`http://localhost:5000/api/enteteStock/deleteEnteteStock/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        toast.error('La suppression est échoué!');
        throw new Error('Erreur lors de la suppression de Mvt ');
      } else {
        toast.success('La suppression a été effectuée avec Mvt!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Erreur handleDeleteMvt:', error);
    }
  };

  const columns = [
    { key: 'index', label: '#', _props: { scope: 'col' } },
    { key: 'CodeEntete', label: 'CodeEntete', _props: { scope: 'col' } },
    { key: 'Date', label: 'Date', _props: { scope: 'col' } },
    { key: 'Type', label: 'Type', _props: { scope: 'col' } },
    { key: 'Fournisseur', label: 'Fournisseurs', _props: { scope: 'col' } },
    { key: 'Depot', label: 'Dépots', _props: { scope: 'col' } },
    { key: 'Action', label: 'Action', _props: { scope: 'col' }, style: { width: '20%' } },
  ];

  const actionButtons = (item) => (
    <div>
      <CButton color="dark" variant="outline" size="md" className='btnviewdark'>
        <a href={window.location.href + `/consultermvt/${item.id}`}><FontAwesomeIcon icon={faEye} /></a>
      </CButton>{' '}
      <CButton color="primary" variant="outline" size="md" className='edit' onClick={() => { setShow(true); setSelectedMvt(item); }}>
        <FontAwesomeIcon icon={faEdit} />
      </CButton>{' '}
      <CButton color="danger" variant="outline" size="md" className='supp' onClick={() => handleDeleteMvt(item.id)}>
        <FontAwesomeIcon icon={faTrash} />
      </CButton>
    </div>
  );

  const filteredItems = Mvts.filter(item => {
    return (
      item.Date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.CodeEntete.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(item => ({
    ...item,
    Action: actionButtons(item),

  }));

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  const handleClose = () => setShow(false);

  return (
    <div>
      <br />
      <div className='btnEntreSortie'>
        <a href={newurlEntree + '/ajouterEntree'}>
          <CButton color="primary" className=''>Ajouter une Entrée</CButton>
        </a>
        <a href={newurlSortie + '/ajouterSortie'}>
          <CButton color="primary" className=''>Ajouter une Sortie </CButton>
        </a>
        <br />
      </div>
      <br />
      <CForm style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>

        <CFormInput
          type="text"
          id="exampleFormControlInput1"
          placeholder="Rechercher"
          style={{ width: '500px' }}
          value={searchQuery}
          onChange={handleSearch}
        />

      </CForm>
      <br />
      <CTable responsive="sm" style={{ textAlign: 'center' }}>
        <CTableHead>
          <CTableRow>
            {columns.map((column) => (
              <CTableHeaderCell key={column.key}>{column.label}</CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {paginatedItems.length > 0 ? (
            paginatedItems.map((item, index) => (
              <CTableRow key={index}>
                {columns.map((column) => (
                  <CTableDataCell key={column.key}>{item[column.key]}</CTableDataCell>
                ))}
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan={columns.length} style={{ textAlign: 'center' }}>
                Aucun Item Trouvé
              </CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>
      {filteredItems.length > 0 && (
        <CPagination aria-label="Page navigation example" align="left">
          <CPaginationItem
            aria-label="Previous"
            onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
            disabled={currentPage === 1}
          >
            <span aria-hidden="true">&laquo;</span>
          </CPaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <CPaginationItem
              key={index + 1}
              active={currentPage === index + 1}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </CPaginationItem>
          ))}
          <CPaginationItem
            aria-label="Next"
            onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <span aria-hidden="true">&raquo;</span>
          </CPaginationItem>
        </CPagination>
      )}
      <UpdateEntete show={show} handleClose={handleClose} Entete={selectedMvt} />
    </div>
  );
}

export default Mvt;
