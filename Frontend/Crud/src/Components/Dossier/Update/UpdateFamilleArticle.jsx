import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function UpdateFamilleArticle({ show, handleClose, famille }) {
    const [formData, setFormData] = useState({
        codefamille: '',
        libelle: '',
        coefficient: '',
        valorisation: '',

    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

    };
    useEffect(() => {
        if (famille) {
            setFormData({
                codefamille: famille.codefamille || '',
                libelle: famille.libelle || '',
                valorisation: famille.valorisation || '',
                coefficient: famille.coefficient || ''
            });
        }
    }, [famille]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
            const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
            const response = await fetch(`http://localhost:5000/api/article/updateFamille/${famille.idFamArt}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du Famille Article ');
            }

            toast.success('Famille Article mis à jour avec succès !');
            handleClose();
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du Famille Article:', error.message);
            toast.error('Erreur lors de la mise à jour du Famille Article');
        }
    };

    return (
        <>
            <div className='EditForm'>
                {famille && (
                    <Modal show={show} onHide={handleClose}  >
                        <Modal.Header closeButton>
                            <Modal.Title>Famille Article</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridRaisonsociale">
                                        <Form.Label>* Code Famille Article </Form.Label>
                                        <Form.Control type="text" name='codefamille' onChange={handleChange} value={formData.codefamille} placeholder="Enter code famille " required />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridPrenom">
                                        <Form.Label>* Libelle</Form.Label>
                                        <Form.Control type="text" name='libelle' onChange={handleChange} value={formData.libelle} placeholder="Enter libelle " />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridNom">
                                        <Form.Label>* Valorisation </Form.Label>
                                        <Form.Select name='valorisation' onChange={handleChange} value={formData.valorisation}>
                                            <option value="">Sélectionnez un valorisation </option>
                                            <option value="P">PEMP</option>
                                            <option value="D">Der Pa</option>

                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridNom">
                                        <Form.Label>* Coefficient</Form.Label>
                                        <Form.Control type="number" name='coefficient' value={formData.coefficient} onChange={handleChange} placeholder="Enter coefficient " />
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

export default UpdateFamilleArticle;
