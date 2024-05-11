import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function UpdateSecteur({ show, handleClose, secteur }) {
    const [formData, setFormData] = useState({
        Libelle: '',
        CodeSecteurGeo: ''
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

    };
    useEffect(() => {
        if (secteur) {
            setFormData({
                Libelle: secteur.Libelle || '',
                CodeSecteurGeo: secteur.CodeSecteurGeo || '',


            });
        }
    }, [secteur]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
            const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
            const response = await fetch(`http://localhost:5000/api/SecteurGeo/updateSecteurGeo/${secteur.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du secteur ');
            }

            toast.success('secteur mis à jour avec succès !');
            handleClose();
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du secteur:', error.message);
            toast.error('Erreur lors de la mise à jour du secteur');
        }
    };

    return (
        <>
            <div className='EditForm'>
                {secteur && (
                    <Modal show={show} onHide={handleClose}  >
                        <Modal.Header closeButton>
                            <Modal.Title>Secteur Geographique</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridPrenom">
                                        <Form.Label> code Secteur</Form.Label>
                                        <Form.Control type="text" name='Duree' onChange={handleChange} value={formData.CodeSecteurGeo} placeholder="Entrez la code" disabled required />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridRaisonsociale">
                                        <Form.Label>libelle </Form.Label>
                                        <Form.Control type="text" name='Libelle' onChange={handleChange} value={formData.Libelle}  placeholder="Enter code Marque " />
                                    </Form.Group>

                                </Row>
                                <br />
                                <br />
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
        </>
    );
}

export default UpdateSecteur;
