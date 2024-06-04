import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CRow, CCol, CButton, CTable, CPagination, CPaginationItem } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

function ConsulterEntete() {
    const currentPageUrl = window.location.pathname;
    const newUrl = currentPageUrl.split('/entree/consultermvt')[0] + 's';
    console.log(newUrl)
    const tokenString = localStorage.getItem('token');
    const token = tokenString ? JSON.parse(tokenString) : null;
    const dossierId = localStorage.getItem('dossierId');
    const [Lignes, setLignes] = useState([]);
    const [Entete, setEntete] = useState({});
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    useEffect(() => {
        async function fetchData() {
            try {
                const [lignesRes, enteteRes] = await Promise.all([
                    fetch(`http://localhost:5000/api/ligneStock/getLigneStockByEnteteStock/${id}`, {
                        headers: {
                            'authorization': `Bearer ${token}`
                        }
                    }),
                    fetch(`http://localhost:5000/api/enteteStock/getOneEntetebyid/${id}`, {
                        headers: {
                            'authorization': `Bearer ${token}`
                        }
                    }),
                ]);

                if (!lignesRes.ok) {
                    if (lignesRes.status === 404) {
                        setLignes([]);
                    } else {
                        throw new Error('Erreur lors de la récupération des lignes');
                    }
                } else {
                    const ligneData = await lignesRes.json();
                    const transformedData = ligneData.map((item, index) => ({
                        ...item,
                        index: index + 1,
                        article: item.Article?.libelle || 'N/A',
                        Quantite: item.Quantite || 'N/A',
                        PrixUnitaire: item.PrixUnitaire || 'N/A',
                    }));
                    setLignes(transformedData);
                }

                if (!enteteRes.ok) {
                    if (enteteRes.status === 404) {
                        setEntete({});
                    } else {
                        throw new Error('Erreur lors de la récupération des entete');
                    }
                } else {
                    const enteteData = await enteteRes.json();
                    setEntete(enteteData);
                }
            } catch (error) {
                console.error('Erreur fetchData:', error);
            }
        }
        fetchData();
    }, [dossierId, token, id]);

    const handleDeleteMvt = async (itemId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/ligneStock/deleteLigneStock/${itemId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!res.ok) {
                toast.error('La suppression a échoué!');
                throw new Error('Erreur lors de la suppression de ligne');
            } else {
                toast.success('La suppression a été effectuée avec succès!');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            console.error('Erreur handleDeleteMvt:', error);
        }
    };

    const actionButtons = (item) => (
        <div>
            <CButton color="danger" variant="outline" size="md" className='supp' onClick={() => handleDeleteMvt(item.id)}>
                <FontAwesomeIcon icon={faTrash} />
            </CButton>
        </div>
    );

    const columns = [
        { key: 'index', label: '#', _props: { scope: 'col' } },
        { key: 'article', label: 'Article', _props: { scope: 'col' } },
        { key: 'Quantite', label: 'Quantité', _props: { scope: 'col' } },
        { key: 'PrixUnitaire', label: 'Prix Unitaire', _props: { scope: 'col' } },
        { key: 'action', label: 'Action', _props: { scope: 'col' }, filter: false, sorter: false },
    ];

    const paginatedLignes = Lignes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div>
            <div className='Revenir'>
                <a href={newUrl}><FontAwesomeIcon icon={faArrowLeft} size="xl" style={{ color: "#5856d6", }} /> Mvts </a>
            </div>
            <br />
            <div className='diventete'>
                <h3>Entete Stock</h3>
                <br />
                <CRow>
                    <CCol>
                        <label>Code Entete</label>
                        <p>{Entete.CodeEntete}</p>
                    </CCol>
                    <CCol>
                        <label>Date Entete</label>
                        <p>{Entete.Date}</p>
                    </CCol>
                    <CCol>
                        <label>Type Entete</label>
                        <p>{Entete.Type}</p>
                    </CCol>
                </CRow>
                <Row>
                    <CCol>
                        <label>Dépot Entete</label>
                        <p>{Entete.depot?.Libelle}</p>
                    </CCol>
                    <CCol>
                        <label>Fournisseur</label>
                        <p>{Entete.fournisseur?.nom}</p>
                    </CCol>
                </Row>
            </div>
            <br /><br />
            <div>
                <CTable
                    responsive="sm"
                    items={paginatedLignes.map((item) => ({
                        ...item,
                        action: actionButtons(item)
                    }))}
                    columns={columns}
                    style={{ textAlign: 'center' }}
                />
                <CPagination
                    align="left"
                    activePage={currentPage}
                    pages={Math.ceil(Lignes.length / itemsPerPage)}
                    onActivePageChange={(page) => setCurrentPage(page)}
                    size="md"
                >
                    <CPaginationItem aria-label="Previous" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                        &laquo;
                    </CPaginationItem>
                    {[...Array(Math.ceil(Lignes.length / itemsPerPage)).keys()].map((page) => (
                        <CPaginationItem key={page} active={page + 1 === currentPage} onClick={() => setCurrentPage(page + 1)}>
                            {page + 1}
                        </CPaginationItem>
                    ))}
                    <CPaginationItem aria-label="Next" disabled={currentPage === Math.ceil(Lignes.length / itemsPerPage)} onClick={() => setCurrentPage(currentPage + 1)}>
                        &raquo;
                    </CPaginationItem>
                </CPagination>
            </div>
        </div>
    );
}

export default ConsulterEntete;
