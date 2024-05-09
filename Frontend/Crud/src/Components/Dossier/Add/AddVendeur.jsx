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



function AddVendeur() {
    const currentPageUrl = window.location.pathname;
    const newUrl = currentPageUrl.replace('/ajoutervendeur', '');

    const tokenString = localStorage.getItem('token');
    const token = JSON.parse(tokenString);
    const dossierId = localStorage.getItem('dossierId')
    const [formData, setFormData] = useState({
        dossierId: dossierId,
        Nom: '',
        Email: '',
        Ville: '',
        CodePostal: '',
        Pays: '',
        Codevendeur: '',
        Telephone: '',
        status: '',

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
        const requiredFields = ['Nom', 'Email', 'Telephone'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            toast.error(`Les champs suivants sont obligatoires : ${missingFields.join(', ')}`);
            return;
        }

        // Générer un mot de passe unique de 8 caractères
        console.log(formData)

        try {
            const response = await fetch('http://localhost:5000/api/vendeur/Addvendeur', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,// Ajout du token d'authentification dans le header
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout du vendeur');
            }

            toast.success('vendeur ajouté avec succès !');

            setTimeout(() => {
                window.location.replace(newUrl);
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de la Ajout du vendeur:', error.message);
            toast.error('Erreur lors de la Ajout du vendeur');
        }
    };

    const countryOptions = Object.entries(countries).map(([countryCode, country]) => (
        <option key={countryCode} value={countryCode}>{`${countryCode} - ${country.name}`}</option>
    ));

    return (
        <>
            <div className='Revenir'>
                <a href={newUrl}><FontAwesomeIcon icon={faArrowLeft} size="xl" style={{ color: "#5856d6", }} /> Vendeurs  </a>
            </div>
            <Form className='formulaire'>
                <h3>Ajouter un Vendeur</h3>
                <br />
                <div className='BoxAjout'>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridNom">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control type="text" name='Nom' onChange={handleChange} placeholder="Enter Nom" required />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridNom">
                            <Form.Label>Code Vendeur</Form.Label>
                            <Form.Control type="text" name='Codevendeur' onChange={handleChange} placeholder="Enter Code vendeur" />
                        </Form.Group>
                    </Row>
                    <br />
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name='Email' onChange={handleChange} placeholder="Enter Email" required />
                        </Form.Group>
                    </Row>
                    <br />
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridTelephone">
                            <Form.Label>Telephone</Form.Label>
                            <Form.Control type="number" name='Telephone' onChange={handleChange} placeholder="Enter Telephone" required />
                        </Form.Group>
                    </Row>
                    
                    <br />

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridPays">
                            <Form.Label>Pays</Form.Label>
                            <Form.Select name='Pays' onChange={handleChange} value={formData.pays}>
                                <option value="">Choisissez un pays...</option>
                                {countryOptions}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridVille">
                            <Form.Label>Ville</Form.Label>
                            <Form.Control type="text" name='Ville' onChange={handleChange} placeholder="Enter Ville" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCodePostal">
                            <Form.Label>Code Postal</Form.Label>
                            <Form.Control type="text" name='C   odePostal' onChange={handleChange} placeholder="Enter Code Postal" />
                        </Form.Group>
                    </Row>
                    <br />


                    <Form.Group as={Col} controlId="formGridStatut">
                        <Form.Label>Statut</Form.Label>
                        <Form.Select name='status' onChange={handleChange} required>
                            <option value="">Sélectionnez un statut</option>
                            <option value="Actif">Actif</option>
                            <option value="Suspendu">Suspendu</option>
                            <option value="Inactif">Inactif</option>
                            <option value="Retraité">Retraité</option>
                        </Form.Select>
                    </Form.Group>

                    <br />

                   
                    <br />
                    <Button variant="primary" type="submit" className='btnAjout' onClick={handleSubmit}>
                        Ajouter vendeur
                    </Button>
                </div>
            </Form>
        </>
    );
}

export default AddVendeur;
