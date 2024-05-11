import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Assurez-vous d'importer FontAwesomeIcon
import {
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
function AddMarque() {
    const currentPageUrl = window.location.pathname;
    const newUrl = currentPageUrl.replace('/ajoutermarque', '');

    const tokenString = localStorage.getItem('token');
    const token = JSON.parse(tokenString);
    const dossierId = localStorage.getItem('dossierId')

    const [formData, setFormData] = useState({
        codeMarque: '',
        libelle: '',
        dossierId: dossierId,

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Vérifier si tous les champs obligatoires sont remplis
        const requiredFields = ['codeMarque', 'libelle'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            toast.error(`Les champs suivants sont obligatoires : ${missingFields.join(', ')}`);
            return;
        }

        // Générer un mot de passe unique de 8 caractères
        console.log(formData)

        try {
            const response = await fetch('http://localhost:5000/api/article/addmarque',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,// Ajout du token d'authentification dans le header
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...formData })
                });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout du Marque');
            }

            toast.success('Marque ajouté avec succès !');

            setTimeout(() => {
                window.location.replace(newUrl);
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de la Ajout du Marque:', error.message);
            toast.error('Erreur lors de la Ajout du Marque');
        }
    };
    return (
        <div>
            <div className='Revenir'>
                <a href={newUrl}><FontAwesomeIcon icon={faArrowLeft} size="xl" style={{ color: "#5856d6", }} /> Marques </a>
            </div>
            <Form className='formulaire'>
                <h3>Ajouter une Marque</h3>
                <br />
                <div className='BoxAjout'>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridRaisonsociale">
                            <Form.Label>* Code Marque </Form.Label>
                            <Form.Control type="text" name='codeMarque' onChange={handleChange} placeholder="Enter code Marque " required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPrenom">
                            <Form.Label>* Libelle</Form.Label>
                            <Form.Control type="text" name='libelle' onChange={handleChange} placeholder="Enter libelle " />
                        </Form.Group>
                    </Row>
                    <br />
                    <Button variant="primary" type="submit" className='btnAjout' onClick={handleSubmit}>
                        Ajouter Marque
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default AddMarque