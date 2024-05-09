import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { countries } from 'countries-list';
function UpdateVendeur({ show, handleClose, vendeur }) {
    console.log(vendeur)
    const [formData, setFormData] = useState({
        Nom: '',
        Email: '',
        Ville: '',
        CodePostal: '',
        Pays: '',
        CodeVendeur: '',
        Telephone: '',
        status: '',

    });

    useEffect(() => {
        if (vendeur) {
            setFormData({
                Nom: vendeur.Nom || '',
                Email: vendeur.Email || '',
                Ville: vendeur.Ville || '',
                CodePostal: vendeur.CodePostal || '',
                Pays: vendeur.Pays || '',
                CodeVendeur: vendeur.CodeVendeur || '',
                Telephone: vendeur.Telephone || '',
                status: vendeur.status || '',
            });
        }
    }, [vendeur]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tokenString = localStorage.getItem('token');
            const token = JSON.parse(tokenString);
            const response = await fetch(`http://localhost:5000/api/vendeur/update/${vendeur.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du fournisseur');
            }

            toast.success('Fournisseur mis à jour avec succès !');
            handleClose();
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du fournisseur:', error.message);
            toast.error('Erreur lors de la mise à jour du fournisseur');
        }
    };

    const countryOptions = Object.entries(countries).map(([countryCode, country]) => (
        <option key={countryCode} value={countryCode}>{`${countryCode} - ${country.name}`}</option>
    ));

    return (
        <div className='EditForm'>
            {vendeur && (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modifier vendeur</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridNom">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control type="text" name='Nom' onChange={handleChange} value={formData.Nom} placeholder="Enter Nom" required />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridNom">
                                    <Form.Label>Code Vendeur</Form.Label>
                                    <Form.Control type="text" name='CodeVendeur' onChange={handleChange} value={formData.CodeVendeur}  placeholder="Enter Code Vendeur" /> {/* Correction du nom du champ */}
                                </Form.Group>

                            </Row>
                            <br />
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name='Email' onChange={handleChange} value={formData.Email} placeholder="Enter Email" required />
                                </Form.Group>
                            </Row>
                            <br />
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridTelephone">
                                    <Form.Label>Telephone</Form.Label>
                                    <Form.Control type="number" name='Telephone' onChange={handleChange} value={formData.Telephone} placeholder="Enter Telephone" required />
                                </Form.Group>
                            </Row>

                            <br />

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridPays">
                                    <Form.Label>Pays</Form.Label>
                                    <Form.Select name='Pays' onChange={handleChange} value={formData.Pays}>
                                        <option value="">Choisissez un pays...</option>
                                        {countryOptions}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridVille">
                                    <Form.Label>Ville</Form.Label>
                                    <Form.Control type="text" name='Ville' onChange={handleChange} value={formData.Ville} placeholder="Enter Ville" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCodePostal">
                                    <Form.Label>Code Postal</Form.Label>
                                    <Form.Control type="text" name='C   odePostal' onChange={handleChange} value={formData.CodePostal} placeholder="Enter Code Postal" />
                                </Form.Group>
                            </Row>
                            <br />


                            <Form.Group as={Col} controlId="formGridStatut">
                                <Form.Label>Status</Form.Label>
                                <Form.Select name='status' onChange={handleChange} value={formData.status} required>
                                    <option value="">Sélectionnez un statut</option>
                                    <option value="Actif">Actif</option>
                                    <option value="Suspendu">Suspendu</option>
                                    <option value="Inactif">Inactif</option>
                                    <option value="Retraité">Retraité</option>
                                </Form.Select>
                            </Form.Group>

                            <br />
                            <Button variant="secondary" onClick={handleClose}>
                                Fermer
                            </Button>
                            <Button variant="primary" type="submit">
                                Enregistrer les modifications
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
}

export default UpdateVendeur;
