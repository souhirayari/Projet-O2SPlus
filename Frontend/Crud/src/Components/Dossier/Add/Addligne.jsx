import React, { useEffect, useState } from 'react';
import { CRow, CCol, CFormInput, CButton, CFormSelect } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Addligne() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const codeEntete = queryParams.get('codeEntete');
    const date = queryParams.get('date');
    const type = queryParams.get('type');
    const depotId = queryParams.get('depotId');
    const fournisseurId = queryParams.get('fournisseurId');

    const currentPageUrl = window.location.pathname;
    let newUrl = '';
    if (type == 'Entree') {
        newUrl = currentPageUrl.replace('/ajouterligne', '/entree');

    } else {
        newUrl = currentPageUrl.replace('/ajouterligne', '/sortie');

    }
    const [Articles, setArticle] = useState([]);
    const [Entete, setEntete] = useState({}); // Initialize with an empty object

    const tokenString = localStorage.getItem('token');
    const token = tokenString ? JSON.parse(tokenString) : null;
    const dossierId = localStorage.getItem('dossierId');

    const [formDataArray, setFormDataArray] = useState([{
        idArticle: 0,
        Quantite: 0,
        PrixUnitaire: 0,
        enteteStockId: 0, // Initialize as an empty string
        depotId: parseInt(depotId),
        Type: type,
        fournisseurId: parseInt(fournisseurId)
    }]);

    useEffect(() => {
        async function fetchData() {
            try {
                const [articleResponse, enteteRes] = await Promise.all([
                    fetch(`http://localhost:5000/api/article/findAllArticlebyDossier/${dossierId}`, {
                        headers: {
                            'authorization': `Bearer ${token}`
                        }
                    }),
                    fetch(`http://localhost:5000/api/enteteStock/getOneEntete/${codeEntete}/${dossierId}`, {
                        headers: {
                            'authorization': `Bearer ${token}`
                        }
                    }),
                ]);

                if (!articleResponse.ok) {
                    if (articleResponse.status === 404) {
                        setArticle([]);
                    } else {
                        throw new Error('Erreur lors de la récupération des articles');
                    }
                } else {
                    const articleData = await articleResponse.json();
                    setArticle(articleData);
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
                    //Update the form data array with the correct enteteStockId
                    setFormDataArray(prevFormDataArray => prevFormDataArray.map(formData => ({
                        ...formData,
                        enteteStockId: enteteData.id
                    })));
                }

            } catch (error) {
                console.error('Erreur fetchData:', error);
            }
        }
        fetchData();
    }, [dossierId, token, codeEntete]);
    console.log(formDataArray)

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const intnumber = parseInt(value)
        const newFormDataArray = [...formDataArray];
        newFormDataArray[index] = {
            ...newFormDataArray[index],
            [name]: intnumber
        };
        setFormDataArray(newFormDataArray);
    };

    const addNewForm = () => {
        setFormDataArray([...formDataArray, {
            idArticle: 0,
            Quantite: 0,
            PrixUnitaire: 0,
            enteteStockId: Entete.id,// Ensure new form data has the correct enteteStockId
            depotId: parseInt(depotId),
            Type: type,
            fournisseurId: parseInt(fournisseurId)
        }]);
    };


    const removeForm = (index) => {
        const newFormDataArray = formDataArray.filter((_, i) => i !== index);
        setFormDataArray(newFormDataArray);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/ligneStock/addLigneStock', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataArray)
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message + ' essayer une autre .. !');
                throw new Error(errorData.message);
            }

            toast.success('lignes ajouté avec succès !');

            setTimeout(() => {
                window.location.replace(newUrl);
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de l\'ajout de les ligne de Stock:', error.message);
            toast.error('Erreur lors de l\'ajout de les ligne de Stock:');
        }
    };

    return (
        <>
            <div>
                <div className='diventete'>
                    <h3>Entete Stock</h3>
                    <br />
                    <CRow>
                        <CCol>
                            <label>Code Entete</label>
                            <p>{codeEntete}</p>
                        </CCol>

                        <CCol>
                            <label>Date Entete</label>
                            <p>{date}</p>
                        </CCol>
                        <CCol>
                            <label>Type Entete</label>
                            <p>{type}</p>
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
                <h3>Ajouter les lignes de Articles</h3>
                <br />
                {formDataArray.map((formData, index) => (
                    <div key={index} className="form-container">
                        <CRow className="g-3" style={{ display: 'flex', alignItems: 'center' }}>
                            <CCol sm={7}>
                                <CFormSelect
                                    label="Article"
                                    name="idArticle"
                                    value={formData.idArticle}
                                    onChange={(e) => handleChange(index, e)}
                                >
                                    <option value="">Sélectionnez un Article</option>
                                    {Articles && (Articles.map((article) => (
                                        <option key={article.idArticle} value={article.idArticle}>{article.libelle}</option>
                                    )))}
                                </CFormSelect>
                            </CCol>
                            <CCol sm>
                                <CFormInput
                                    placeholder="Quantité"
                                    label="Quantité"
                                    name="Quantite"
                                    value={formData.Quantité}
                                    onChange={(e) => handleChange(index, e)}
                                    type="number"
                                />
                            </CCol>
                            <CCol sm>
                                <CFormInput
                                    placeholder="Prix Unitaire"
                                    label="Prix Unitaire"
                                    name="PrixUnitaire"
                                    value={formData.PrixUnitaire}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </CCol>

                            <CCol sm="auto">
                                <CButton color="danger" style={{ marginTop: '30px' }} variant='outline' onClick={() => removeForm(index)}>
                                    <FontAwesomeIcon icon={faTrash} size="lg" />
                                </CButton>
                            </CCol>
                        </CRow>
                        <br />
                    </div>
                ))}
                <br />
                <CButton className='Ajoutbtn' onClick={addNewForm}>
                    <FontAwesomeIcon icon={faPlus} size="lg" style={{ color: "#5856d6" }} /> Ajouter une Autre Ligne
                </CButton>
            </div>
            <br />
            <Button variant="primary" type="submit" className='btnAjout' onClick={handleSubmit} >
                Sauvegarder les lignes
            </Button>
        </>
    );
}

export default Addligne;
