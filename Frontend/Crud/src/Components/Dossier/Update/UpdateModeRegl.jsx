import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function UpdateModeRegl({ show, handleClose, mode }) {
  const [formData, setFormData] = useState({
    codeReg: '',
    libelle: '',
    pourcentage: '',
    TypePaiment: '',
    Mois: '',
    nbj: '',
    modePaiment: '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

  };
  useEffect(() => {
    if (mode) {
      setFormData({
        codeReg: mode.codeReg || '',
        libelle: mode.libelle || '',
        pourcentage: mode.pourcentage || '',
        TypePaiment: mode.TypePaiment || '',
        Mois: mode.Mois || '',
        nbj: mode.nbj || '',
        modePaiment: mode.modePaiment || '',
      });
    }
  }, [mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
      const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
      const response = await fetch(`http://localhost:5000/api/article/updateModeRegl/${mode.idReg}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du Mode Réglemnent ');
      }

      toast.success('Mode Réglemnent mis à jour avec succès !');
      handleClose();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du Mode Réglemnent:', error.message);
      toast.error('Erreur lors de la mise à jour du Mode Réglemnent');
    }
  };

  return (
    <>
      <div className='EditForm'>
        {mode && (
          <Modal show={show} onHide={handleClose}  >
            <Modal.Header closeButton>
              <Modal.Title>Mode Réglement</Modal.Title>
            </Modal.Header>
            <Modal.Body >
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridRaisonsociale">
                    <Form.Label>Code Mode Réglement </Form.Label>
                    <Form.Control type="text" name='codeReg' onChange={handleChange} value={formData.codeReg} disabled placeholder="Enter code reglement " required />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridPrenom">
                    <Form.Label>Libelle</Form.Label>
                    <Form.Control type="text" name='libelle' onChange={handleChange} value={formData.libelle} placeholder="Enter libelle " />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridRaisonsociale">
                    <Form.Label> Mois </Form.Label>
                    <Form.Control type="number" name='Mois' min='0' onChange={handleChange} value={formData.Mois} placeholder="Enter number de Mois " required />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPrenom">
                    <Form.Label>Nombre de Jours</Form.Label>
                    <Form.Control type="number" name='nbj' min='0' onChange={handleChange} value={formData.nbj} placeholder="Enter number du jours " />
                  </Form.Group>
                </Row>
                <Form.Group as={Col} controlId="formGridRaisonsociale">
                  <Form.Label> Pourcentage </Form.Label>
                  <Form.Control type="number" name='pourcentage' onChange={handleChange} value={formData.pourcentage} placeholder="Enter code reglement " required />
                </Form.Group>
                <br />
                <Row>
                  <Form.Group as={Col} controlId="formGridNom">
                    <Form.Label>Type Paiment</Form.Label>
                    <Form.Select name='TypePaiment' onChange={handleChange} value={formData.TypePaiment}>
                      <option value="">Sélectionnez un Type Paiment </option>
                      <option value="comptant">comptant</option>
                      <option value="Net">Net</option>
                      <option value="Fin Mois">Fin Mois</option>
                      <option value="Fin Décade">Fin Décade</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridNom">
                    <Form.Label>Mode Paiement</Form.Label>
                    <Form.Select name='modePaiment' onChange={handleChange} value={formData.modePaiment}>
                      <option value="">Sélectionnez un mode Paiment</option>
                      <option value="chèque">chèque</option>
                      <option value="virement">virement</option>
                      <option value="carte bancaire">carte bancaire</option>
                      <option value="espèces">espèces</option>
                      <option value="prélevement">prélevement</option>
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

export default UpdateModeRegl;
