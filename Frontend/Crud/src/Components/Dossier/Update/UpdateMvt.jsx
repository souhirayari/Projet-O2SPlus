import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

function UpdateMvt({ show, handleClose, Entete }) {
  const [Depots, setDepots] = useState([]);
  const [Fournisseurs, setFournisseurs] = useState([]);
  const dossierId = localStorage.getItem('dossierId');
  const tokenString = localStorage.getItem('token');
  const token = JSON.parse(tokenString);

  const [formData, setFormData] = useState({
    CodeEntete: '',
    Date: '',
    Type: '',
    fournisseurId: '',
    depotId: '',
  });

  useEffect(() => {
    if (Entete) {
      setFormData({
        CodeEntete: Entete.CodeEntete || '',
        Date: Entete.Date || '',
        Type: Entete.Type || '',
        fournisseurId: Entete.fournisseurId || '',
        depotId: Entete.depotId || '',
      });
    }
  }, [Entete]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [DepotsResponse, FournisseurResponse] = await Promise.all([
          fetch(`http://localhost:5000/api/depot/getAllDepotByDossier/${dossierId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }),
          fetch(`http://localhost:5000/api/article/findAllFournisseurByDosier/${dossierId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          })
        ]);

        if (!DepotsResponse.ok) {
          if (DepotsResponse.status === 404) {
            setDepots([]);
          } else {
            throw new Error('Erreur lors de la récupération des dépôts');
          }
        } else {
          const depotData = await DepotsResponse.json();
          setDepots(depotData);
        }

        if (!FournisseurResponse.ok) {
          if (FournisseurResponse.status === 404) {
            setFournisseurs([]);
          } else {
            throw new Error('Erreur lors de la récupération des fournisseurs');
          }
        } else {
          const fournisseurData = await FournisseurResponse.json();
          setFournisseurs(fournisseurData);
        }
      } catch (error) {
        console.error('Erreur fetchData:', error);
      }
    }
    fetchData();
  }, [dossierId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/enteteStock/updateEnteteStock/${Entete.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du Mvt');
      }

      toast.success('Mvt mis à jour avec succès !');
      handleClose();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du Mvt:', error.message);
      toast.error('Erreur lors de la mise à jour du Mvt');
    }
  };

  return (
    <div className='EditForm'>
      {Entete && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Mouvement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCodeArticle">
                  <Form.Label>Code MVT</Form.Label>
                  <Form.Control type="text" name='CodeEntete' onChange={handleChange} value={formData.CodeEntete} disabled />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridTypeModele">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" name='Date' onChange={handleChange} value={formData.Date} placeholder="Entrez la date" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridModele">
                  <Form.Label>Type</Form.Label>
                  <Form.Select name='Type' onChange={handleChange} value={formData.Type} required>
                    <option value="">Sélectionnez un type</option>
                    <option value="Entree">Entrée</option>
                    <option value="Sortie">Sortie</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridDepot">
                  <Form.Label>Dépôt</Form.Label>
                  <Form.Select name='depotId' onChange={handleChange} value={formData.depotId} required>
                    <option value="">Sélectionnez un dépôt</option>
                    {Depots.map((depot) => (
                      <option value={depot.id} key={depot.id}>{depot.Libelle}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridFournisseur">
                  <Form.Label>Fournisseur</Form.Label>
                  <Form.Select name='fournisseurId' onChange={handleChange} value={formData.fournisseurId} required>
                    <option value="">Sélectionnez un fournisseur</option>
                    {Fournisseurs.map((fournisseur) => (
                      <option value={fournisseur.idFournisseur} key={fournisseur.idFournisseur}>{fournisseur.nom}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>
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

export default UpdateMvt;
