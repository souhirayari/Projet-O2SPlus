import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';


function UpdateFamilleClient({ show, handleClose, famille }) {
  const dossierId = localStorage.getItem('dossierId'); // Suppose que vous stockez le token dans le localStorage
  const tokenString = localStorage.getItem('token');
  const token = JSON.parse(tokenString);
  const [Tarifs, setTarif] = useState([])
  const [Modes, setMode] = useState([])
  const [Vendeurs, setvendeur] = useState([])


  const [formData, setFormData] = useState({
    CodeFamilleClient: '',
    Libelle: '',
    modeReglementId: '',
    typeTarifId: '',
    vendeurId: ''

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
        CodeFamilleClient: famille.CodeFamilleClient || '',
        Libelle: famille.Libelle || '',
        modeReglementId: famille.modeReglement.idReg || '',
        typeTarifId: famille.typeTarif.idTypetarif || '',
        vendeurId: famille.vendeur.id || '',
      });
    }

    async function fetchData() {
      try {
        // Utilisation de Promise.all pour attendre que les deux requêtes soient terminées
        const [TarifResponse, ModeResponse, VendeurResponse] = await Promise.all([
          fetch(`http://localhost:5000/api/article/findAllTypeTarifbyDossier/${dossierId}`, {
            headers: {
              'authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
            }
          }),
          fetch(`http://localhost:5000/api/article/findAllModeRegl/${dossierId}`, {
            headers: {
              'authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
            }
          }),
          fetch(`http://localhost:5000/api/vendeur/getAllVendeurByDossier/${dossierId}`, {
            headers: {
              'authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
            }
          })
        ]);
        // Vérification de la réponse pour la famille
        if (!TarifResponse.ok) {
          if (TarifResponse.status === 404) {
            setTarif([]);
          } else {
            toast.error('Erreur lors de la récupération des Type tarif')
            throw new Error('Erreur lors de la récupération des Type tarif');
          }
        } else {
          const TarifData = await TarifResponse.json();
          setTarif(TarifData);
        }

        // Vérification de la réponse pour la marque
        if (!ModeResponse.ok) {
          if (ModeResponse.status === 404) {
            setMode([]);
          } else {
            toast.error('Erreur lors de la récupération des Mode Réglement')
            throw new Error('Erreur lors de la récupération des mode réglemnt');
          }
        } else {
          const ModeData = await ModeResponse.json();
          setMode(ModeData);
        }
        // Vérification de la réponse pour la marque
        if (!VendeurResponse.ok) {
          if (VendeurResponse.status === 404) {
            setvendeur([]);
          } else {
            toast.error('Erreur lors de la récupération des Vendeurs')
            throw new Error('Erreur lors de la récupération des vendeurs');
          }
        } else {
          const VendeurData = await VendeurResponse.json();
          setvendeur(VendeurData);
        }
      } catch (error) {
        toast.error('Erreur lors de la récupération de données')
        console.error('Erreur fetchData:', error);
      }
    }
    fetchData();
  }, [famille]); // Add famille as a dependency

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
      const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
      const response = await fetch(`http://localhost:5000/api/familleClient/updateFamilleClient/${famille.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du famille cleint');
      }

      toast.success('famille client mis à jour avec succès !');
      handleClose();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du famille client:', error.message);
      toast.error('Erreur lors de la mise à jour du famille client');
    }
  };


  return (
    <div className='EditForm'>
      {famille && (
        <Modal show={show} onHide={handleClose}  >
          <Modal.Header closeButton>
            <Modal.Title>Famille Client</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridRaisonsociale">
                  <Form.Label>* Code Famille Client </Form.Label>
                  <Form.Control type="text" name='CodeFamilleClient' onChange={handleChange} value={formData.CodeFamilleClient} placeholder="Enter Code Famille Client " disabled required />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPrenom">
                  <Form.Label>* Libelle</Form.Label>
                  <Form.Control type="text" name='Libelle' onChange={handleChange} value={formData.Libelle} placeholder="Enter libelle " />
                </Form.Group>
              </Row>
              <br />
              <Row >
                <Form.Group as={Col} controlId="formGridRaisonsociale">
                  <Form.Label>* Type Tarif </Form.Label>
                  <Form.Select name='typeTarifId' onChange={handleChange} value={formData.typeTarifId} required>
                    <option value="">Sélectionnez une Type Tarif</option>
                    {Tarifs && (Tarifs.map((tarif) => (
                      <option key={tarif.idTypetarif} value={tarif.idTypetarif}>{tarif.libelle}</option>
                    )))}
                  </Form.Select>                        </Form.Group>
                <Form.Group as={Col} controlId="formGridPrenom">
                  <Form.Label>* Mode Réglement</Form.Label>
                  <Form.Select name='modeReglementId' onChange={handleChange} value={formData.modeReglementId} required>
                    <option value="">Sélectionnez un Mode Réglement</option>
                    {Modes && (Modes.map((mode) => (
                      <option key={mode.idReg} value={mode.idReg}>{mode.libelle}</option>
                    )))}
                  </Form.Select>
                </Form.Group>
              </Row>
              <br />
              <Form.Group as={Col} controlId="formGridPrenom">
                <Form.Label>* Vendeur</Form.Label>
                <Form.Select name='vendeurId' onChange={handleChange} value={formData.vendeurId} required>
                  <option value="">Sélectionnez un Vendeur </option>
                  {Vendeurs && (Vendeurs.map((vendeur) => (
                    <option key={vendeur.id} value={vendeur.id}>{vendeur.Nom}</option>
                  )))}
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

export default UpdateFamilleClient;
