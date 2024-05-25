import React, { useEffect, useState } from 'react';
import { CTable, CButton, CPagination, CPaginationItem, CForm, CFormInput, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import UpdateAppareil from '../Update/UpdateAppareil';

function Appareil() {
  const [Appareil, setAppareil] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 7;

  const [show, setShow] = useState(false);
  const [selectedAppareil, setSelectedAppareil] = useState(null);

  const dossierId = localStorage.getItem('dossierId');
  const tokenString = localStorage.getItem('token');
  const token = tokenString ? JSON.parse(tokenString) : null;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:5000/api/article/findAllAppareilbyDossier/${dossierId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) {
          if (res.status === 404) {
            setAppareil([]);
          } else {
            throw new Error('Erreur lors de la récupération des articles');
          }
        } else {
          const jsonres = await res.json();
          const transformedData = jsonres.map((item, index) => ({
            ...item,
            index: index + 1,
            libelle: item.libelle || 'N/A',
            numSerie: item.numSerie || 'N/A',
            modele: item.modele || 'N/A',
            prixAchat: item.prixAchat || 'N/A',
            prixTTC: item.prixTTC || 'N/A',
            durreGarantie: item.durreGarantie || 'N/A',
            article: item.Article?.libelle || 'N/A',
            client: item.Clients ? item.Clients.Nom : 'N/A'
          }));
          setAppareil(transformedData);
        }
      } catch (error) {
        console.error('Erreur fetchData:', error);
      }
    }

    if (dossierId && token) {
      fetchData();
    }
  }, [dossierId, token]);

  const handleDeleteAppareil = async (id) => {
    try {
      console.log('ID de l\'appareil à supprimer :', id);
      const res = await fetch(`http://localhost:5000/api/article/deleteAppareil/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        toast.error('La suppression est échoué!');
        throw new Error('Erreur lors de la suppression de l\'Appareil');
      } else {
        toast.success('La suppression a été effectuée avec succès!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Erreur handleDeleteAppareil:', error);
    }
  };

  const columns = [
    { key: 'index', label: '#', _props: { scope: 'col' } },
    { key: 'libelle', label: 'Libelle', _props: { scope: 'col' } },
    { key: 'numSerie', label: 'N° Série', _props: { scope: 'col' } },
    { key: 'modele', label: 'Modèle', _props: { scope: 'col' } },
    { key: 'prixAchat', label: 'Prix Achat', _props: { scope: 'col' } },
    { key: 'prixTTC', label: 'Prix TTC', _props: { scope: 'col' } },
    { key: 'durreGarantie', label: 'Durée Garantie', _props: { scope: 'col' } },
    { key: 'article', label: 'Article', _props: { scope: 'col' } },
    { key: 'client', label: 'Client', _props: { scope: 'col' } },
    { key: 'Action', label: 'Action', _props: { scope: 'col' } },
  ];

  const actionButtons = (item) => (
    <div>
      <CButton color="dark" variant="outline" size="md" className='btnviewdark'>
        <a href={window.location.href + `/consulterappareil/${item.idAppareil}`}><FontAwesomeIcon icon={faEye} /></a>
      </CButton>{' '}
      <CButton color="primary" variant="outline" size="md" onClick={() => { setShow(true), setSelectedAppareil(item) }}>
        <FontAwesomeIcon icon={faEdit} />
      </CButton>{' '}
      <CButton color="danger" variant="outline" size="md" onClick={() => handleDeleteAppareil(item.idAppareil)}>
        <FontAwesomeIcon icon={faTrash} />
      </CButton>
    </div>
  );

  const filteredItems = Appareil.filter(item => {
    return (
      item.libelle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.numSerie.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.modele.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.prixAchat.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.prixTTC.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.durreGarantie.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.article.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(item => ({
    ...item,
    Action: actionButtons(item)
  }));

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when search query changes
  };


  const handleClose = () => setShow(false);
  return (
    <div>
      <div>
        <a href={window.location.href + '/ajouterappareil'}>
          <CButton color="primary" className='btnAjout'>Ajouter un Appareil</CButton>
        </a>
        <br />
      </div>
      <CForm>
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
      <UpdateAppareil show={show} handleClose={handleClose} appareil={selectedAppareil} />
    </div>
  );
}

export default Appareil;
