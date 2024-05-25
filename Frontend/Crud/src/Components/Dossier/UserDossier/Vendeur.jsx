import React, { useEffect, useState } from 'react'
import { CSmartTable, CButton, CCollapse, CCardBody, CBadge } from '@coreui/react-pro'

import '../../../Style/Dossier/userStyle.css'
import { toast } from 'react-toastify';
import UpdateVendeur from '../Update/UpdateVendeur';

function Vendeur() {
  const [details, setDetails] = useState([])
  const [vendeurs, setvendeur] = useState([])
  const dossierId = localStorage.getItem('dossierId');
  const tokenString = localStorage.getItem('token');
  const token = JSON.parse(tokenString);

  const [show, setShow] = useState(false);
  const [selectedvendeur, setSelectedvendeur] = useState(null); // Ajout de l'état pour l'utilisateur sélectionné

  const columns = [
    {
      key: 'Nom',
      _style: { width: '20%' },
    }, {
      key: 'createdAt',
      _style: { width: '20%' },
    },
    {
      key: 'Email',

      _style: { width: '30%' }
    },
    {
      key: 'Telephone',

      _style: { width: '15%' }
    },
    {
      key: 'status',
      _style: { width: '10%' }
    },
    {
      key: 'show_details',
      label: 'Action',
      _style: { width: '10%' },
      filter: false,
      sorter: false,
    },
  ]
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/api/vendeur/getAllVendeurByDossier/${dossierId}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
          }
        });
        if (!response.ok) {
          if (response.status === 404) {
            setvendeur([]);
          } else {
            throw new Error('Erreur lors de la récupération des Vendeurs');
          }
        } else {
          const jsonres = await response.json();
          setvendeur(jsonres);
        }
      } catch (error) {
        console.error('Erreur fetchData:', error);
      }
    }
    fetchData();
  }, [dossierId, token]);
  console.log(vendeurs)

  const handleDeletefournisseur = async (id) => {
    try {
      const resUser = await fetch(`http://localhost:5000/api/vendeur/delete/${id}`, {
        method: "DELETE",

        headers: {
          'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
        }

      });

      if (!resUser.ok) {
        throw new Error('Erreur lors de la suppression de l\'Vendeur');
      } else {
        toast.success('La suppression a été effectuée avec succès!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Erreur handleDeleteVendeur:', error);
    }
  };

  const extractDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const toggleDetails = (index) => {
    console.log('index', index)
    const position = details.indexOf(index)
    console.log(position)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }
  const getBadge = (status) => {
    switch (status) {
      case 'Actif':
        return 'success'
      case 'Inactif':
        return 'danger'
      case 'Suspendu':
        return 'warning'
      case 'Retraité':
        return 'secondary'
      default:
        return 'primary'
    }
  }

  const handleClose = () => setShow(false);

  return (
    <>
      <div>
        <div>
          <a href={window.location.href + '/ajoutervendeur'}><CButton color="primary" className='btnAjout'>Ajouter un vendeur </CButton> </a>
        </div>
        <div style={{ textAlign: 'center' }}>
          <CSmartTable
            activePage={2}
            cleaner
            clickableRows
            columns={columns}
            columnFilter
            columnSorter
            items={vendeurs}
            itemsPerPageSelect
            itemsPerPage={5}
            pagination
            onFilteredItemsChange={(items) => {
            }}
            onSelectedItemsChange={(items) => {
            }}
            scopedColumns={{
              status: (item) => (
                <td>
                  <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                </td>
              ),
              show_details: (item) => {
                return (
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        toggleDetails(item.id)

                      }}
                    >
                      {details.includes(item.id) ? 'Hide' : 'Show'}

                    </CButton>

                  </td>
                )
              },
              details: (item) => {
                return (
                  <CCollapse visible={details.includes(item.id)}>
                    <CCardBody className="p-3">
                      <h4>{item.Nom}</h4>
                      <p className="text-muted">Vendeur since: {extractDate(item.createdAt)}</p>
                      <div className='btns'>
                        <CButton size="sm" color="primary" onClick={() => { setShow(true); setSelectedvendeur(item); }}>
                          Modifier
                        </CButton>
                        <CButton size="sm" color="danger" onClick={() => { handleDeletefournisseur(item.id) }} >
                          Delete
                        </CButton>
                      </div>
                    </CCardBody>
                  </CCollapse>
                )
              },
            }}
            selectable
            tableFilter
            tableProps={{
              className: 'add-this-class',
              responsive: true,
              striped: true,
              hover: true,
            }}
            tableBodyProps={{
              className: 'align-middle'
            }}
          />
        </div>
      </div>

      <UpdateVendeur show={show} handleClose={handleClose} vendeur={selectedvendeur} />
    </>
  )
}

export default Vendeur