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
import { faEdit, faTrash, faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { Switch } from 'antd';
import UpdateDepot from '../Update/UpdateDepot';

function Depots() {
    const newurl = window.location.href.replace('/Depots', '')
    const [Depots, setDepots] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 7;

    const [show, setShow] = useState(false);
    const [selectedDepot, setSelectedDepot] = useState(null);

    const dossierId = localStorage.getItem('dossierId');
    const tokenString = localStorage.getItem('token');
    const token = tokenString ? JSON.parse(tokenString) : null;

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`http://localhost:5000/api/depot/getAllDepotByDossier/${dossierId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!res.ok) {
                    if (res.status === 404) {
                        setDepots([]);
                    } else {
                        throw new Error('Erreur lors de la récupération des Depots');
                    }
                } else {
                    const jsonres = await res.json();
                    const transformedData = jsonres.map((item, index) => ({
                        ...item,
                        index: index + 1,
                        Libelle: item.Libelle || 'N/A',
                        Pays: item.Pays || 'N/A',
                        Ville: item.Ville || 'N/A',
                        Responsable: item.Responsable || 'N/A',
                        Telephone: item.Telephone || 'N/A',
                        Principal: item.Principal || false,
                    }));
                    setDepots(transformedData);
                }
            } catch (error) {
                console.error('Erreur fetchData:', error);
            }
        }

        if (dossierId && token) {
            fetchData();
        }
    }, [dossierId, token]);

    const handleDeleteDepots = async (id) => {
        try {
            console.log('ID de l\'appareil à supprimer :', id);
            const res = await fetch(`http://localhost:5000/api/depot/deleteDepot/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!res.ok) {
                toast.error('La suppression est échoué!');
                throw new Error('Erreur lors de la suppression de depot');
            } else {
                toast.success('La suppression a été effectuée avec succès!');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            console.error('Erreur handleDeleteDepot:', error);
        }
    };

    const columns = [
        { key: 'index', label: '#', _props: { scope: 'col' } },
        { key: 'Libelle', label: 'Libelle', _props: { scope: 'col' } },
        { key: 'Pays', label: 'Pays', _props: { scope: 'col' } },
        { key: 'Ville', label: 'Ville', _props: { scope: 'col' } },
        { key: 'Responsable', label: 'Responsable', _props: { scope: 'col' } },
        { key: 'Telephone', label: 'Telephone', _props: { scope: 'col' } },
        { key: 'Principal', label: 'Principale', _props: { scope: 'col' } },
        { key: 'Action', label: 'Action', _props: { scope: 'col' }, style: { width: '20%' } },
    ];

    const actionButtons = (item) => (
        <div>
            <CButton color="primary" variant="outline" size="md" className='edit' onClick={() => { setShow(true); setSelectedDepot(item); }}>
                <FontAwesomeIcon icon={faEdit} />
            </CButton>{' '}
            <CButton color="danger" variant="outline" size="md" className='supp' onClick={() => handleDeleteDepots(item.id)}>
                <FontAwesomeIcon icon={faTrash} />
            </CButton>
        </div>
    );

    const filteredItems = Depots.filter(item => {
        return (
            item.Libelle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.Pays.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.Ville.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.Responsable.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.Telephone.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.Principal.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(item => ({
        ...item,
        Action: actionButtons(item),
        Principal: <Switch checked={item.Principal} className={item.Principal ? 'switch-checked' : ''} disabled />
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
                <a href={newurl + '/ajouterdepot'}>
                    <CButton color="primary" className='btnAjout'>Ajouter un Dépot</CButton>
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
                <FontAwesomeIcon icon={faFilterCircleXmark} size='md' style={{ color: "#5856d6", }} />
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
            <UpdateDepot show={show} handleClose={handleClose} Depot={selectedDepot} />
        </div>
    );
}

export default Depots;
