import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function UpdateZoneInter({ show, handleClose, zone }) {
    const [formData, setFormData] = useState({
        Libelle: '',
        Duree: '',
        Note: '',
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

    };
    useEffect(() => {
        if (zone) {
            setFormData({
                Libelle: zone.Libelle || '',
                Duree: zone.Duree || '',
                Note: zone.Note || '',

            });
        }
    }, [zone]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
            const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
            const response = await fetch(`http://localhost:5000/api/zoneintervention/updateZoneIntervention/${zone.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du zone ');
            }

            toast.success('zone mis à jour avec succès !');
            handleClose();
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du zone:', error.message);
            toast.error('Erreur lors de la mise à jour du zone');
        }
    };

    return (
        <>
            <div className='EditForm'>
                {zone && (
                    <Modal show={show} onHide={handleClose}  >
                        <Modal.Header closeButton>
                            <Modal.Title>Zone Intervention</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridRaisonsociale">
                                        <Form.Label>libelle </Form.Label>
                                        <Form.Control type="text" name='Libelle' onChange={handleChange} value={formData.Libelle} disabled placeholder="Enter code Marque " />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridPrenom">
                                        <Form.Label> Durée</Form.Label>
                                        <Form.Control type="text" name='Duree' onChange={handleChange} placeholder="Entrez la durée de l'intervention (ex: 20 min, 1h)" required />
                                    </Form.Group>
                                </Row>
                                <Form.Group as={Col} controlId="formGridRaisonsociale">
                                    <Form.Label>Notes</Form.Label>
                                    <Form.Control as="textarea" name='Note' rows={3} onChange={handleChange} placeholder='Enter Note' />
                                </Form.Group>
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

export default UpdateZoneInter;
