import React, { useEffect, useState } from 'react';
import { CSmartTable } from '@coreui/react-pro';
import { CButton } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Assurez-vous d'importer FontAwesomeIcon
import {
    faPenToSquare,
    faTrashCan,
    faEye
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import UpdateClient from '../Update/UpdateClient';

function ViewClients() {
    const dossierId = localStorage.getItem('dossierId');
    const tokenString = localStorage.getItem('token');
    const token = JSON.parse(tokenString);
    const [loading, setLoading] = useState();
    const [clients, setClients] = useState([]);

    const [show, setShow] = useState(false);
    const [selectedclient, setSelectedClient] = useState(null); // Ajout de l'état pour l'utilisateur sélectionné

    const columns = [
        {
            key: 'Nom',
            _style: { minWidth: '130px' },
        },
        {
            key: 'Email',
            _style: { minWidth: '130px' },
        },
        {
            key: 'Civilite',
            _style: { minWidth: '120px' },
        },
        {
            key: 'pays',
            label: 'Pays',
        },
        {
            key: 'ville',
            label: 'Adresse',
        },

        {
            key: 'telephone',
            label: 'Telephone',
        },
        {
            key: 'show_details',
            label: 'Actions',
            _style: { width: '10%' },
            filter: false,
            sorter: false,
        },
    ];

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/api/client/getAllClientByDossier/${dossierId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((result) => {
                setClients(result);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [dossierId, token]);

    const handleDeleteclient = async (id) => {
        try {
            const resUser = await fetch(`http://localhost:5000/api/client/deleteClient/${id}`, {
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

    const handleClose = () => setShow(false);
    return (
        <div>
            <div>
                <a href={window.location.href + '/ajouterclient'}><CButton color="primary" className='btnAjout'>Ajouter un Client </CButton> </a>
            </div>
            <br />
            <div style={{ textAlign: 'center' }}>
                <CSmartTable
                    activePage={1}
                    columns={columns}
                    columnFilter
                    columnSorter
                    items={clients}
                    itemsPerPageSelect
                    itemsPerPage={5}
                    loading={loading}
                    pagination
                    tableProps={{
                        className: 'add-this-class',
                        responsive: true,
                        striped: true,
                        hover: true,
                    }}
                    scopedColumns={{
                        show_details: (item) => {
                            return (
                                <td className="py-2">

                                    <CButton color="dark" variant="outline" shape="square" size="sm"
                                        href={window.location.href + `/consulterclient/${item.id}`}
                                    >
                                        <FontAwesomeIcon icon={faEye} />

                                    </CButton>
                                    <CButton color="primary" className='edit' variant="outline" shape="square" size="sm"
                                        onClick={() => { setShow(true); setSelectedClient(item); }} >
                                        <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#5856d6", }} />

                                    </CButton>
                                    <CButton color="danger" className='supp' variant="outline" shape="square" size="sm"
                                        onClick={() => {
                                            handleDeleteclient(item.id)
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} style={{ color: "#f96767", }} />

                                    </CButton>

                                </td>
                            )
                        },
                    }}
                    selectable
                    tableFilter
                    tableBodyProps={{
                        className: 'align-middle'
                    }}

                />
            </div>
            <UpdateClient show={show} handleClose={handleClose} client={selectedclient} />
        </div>
    );
}

export default ViewClients;
