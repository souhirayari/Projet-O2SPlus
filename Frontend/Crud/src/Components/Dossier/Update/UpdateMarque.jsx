import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function UpdateMarque({ show, handleClose, marque }) {
    const [formData, setFormData] = useState({
        codeMarque: '',
        libelle: '',
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

    };
    useEffect(() => {
        if (marque) {
            setFormData({
                codeReg: marque.codeReg || '',
                libelle: marque.libelle || '',

            });
        }
    }, [marque]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
            const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
            const response = await fetch(`http://localhost:5000/api/article/updateMarque/${marque.idMarque}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du Marque ');
            }

            toast.success('Marque mis à jour avec succès !');
            handleClose();
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du Marque:', error.message);
            toast.error('Erreur lors de la mise à jour du Marque');
        }
    };

    return (
        <>
            <div className='EditForm'>
                {marque && (
                    <Modal show={show} onHide={handleClose}  >
                        <Modal.Header closeButton>
                            <Modal.Title>Marque</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridRaisonsociale">
                                        <Form.Label>Code Marque </Form.Label>
                                        <Form.Control type="text" name='codeMarque' onChange={handleChange} value={formData.codeMarque} disabled placeholder="Enter code Marque " />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridPrenom">
                                        <Form.Label> Libelle</Form.Label>
                                        <Form.Control type="text" name='libelle' onChange={handleChange} value={formData.libelle} placeholder="Enter libelle " />
                                    </Form.Group>
                                </Row>
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

export default UpdateMarque;
