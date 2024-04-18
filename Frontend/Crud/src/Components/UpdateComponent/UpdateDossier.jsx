import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

function UpdateDossier({ show, handleClose, dossier }) {
    const [formData, setFormData] = useState({
        RaisonSociale: '',
        Email: '',
        MatriculeFiscale: '',
        Adresse: '',
        Ville: '',
        CodePostal: '',
        Telephone: '',
        Mobile: '',
        SiteWeb: '',
        statut: ''
    });

    useEffect(() => {
        if (dossier) {
            setFormData({
                RaisonSociale: dossier.RaisonSociale || '',
                Email: dossier.Email || '',
                MatriculeFiscale: dossier.MatriculeFiscale || '',
                Adresse: dossier.Adresse || '',
                Ville: dossier.Ville || '',
                CodePostal: dossier.CodePostal || '',
                Telephone: dossier.Telephone || '',
                Mobile: dossier.Mobile || '',
                SiteWeb: dossier.SiteWeb || '',
               
            });
        }
    }, [dossier]);
    useEffect(() => {
        if (dossier && dossier.licence.length > 0) {
            const latestLicence = dossier.licence[0]; // Obtenir la dernière licence
            setFormData(prevState => ({
                ...prevState,
                statut: latestLicence.statut || '' // Mettre à jour le statut dans le formulaire
            }));
        }
    }, [dossier]);
    
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
            const response = await fetch(`http://localhost:3000/api/dossier/update/${dossier.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du dossier');
            }
    
            // Mise à jour du statut dans la première licence
            if (dossier.licence && dossier.licence.length > 0) {
                const firstLicenceId = dossier.licence[0].idLicence;
                const licenceUpdateResponse = await fetch(`http://localhost:3000/api/licence/update/${firstLicenceId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ statut: formData.statut })
                });
    
                if (!licenceUpdateResponse.ok) {
                    throw new Error('Erreur lors de la mise à jour de la licence');
                }
            }
    
            toast.success('Dossier et licence mis à jour avec succès !');
            handleClose();
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error.message);
            toast.error('Erreur lors de la mise à jour');
        }
    };
    

    return (
        <div>
            {dossier && (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{dossier.RaisonSociale}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="raisonSociale">
                                <Form.Label>Raison Sociale</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="RaisonSociale"
                                    value={formData.RaisonSociale}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="Email"
                                    value={formData.Email}
                                    onChange={handleChange}
                                    
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="matriculeFiscale">
                                <Form.Label>Matricule fiscale</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="MatriculeFiscale"
                                    value={formData.MatriculeFiscale}
                                    onChange={handleChange}
                                    
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="adresse">
                                <Form.Label>Adresse</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Adresse"
                                    value={formData.Adresse}
                                    onChange={handleChange}
                                    
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="ville">
                                <Form.Label>Ville</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Ville"
                                    value={formData.Ville}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="codePostal">
                                <Form.Label>Code Postal</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="CodePostal"
                                    value={formData.CodePostal}
                                    onChange={handleChange}
                                    
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="telephone">
                                <Form.Label>Téléphone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Telephone"
                                    value={formData.Telephone}
                                    onChange={handleChange}
                                    
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="mobile">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Mobile"
                                    value={formData.Mobile}
                                    onChange={handleChange}
                                    
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="siteWeb">
                                <Form.Label>Site Web</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="SiteWeb"
                                    value={formData.SiteWeb}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="statut">
                                <Form.Label>Statut</Form.Label>
                                <Form.Select name="statut" value={formData.statut} onChange={handleChange}>
                                    <option value="Actif">Actif</option>
                                    <option value="Inactif">Inactif</option>
                                </Form.Select>
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

export default UpdateDossier;
