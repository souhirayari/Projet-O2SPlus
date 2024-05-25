import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { countries } from 'countries-list';

function UpdateDepot({ show, handleClose, Depot }) {

    const tokenString = localStorage.getItem('token');
    const token = JSON.parse(tokenString);
    const [formData, setFormData] = useState({
        Libelle: '',
        CodeDepot: null,
        Pays: '',
        Ville: '',
        CodePostal: '',
        Responsable: '',
        AdresseSecondaire: '',
        Telephone: '',
        Principal: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };



    useEffect(() => {
        if (Depot) {
            setFormData({
                CodeDepot: Depot.CodeDepot || '',
                Libelle: Depot.Libelle || '',
                Pays: Depot.Pays || '',
                Ville: Depot.Ville || '',
                AdresseSecondaire: Depot.AdresseSecondaire || '',
                CodePostal: Depot.CodePostal || '',
                Responsable: Depot.Responsable || '',
                Telephone: Depot.Telephone || '',
                Principale: Depot.Principale || '',
            });
        }
    }, [Depot]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
            const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
            const response = await fetch(`http://localhost:5000/api/depot/updateDepot/${Depot.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message, ' essayer une autre .. !');
                throw new Error('Erreur lors de la mise à jour du Depot ');
            }

            toast.success('Dépot mis à jour avec succès !');
            handleClose();
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du Dépot:', error.message);
            toast.error('Erreur lors de la mise à jour du Dépot');
        }
    };

    const countryOptions = Object.entries(countries).map(([countryCode, country]) => (
        <option key={countryCode} value={country.name}>{`${countryCode} - ${country.name}`}</option>
    ));
    return (
        <>
            <div className='EditForm'>
                {Depot && (
                    <Modal show={show} onHide={handleClose}  >
                        <Modal.Header closeButton>
                            <Modal.Title>Dépot</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridRaisonsociale">
                                        <Form.Label>Code Depot </Form.Label>
                                        <Form.Control type="text" name='CodeDepot' onChange={handleChange} value={formData.CodeDepot} placeholder="Enter code Depot " required disabled/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridPrenom">
                                        <Form.Label>* Libelle</Form.Label>
                                        <Form.Control type="text" name='Libelle' onChange={handleChange} value={formData.Libelle} placeholder="Enter libelle " />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridRaisonsociale">
                                        <Form.Label> Responsable </Form.Label>
                                        <Form.Control type="text" name='Responsable' onChange={handleChange} value={formData.Responsable} placeholder="Enter Responsable " required />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPrenom">
                                        <Form.Label>Telephone</Form.Label>
                                        <Form.Control type="number" name='Telephone' min='0' onChange={handleChange} value={formData.Telephone} placeholder="Enter Telephone " />
                                    </Form.Group>
                                </Row>

                                <br />
                                <Row>
                                    <Form.Group as={Col} controlId="formGridPays">
                                        <Form.Label>Pays</Form.Label>
                                        <Form.Select name='Pays' onChange={handleChange} value={formData.Pays} >
                                            <option value="">Choisissez un pays...</option>
                                            {countryOptions}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridRaisonsociale">
                                        <Form.Label> Ville  </Form.Label>
                                        <Form.Control type="text" name='Ville' onChange={handleChange} value={formData.ville} placeholder="Enter Ville " required />
                                    </Form.Group>
                                </Row>
                                <br />
                                <Row className='mb-3'>
                                    <Form.Group as={Col} controlId="formGridRaisonsociale">
                                        <Form.Label> Adresse Secondaire </Form.Label>
                                        <Form.Control type="text" name='AdresseSecondaire' onChange={handleChange} value={formData.AdresseSecondaire} placeholder="Enter Adresse Sec " required />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGrid">
                                        <Form.Label> Code Postal </Form.Label>
                                        <Form.Control type="text" name='CodePostal' onChange={handleChange} value={formData.CodePostal} placeholder="Enter Code postal " required />
                                    </Form.Group>

                                </Row>
                                <Form.Group as={Col} controlId="formGridPrincipale">
                                    <Form.Check
                                        type="checkbox"
                                        label="Principale"
                                        name='Principal'
                                        onChange={handleChange}
                                        value={formData.Principal}
                                    />
                                </Form.Group>
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

export default UpdateDepot;
