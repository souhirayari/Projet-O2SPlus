import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { toast } from 'react-toastify'; // Assurez-vous d'importer toast pour afficher les notifications

function AddDossier() {
    const [formData, setFormData] = useState({
        RaisonSociale: '',
        Email: '',
        MatriculeFiscale: '',
        Adresse: '',
        Ville: '',
        CodePostal: '',
        Telephone: '',
        Mobile: '',
        SiteWeb: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
      
        setFormData({
            ...formData,
            [name]: value
        });
    };
   
    const tokenString = localStorage.getItem('token');
    const token = JSON.parse(tokenString);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/dossier/AddDossier', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Ajout du token d'authentification dans le header
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout du dossier');
            }

            toast.success('Dossier ajouté avec succès !');

            setTimeout(() => {
                window.location.replace('/');
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de la Ajout du dossier:', error.message);
            toast.error('Erreur lors de la Ajout du dossier');
        }
    };

    return (
        <Form className='formulaire'>
            <h3>Ajouter un Dossier</h3>
            <br />
            <div className='BoxAjout'>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridRaisonsociale">
                        <Form.Label>Raison Sociale </Form.Label>
                        <Form.Control type="text" name='RaisonSociale' onChange={handleChange} placeholder="Enter Raison sociale" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridMatriculeFiscale">
                        <Form.Label>Matricule Fiscale</Form.Label>
                        <Form.Control type="text" name='MatriculeFiscale' onChange={handleChange} placeholder="Matricule Fiscale" />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='Email' name='Email' onChange={handleChange} placeholder="Enter Email " />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridTelephone">
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control type="text" name='Telephone' onChange={handleChange} placeholder="Enter Telephone" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridMobile">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="text" name='Mobile' onChange={handleChange} placeholder="Mobile" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridAdress">
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control name='Adresse' onChange={handleChange} placeholder='ex 1234 MainSt' />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridVille">
                        <Form.Label>ville</Form.Label>
                        <Form.Control name='Ville' onChange={handleChange} placeholder='ex Tunis' />

                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCodePostal">
                        <Form.Label>Code Postal</Form.Label>
                        <Form.Control name='CodePostal' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formGridZip">
                        <Form.Label>Site Web</Form.Label>
                        <Form.Control type="text" name='SiteWeb' onChange={handleChange} placeholder="http// ..." />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit" className='btnAjout' onClick={handleSubmit}>
                    Ajouter Dossier
                </Button>
            </div>
        </Form>
    );
}

export default AddDossier;
