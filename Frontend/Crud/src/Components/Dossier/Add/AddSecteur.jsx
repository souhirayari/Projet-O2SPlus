import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function AddSecteur() {
    const currentPageUrl = window.location.pathname;
    const newUrl = currentPageUrl.replace('/ajoutersecteur', '');

    const tokenString = localStorage.getItem('token');
    const token = JSON.parse(tokenString);
    const dossierId = localStorage.getItem('dossierId');

    const [formData, setFormData] = useState({
        Libelle: '',
        CodeSecteurGeo: '',
        dossierId: dossierId
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value // Conserver la valeur sous forme de chaîne
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Vérifier si tous les champs obligatoires sont remplis
        const requiredFields = ['CodeSecteurGeo', 'Libelle'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            toast.error(`Les champs suivants sont obligatoires : ${missingFields.join(', ')}`);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/SecteurGeo/addSecteurGeo', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de la  Secteur Géographique');
            }

            toast.success(' Secteur Géographique ajoutée avec succès !');

            setTimeout(() => {
                window.location.replace(newUrl);
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la  Secteur Géographique :', error.message);
            toast.error('Erreur lors de l\'ajout de la  Secteur Géographique');
        }
    };

    return (
        <div>
            <div className='Revenir'>
                <a href={newUrl}>
                    <FontAwesomeIcon icon={faArrowLeft} size="xl" style={{ color: "#5856d6" }} />  Secteur Géographique
                </a>
            </div>
            <Form className='formulaire'>
                <h3>Ajouter une Secteur Géographique</h3>
                <br />
                <div className='BoxAjout'>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridPrenom">
                            <Form.Label>Code Secteur Geo</Form.Label>
                            <Form.Control type="text" name='CodeSecteurGeo' onChange={handleChange} placeholder="Enter Code SecteurGeo " required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridRaisonsociale">
                            <Form.Label>Libelle</Form.Label>
                            <Form.Control type="text" name='Libelle' onChange={handleChange} placeholder="Entrez Libelle" required />
                        </Form.Group>
                    </Row>

                    <br />
                    <Button variant="primary" type="submit" className='btnAjout' onClick={handleSubmit}>
                        Ajouter Secteur Géographique
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default AddSecteur;
