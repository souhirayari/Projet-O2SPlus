import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function AddMvt() {
    const currentPageUrl = window.location.pathname;
    let newUrl = '';
    let newUrlRevenir = '';
    let title = '';

    if (currentPageUrl.includes('entree')) {
        newUrl = currentPageUrl.replace('/entree/ajouterEntree', '/ajouterligne');
        newUrlRevenir = currentPageUrl.replace('/entree/ajouterEntree', '/entree');

        title = 'Entrées';
    } else {
        newUrl = currentPageUrl.replace('/sortie/ajouterSortie', '/ajouterligne');
        newUrlRevenir = currentPageUrl.replace('/sortie/ajouterSortie', '/sortie');

        title = 'Sorties';
    }

    const tokenString = localStorage.getItem('token');
    const token = JSON.parse(tokenString);
    const dossierId = localStorage.getItem('dossierId');

    const [Depots, setDepots] = useState([]);
    const [Fournisseurs, setFournisseurs] = useState([]);

    const getCurrentDate = () => {
        const date = new Date();
        return date.toISOString().split('T')[0];
    };

    const [formData, setFormData] = useState({
        CodeEntete: '',
        Date: getCurrentDate(),
        Type: '',
        fournisseurId: '',
        depotId: '',
    });

    useEffect(() => {
        const setTypeFromUrl = () => {
            if (currentPageUrl.includes('entree')) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    Type: 'Entree'
                }));
            } else if (currentPageUrl.includes('sortie')) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    Type: 'Sortie'
                }));
            }
        };

        setTypeFromUrl();
    }, [currentPageUrl]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const [DepotsResponse, FournisseurResponse] = await Promise.all([
                    fetch(`http://localhost:5000/api/depot/getAllDepotByDossier/${dossierId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    }),
                    fetch(`http://localhost:5000/api/article/findAllFournisseurByDosier/${dossierId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    })
                ]);

                if (!DepotsResponse.ok) {
                    if (DepotsResponse.status === 404) {
                        setDepots([]);
                    } else {
                        throw new Error('Erreur lors de la récupération des dépôts');
                    }
                } else {
                    const depotData = await DepotsResponse.json();
                    setDepots(depotData);
                }

                if (!FournisseurResponse.ok) {
                    if (FournisseurResponse.status === 404) {
                        setFournisseurs([]);
                    } else {
                        throw new Error('Erreur lors de la récupération des fournisseurs');
                    }
                } else {
                    const fournisseurData = await FournisseurResponse.json();
                    setFournisseurs(fournisseurData);
                }
            } catch (error) {
                console.error('Erreur fetchData:', error);
            }
        }
        fetchData();
    }, [dossierId, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ['CodeEntete', 'Date', 'Type'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            toast.error(`Les champs suivants sont obligatoires : ${missingFields.join(', ')}`);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/enteteStock/addEnteteStock', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout du entete');
            }

            toast.success('Entete ajouté avec succès !');
            const queryParams = new URLSearchParams({
                codeEntete: formData.CodeEntete,
                date: formData.Date,
                type: formData.Type,
                depotId: formData.depotId,
                fournisseurId: formData.fournisseurId
            });
            const urlWithParams = `${newUrl}?${queryParams.toString()}`;
            console.log(urlWithParams)

            // Rediriger vers la nouvelle URL
            setTimeout(() => {
                window.location.replace(urlWithParams);
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de la Ajout du entete:', error.message);
            toast.error('Erreur lors de la Ajout du entete');
        }
    };

    return (
        <div>
            <div className='Revenir'>
                <a href={newUrlRevenir}>
                    <FontAwesomeIcon icon={faArrowLeft} size="xl" style={{ color: "#5856d6" }} /> {title}
                </a>
            </div>
            <Form className='formulaire' onSubmit={handleSubmit}>
                <h3>Ajouter un Entete de Stock</h3>
                <br />
                <div className='BoxAjout'>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCodeArticle">
                            <Form.Label>Code MVT</Form.Label>
                            <Form.Control type="text" name='CodeEntete' onChange={handleChange} placeholder='Enter le code ' required />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridTypeModele">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" name='Date' onChange={handleChange} value={formData.Date} placeholder="Entrez la date" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridModele">
                            <Form.Label>Type</Form.Label>
                            <Form.Select name='Type' onChange={handleChange} value={formData.Type} required disabled>
                                <option value="">Sélectionnez un type</option>
                                <option value="Entree">Entrée</option>
                                <option value="Sortie">Sortie</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridDepot">
                            <Form.Label>Dépôt</Form.Label>
                            <Form.Select name='depotId' onChange={handleChange} required>
                                <option value="">Sélectionnez un dépôt</option>
                                {Depots.map((depot) => (
                                    <option value={depot.id} key={depot.id}>{depot.Libelle}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridFournisseur">
                            <Form.Label>Fournisseur</Form.Label>
                            <Form.Select name='fournisseurId' onChange={handleChange} required>
                                <option value="">Sélectionnez un fournisseur</option>
                                {Fournisseurs.map((fournisseur) => (
                                    <option value={fournisseur.idFournisseur} key={fournisseur.idFournisseur}>{fournisseur.nom}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <br />
                    <Button variant="primary" type="submit" className='btnAjout'>
                        Ajouter Entete
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default AddMvt;
