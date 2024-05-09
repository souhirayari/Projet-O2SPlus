import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function UpdateTypeTarif({ show, handleClose, typeTarif }) {
    const dossierId = localStorage.getItem('dossierId')
    console.log(typeTarif)
    const [formData, setFormData] = useState({
        libelle: '',
        codeTypeTarif: '',
        type: ''
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

    };
    useEffect(() => {
        if (typeTarif) {
            setFormData({
                libelle: typeTarif.libelle || '',
                codeTypeTarif: typeTarif.codeTypeTarif || '',
                type: typeTarif.type || ''
            });
        }
    }, [typeTarif]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
            const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
            const response = await fetch(`http://localhost:5000/api/article/updateTypeTarif/${typeTarif.idTypetarif}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du type tarif ');
            }

            toast.success('type tarif mis à jour avec succès !');
            handleClose();
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du type tarif:', error.message);
            toast.error('Erreur lors de la mise à jour du type tarif');
        }
    };



    return (
        <>
            <div className='EditForm'>
                {typeTarif && (
                    <Modal show={show} onHide={handleClose}  >
                        <Modal.Header closeButton>
                            <Modal.Title>Technicien</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridRaisonsociale">
                                        <Form.Label> Code Type Tarif </Form.Label>
                                        <Form.Control type="text" name='codeTypeTarif' onChange={handleChange} value={formData.codeTypeTarif} placeholder="Enter code " disabled required />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridPrenom">
                                        <Form.Label>Libelle</Form.Label>
                                        <Form.Control type="text" name='libelle' onChange={handleChange} value={formData.libelle} placeholder="Enter libelle " />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridNom">
                                        <Form.Label>Type</Form.Label>
                                        <Form.Select name='type' onChange={handleChange} value={formData.type} >
                                            <option value="">Sélectionnez un sexe</option>
                                            <option value="Tarif HT">Tarif HT</option>
                                            <option value="Tarif TTC">Tarif TTC</option>
                                        </Form.Select>
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

export default UpdateTypeTarif;
