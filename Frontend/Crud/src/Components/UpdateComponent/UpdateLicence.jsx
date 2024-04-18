import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

function UpdateLicence({ show, handleClose, licence }) {
    const [formData, setFormData] = useState({
        Datevalidation: '',
        DateDebut: '',
        DateFin: '',
        nombreUser: '',
        nombreTech: '',
        nombreclient: '',
        nombreArticle: '',
        statut: '',

    });

    useEffect(() => {
        if (licence) {
            setFormData({
                Datevalidation: licence.Datevalidation || '',
                DateDebut: licence.DateDebut || '',
                DateFin: licence.DateFin || '',
                nombreUser: licence.nombreUser || '',
                nombreTech: licence.nombreTech || '',
                nombreArticle: licence.nombreArticle || '',
                nombreclient: licence.nombreclient || '',
                statut: licence.statut || '',
            });
        }
    }, [licence]);

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
            const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
            const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
            const response = await fetch(`http://localhost:3000/api/licence/update/${licence.idLicence}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du licence');
            }

            toast.success('licence mis à jour avec succès !');
            handleClose();
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du licence:', error.message);
            toast.error('Erreur lors de la mise à jour du licence');
        }
    };

    return (
        <div>
            {licence && (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Licence</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="raisonSociale">
                                <Form.Label>Date validation</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Datevalidation"
                                    value={formData.Datevalidation}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Date Debut</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dateDebut"
                                    value={formData.DateDebut}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="matriculeFiscale">
                                <Form.Label>Date Fin</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="DateFin"
                                    value={formData.DateFin}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="adresse">
                                <Form.Label>nombre User</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="nombreUser"
                                    value={formData.nombreUser}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="ville">
                                <Form.Label>nombre Technicien</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="nombreTech"
                                    value={formData.nombreTech}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="codePostal">
                                <Form.Label>nombres Articles</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="nombreArticle"
                                    value={formData.nombreArticle}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="telephone">
                                <Form.Label>nombres clients</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="nombreClient"
                                    value={formData.nombreclient}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="statut">
                                <Form.Label>Statut</Form.Label>
                                <Form.Control
                                    as="select" // Utilisation de "select" pour rendre le champ comme une liste déroulante
                                    name="statut"
                                    value={formData.statut}
                                    onChange={handleChange}
                                    autoFocus
                                >
                                    <option value="Actif">Actif</option> {/* Option pour le statut actif */}
                                    <option value="Inactif">Inactif</option> {/* Option pour le statut inactif */}
                                </Form.Control>
                            </Form.Group>


                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fermer
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Enregistrer les modifications
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default UpdateLicence;
