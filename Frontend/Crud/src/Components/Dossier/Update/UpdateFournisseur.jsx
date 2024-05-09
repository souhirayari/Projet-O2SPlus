import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { countries } from 'countries-list';

function UpdateFournisseur({ show, handleClose, fournisseur }) {
    const [formData, setFormData] = useState({
        codeFourniseur: '',
        genre: '',
        nom: '',
        prenom: '',
        Adresse: '',
        CodePostal: '',
        Ville: '',
        Telephone: '',
        Mobile: '',
        Pays: '',
        Email: '',
        SiteWeb: '',
        delais: ''
    });

    useEffect(() => {
        if (fournisseur) {
            setFormData({
                codeFourniseur: fournisseur.codeFourniseur || '',
                genre: fournisseur.genre || '',
                nom: fournisseur.nom || '',
                Adresse: fournisseur.Adresse || '',
                CodePostal: fournisseur.CodePostal || '',
                Ville: fournisseur.Ville || '',
                Telephone: fournisseur.Telephone || '',
                Mobile: fournisseur.Mobile || '',
                Pays: fournisseur.Pays || '',
                Email: fournisseur.Email || '',
                SiteWeb: fournisseur.SiteWeb || '',
                delais: fournisseur.delais || ''
            });
        }
    }, [fournisseur]);

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
            const response = await fetch(`http://localhost:5000/api/article/updateFournisseur/${fournisseur.idFournisseur}`, {
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
            {fournisseur && (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modifier Fournisseur</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridNom">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control type="text" name='nom' onChange={handleChange} value={formData.nom} placeholder="Enter Nom" required />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridNom">
                                    <Form.Label>Prénom</Form.Label>
                                    <Form.Control type="text" name='prenom' onChange={handleChange} value={formData.prenom} placeholder="Enter Prenom" required />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCodeFourniseur">
                                    <Form.Label>Code Fournisseur</Form.Label>
                                    <Form.Control type="text" name='codeFourniseur' onChange={handleChange} value={formData.codeFourniseur} placeholder="Enter Code Fournisseur" required />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridGenre">
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Select name='genre' onChange={handleChange} value={formData.genre}>
                                        <option value="">Sélectionnez un genre</option>
                                        <option value="Madame">Madame</option>
                                        <option value="Monsieur">Monsieur</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name='Email' onChange={handleChange} value={formData.Email} placeholder="Enter Email" required />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridTelephone">
                                    <Form.Label>Téléphone</Form.Label>
                                    <Form.Control type="text" name='Telephone' onChange={handleChange} value={formData.Telephone} placeholder="Enter Téléphone" required />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridMobile">
                                    <Form.Label>Mobile</Form.Label>
                                    <Form.Control type="text" name='Mobile' onChange={handleChange} value={formData.Mobile} placeholder="Enter Mobile" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridTelephone">
                                    <Form.Label>SiteWeb</Form.Label>
                                    <Form.Control type="text" name='SiteWeb' onChange={handleChange} value={formData.SiteWeb} placeholder="Enter Site" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridMobile">
                                    <Form.Label>Delais</Form.Label>
                                    <Form.Control type="number" name='delais' onChange={handleChange} value={formData.delais} placeholder="Enter Delais" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridPays">
                                    <Form.Label>Pays</Form.Label>
                                    <Form.Select name='Pays' onChange={handleChange} value={formData.Pays}>
                                        <option value="">Choisissez un pays...</option>
                                        {countryOptions}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAdresse">
                                    <Form.Label>Adresse</Form.Label>
                                    <Form.Control type="text" name='Adresse' onChange={handleChange} value={formData.Adresse} placeholder="Enter Adresse" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridVille">
                                    <Form.Label>Ville</Form.Label>
                                    <Form.Control type="text" name='Ville' onChange={handleChange} value={formData.Ville} placeholder="Enter Ville" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCodePostal">
                                    <Form.Label>Code Postal</Form.Label>
                                    <Form.Control type="text" name='CodePostal' onChange={handleChange} value={formData.CodePostal} placeholder="Enter Code Postal" />
                                </Form.Group>
                            </Row>
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

export default UpdateFournisseur;
