import React, { useEffect, useState } from 'react'
import { CSmartTable, CButton, CCollapse, CCardBody } from '@coreui/react-pro'

import '../../../Style/Dossier/userStyle.css'
import { toast } from 'react-toastify';
import UpdateFournisseur from '../Update/UpdateFournisseur';

function Fournisseur() {
  const [details, setDetails] = useState([])
  const [Fournisseur, setFournisseur] = useState([])
  const dossierId = localStorage.getItem('dossierId');
  const tokenString = localStorage.getItem('token');
  const token = JSON.parse(tokenString);

  const [show, setShow] = useState(false);
  const [selectedFournisseur, setSelectedFournisseur] = useState(null); // Ajout de l'état pour l'utilisateur sélectionné

  const columns = [
    {
      key: 'nom',
      _style: { width: '20%' },
    }, {
      key: 'createdAt',
      _style: { width: '20%' },
    },
    {
      key: 'Email',

      _style: { width: '20%' }
    },
    {
      key: 'Telephone',

      _style: { width: '20%' }
    },
    {
      key: 'delais',
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
        const resfour = await fetch(`http://localhost:5000/api/article/findAllFournisseurByDosier/${dossierId}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
          }
        });
        if (!resfour.ok) {
          if (resUsers.status === 404) {
            setFournisseur([]);
          } else {
            throw new Error('Erreur lors de la récupération des utilisateurs');
          }
        } else {
          const jsonfour = await resfour.json();
          setFournisseur(jsonfour);
        }
      } catch (error) {
        console.error('Erreur fetchData:', error);
      }
    }
    fetchData();
  }, [dossierId, token]);

  const handleDeletefournisseur = async (id) => {
    try {
      const resUser = await fetch(`http://localhost:5000/api/article/deleteFournisseur/${id}`, {
        method: "DELETE",

        headers: {
          'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
        }

      });

      if (!resUser.ok) {
        throw new Error('Erreur lors de la suppression de l\'utilisateur');
      } else {
        toast.success('La suppression a été effectuée avec succès!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Erreur handleDeleteUser:', error);
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


  const handleClose = () => setShow(false);

  return (
    <>
      <div>
        <div>
          <a href={window.location.href + '/ajouterfournisseur'}><CButton color="primary" className='btnAjout'>Ajouter un fournisseur </CButton> </a>
        </div>
        <CSmartTable
          activePage={2}
          cleaner
          clickableRows
          columns={columns}
          columnFilter
          columnSorter
          footer
          items={Fournisseur}
          itemsPerPageSelect
          itemsPerPage={5}
          pagination
          onFilteredItemsChange={(items) => {
          }}
          onSelectedItemsChange={(items) => {
          }}
          scopedColumns={{
            show_details: (item) => {
              return (
                <td className="py-2">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => {
                      toggleDetails(item.idFournisseur)

                    }}
                  >
                    {details.includes(item.idFournisseur) ? 'Hide' : 'Show'}

                  </CButton>

                </td>
              )
            },
            details: (item) => {
              return (
                <CCollapse visible={details.includes(item.idFournisseur)}>
                  <CCardBody className="p-3">
                    <h4>{item.nom}</h4>
                    <p className="text-muted">Fournisseur since: {extractDate(item.createdAt)}</p>
                    <div className='btns'>
                      <CButton size="sm" color="primary" onClick={() => { setShow(true); setSelectedFournisseur(item); }}>
                        Modifier
                      </CButton>
                      <CButton size="sm" color="danger" onClick={() => { handleDeletefournisseur(item.idFournisseur) }} >
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
      <UpdateFournisseur show={show} handleClose={handleClose} fournisseur={selectedFournisseur} />
    </>
  )
}

export default Fournisseur