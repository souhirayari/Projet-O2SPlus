import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function AddZone() {
    const currentPageUrl = window.location.pathname;
    const newUrl = currentPageUrl.replace('/ajouterzoneinter', '');

    const tokenString = localStorage.getItem('token');
    const token = JSON.parse(tokenString);
    const dossierId = localStorage.getItem('dossierId');

    const [formData, setFormData] = useState({
        Libelle: '',
        Duree: '',
        Note: '',
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
        const requiredFields = ['Duree', 'Libelle'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            toast.error(`Les champs suivants sont obligatoires : ${missingFields.join(', ')}`);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/zoneIntervention/addZoneIntervention', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de la zone');
            }

            toast.success('Zone ajoutée avec succès !');

            setTimeout(() => {
                window.location.replace(newUrl);
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la zone :', error.message);
            toast.error('Erreur lors de l\'ajout de la zone');
        }
    };

    return (
        <div>
            <div className='Revenir'>
                <a href={newUrl}>
                    <FontAwesomeIcon icon={faArrowLeft} size="xl" style={{ color: "#5856d6" }} /> Zones d'Interventions
                </a>
            </div>
            <Form className='formulaire'>
                <h3>Ajouter une Zone d'Intervention</h3>
                <br />
                <div className='BoxAjout'>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridPrenom">
                            <Form.Label>Nom de Zone d'Intervention</Form.Label>
                            <Form.Control type="text" name='Libelle' onChange={handleChange} placeholder="Enter libelle " required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridRaisonsociale">
                            <Form.Label>Durée Intervention (en minutes)</Form.Label>
                            <Form.Control type="number" name='Duree' onChange={handleChange} value={formData.Duree} placeholder="Entrez la durée de l'intervention (ex: 20)" required />
                        </Form.Group>
                    </Row>
                    <Form.Group as={Col} controlId="formGridRaisonsociale">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control as="textarea" name='Note' rows={3} onChange={handleChange} value={formData.Note} placeholder='Enter Note' />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit" className='btnAjout' onClick={handleSubmit}>
                        Ajouter Zone
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default AddZone;
