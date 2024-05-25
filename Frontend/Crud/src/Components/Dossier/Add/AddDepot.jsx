import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { countries } from 'countries-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Assurez-vous d'importer FontAwesomeIcon
import {
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
function AddDepot() {
    const currentPageUrl = window.location.pathname;
    const newUrl = currentPageUrl.replace('/ajouterdepot', '/Depots');

    const tokenString = localStorage.getItem('token');
    const token = JSON.parse(tokenString);
    const dossierId = localStorage.getItem('dossierId')

    const [formData, setFormData] = useState({
        Libelle: '',
        CodeDepot: null,
        Pays: '',
        Ville: '',
        CodePostal: '',
        Responsable: '',
        AdresseSecondaire: '',
        Telephone: '',
        Principal: false,
        dossierId: dossierId
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Vérifier si tous les champs obligatoires sont remplis
        const requiredFields = [ 'Libelle'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            toast.error(`Les champs suivants sont obligatoires : ${missingFields.join(', ')}`);
            return;
        }

        // Générer un mot de passe unique de 8 caractères
        console.log(formData)

        try {
            const response = await fetch('http://localhost:5000/api/depot/addDepot',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,// Ajout du token d'authentification dans le header
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...formData })
                });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message,' essayer une autre .. !');
                throw new Error('Erreur lors de l\'ajout du Dépot');
            }

            toast.success('Dépot ajouté avec succès !');

            setTimeout(() => {
                window.location.replace(newUrl);
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de la Ajout du Depot:', error.message);
            toast.error('Erreur lors de la Ajout du Depot');
        }
    };


    const countryOptions = Object.entries(countries).map(([countryCode, country]) => (
        <option key={countryCode} value={country.name}>{`${countryCode} - ${country.name}`}</option>
    ));


    return (
        <div>
            <div className='Revenir'>
                <a href={newUrl}><FontAwesomeIcon icon={faArrowLeft} size="xl" style={{ color: "#5856d6", }} /> Dépots </a>
            </div>
            <Form className='formulaire'>
                <h3>Ajouter un Dépot</h3>
                <br />
                <div className='BoxAjout'>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridRaisonsociale">
                            <Form.Label>Code Depot </Form.Label>
                            <Form.Control type="text" name='CodeDepot' onChange={handleChange} placeholder="Enter code Depot " required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPrenom">
                            <Form.Label>* Libelle</Form.Label>
                            <Form.Control type="text" name='Libelle' onChange={handleChange} placeholder="Enter libelle " />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridRaisonsociale">
                            <Form.Label> Responsable </Form.Label>
                            <Form.Control type="text" name='Responsable' onChange={handleChange} placeholder="Enter Responsable " required />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPrenom">
                            <Form.Label>Telephone</Form.Label>
                            <Form.Control type="number" name='Telephone' min='0' onChange={handleChange} placeholder="Enter Telephone " />
                        </Form.Group>
                    </Row>

                    <br />
                    <Row>
                        <Form.Group as={Col} controlId="formGridPays">
                            <Form.Label>Pays</Form.Label>
                            <Form.Select name='Pays' onChange={handleChange} >
                                <option value="">Choisissez un pays...</option>
                                {countryOptions}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridRaisonsociale">
                            <Form.Label> Ville  </Form.Label>
                            <Form.Control type="text" name='Ville' onChange={handleChange} placeholder="Enter Ville " required />
                        </Form.Group>
                    </Row>
                    <br />
                    <Row className='mb-3'>
                        <Form.Group as={Col} controlId="formGridRaisonsociale">
                            <Form.Label> Adresse Secondaire </Form.Label>
                            <Form.Control type="text" name='AdresseSecondaire' onChange={handleChange} placeholder="Enter Adresse Sec " required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGrid">
                            <Form.Label> Code Postal </Form.Label>
                            <Form.Control type="text" name='CodePostal' onChange={handleChange} placeholder="Enter Code postal " required />
                        </Form.Group>

                    </Row>
                    <Form.Group as={Col} controlId="formGridPrincipale">
                        <Form.Check
                            type="checkbox"
                            label="Principale"
                            name='Principal'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit" className='btnAjout' onClick={handleSubmit}>
                        Ajouter Dépot
                    </Button>
                </div>
            </Form>

        </div>
    )
}

export default AddDepot