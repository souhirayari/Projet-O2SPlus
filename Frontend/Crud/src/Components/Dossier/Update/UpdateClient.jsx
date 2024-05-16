import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { countries } from 'countries-list';


function UpdateClient({ show, handleClose, client }) {
  const tokenString = localStorage.getItem('token');
  const token = JSON.parse(tokenString);
  const dossierId = localStorage.getItem('dossierId');
  const [Tarif, setTarif] = useState([]);
  const [Mode, setMode] = useState([]);
  const [Vendeur, setVendeur] = useState([]);
  const [Famille, setFamille] = useState([]);
  const [Secteur, setSecteur] = useState([]);

  const [formData, setFormData] = useState({
    Nom: '',
    Civilite: '',
    Login: '',
    Email: '',
    telephone: '',
    pays: '',
    adresse: '',
    ville: '',
    familleClientId: '',
    secteurGeoId: '',
    typeTarifId: '',
    modeReglementId: '',
    vendeurId: '',
  });



  useEffect(() => {
    if (client) {
      setFormData({
        CodeClient: client.CodeClient,
        Nom: client.Nom || '',
        Civilite: client.Civilite || '',
        Login: client.Login || '',
        Email: client.Email || '',
        telephone: client.telephone || '',
        pays: client.pays || '',
        adresse: client.adresse || '',
        ville: client.ville || '',
        familleClientId: client.familleClientId || '',
        secteurGeoId: client.secteurGeoId || '',
        typeTarifId: client.idTypetarif || '',
        modeReglementId: client.idReg || '',
        vendeurId: client.vendeurId || '',
      });
    }
  }, [client]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [TarifResponse, ModeResponse, VendeurResponse, FamilleResponse, SecteurResponse] = await Promise.all([
          fetch(`http://localhost:5000/api/article/findAllTypeTarifbyDossier/${dossierId}`, {
            headers: {
              'authorization': `Bearer ${token}`
            }
          }),
          fetch(`http://localhost:5000/api/article/findAllModeRegl/${dossierId}`, {
            headers: {
              'authorization': `Bearer ${token}`
            }
          }),
          fetch(`http://localhost:5000/api/vendeur/getAllVendeurByDossier/${dossierId}`, {
            headers: {
              'authorization': `Bearer ${token}`
            }
          }),
          fetch(`http://localhost:5000/api/familleClient/getFamilleClientByDossier/${dossierId}`, {
            headers: {
              'authorization': `Bearer ${token}`
            }
          }),
          fetch(`http://localhost:5000/api/secteurGeo/getAllSecteurGeoByDossier/${dossierId}`, {
            headers: {
              'authorization': `Bearer ${token}`
            }
          })
        ]);
        const responses = await Promise.all([
          TarifResponse.json(),
          ModeResponse.json(),
          VendeurResponse.json(),
          FamilleResponse.json(),
          SecteurResponse.json()
        ]);
        setTarif(responses[0]);
        setMode(responses[1]);
        setVendeur(responses[2]);
        setFamille(responses[3]);
        setSecteur(responses[4]);
      } catch (error) {
        console.error('Erreur fetchData:', error);
        toast.error('Erreur lors de la récupération de données');
      }
    }
    fetchData();
  }, [dossierId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleFamilleChange = (e) => {
    const familleId = parseInt(e.target.value);
    setFormData({
      ...formData,
      familleClientId: familleId
    });

    const famille = Famille.find((f) => f.id === familleId);
    if (famille) {
      setFormData({
        ...formData,
        familleClientId: familleId,
        typeTarifId: famille.idTypetarif,
        modeReglementId: famille.idReg,
        vendeurId: famille.vendeurId
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
      const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
      const response = await fetch(`http://localhost:5000/api/client/updateClient/${client.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du client');
      }

      toast.success('client mis à jour avec succès !');
      handleClose();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du client:', error.message);
      toast.error('Erreur lors de la mise à jour du client');
    }
  };

  const countryOptions = Object.entries(countries).map(([countryCode, country]) => (
    <option key={countryCode} value={countryCode}>{`${countryCode} - ${country.name}`}</option>
  ));
  return (
    <div className='EditForm'>
      {client && (
        <Modal show={show} onHide={handleClose}  >
          <Modal.Header closeButton>
            <Modal.Title>Client</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridRaisonsociale">
                  <Form.Label> Login </Form.Label>
                  <Form.Control type="email" name='Login' onChange={handleChange} value={formData.Login} placeholder="Enter login" required />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridNom">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control type="text" name='Nom' onChange={handleChange} value={formData.Nom} placeholder="Enter Nom" required />
                </Form.Group>
              </Row>
              <br />
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Code Client</Form.Label>
                  <Form.Control type="text" name='CodeClient' onChange={handleChange} value={formData.CodeClient} placeholder="Enter code " disabled required />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name='Email' onChange={handleChange} value={formData.Email} placeholder="Enter Email" required />
                </Form.Group>
              </Row>
              <br />
              <Row>
                <Form.Group as={Col} controlId="formGridPays">
                  <Form.Label>Civilité </Form.Label>
                  <Form.Select name='Civilite' onChange={handleChange} value={formData.Civilite} >
                    <option value="">Choisissez un civilité...</option>
                    <option value="Société">Société</option>
                    <option value="Madame">Madame</option>
                    <option value="Monsieur">Monsieur</option>
                    <option value="SARL">SARL</option>
                    <option value="Garage">Garage</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Telephone</Form.Label>
                  <Form.Control type="number" name='telephone' onChange={handleChange} value={formData.telephone} placeholder="Enter Numéro" required />
                </Form.Group>

              </Row>
              <br />

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPays">
                  <Form.Label>Pays</Form.Label>
                  <Form.Select name='pays' onChange={handleChange} value={formData.pays}>
                    <option value="">Choisissez un pays...</option>
                    {countryOptions}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAdresse">
                  <Form.Label>Adresse</Form.Label>
                  <Form.Control type="text" name='adresse' onChange={handleChange} value={formData.adresse} placeholder="Enter Adresse" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridVille">
                  <Form.Label>Ville</Form.Label>
                  <Form.Control type="text" name='ville' onChange={handleChange} value={formData.ville} placeholder="Enter Ville" />
                </Form.Group>
              </Row>
              <br />

              <Form.Group as={Col} controlId="formGridRaisonsociale">
                <Form.Label>Famille Client </Form.Label>
                <Form.Select name='familleClientId' onChange={handleFamilleChange} value={formData.familleClientId} required>
                  <option value="">Sélectionnez une Famille client</option>
                  {Famille && Famille.map((famille) => (
                    <option key={famille.id} value={famille.id}>{famille.Libelle}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <br />
              <Row >
                <Form.Group as={Col} controlId="formGridRaisonsociale">
                  <Form.Label>* Type Tarif </Form.Label>
                  <Form.Select name='typeTarifId' onChange={handleChange} value={formData.typeTarifId} required>
                    <option value="">Sélectionnez une Type Tarif</option>
                    {Tarif && Tarif.map((tarif) => (
                      <option key={tarif.idTypetarif} value={tarif.idTypetarif}>{tarif.libelle}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPrenom">
                  <Form.Label>* Mode Réglement</Form.Label>
                  <Form.Select name='modeReglementId' onChange={handleChange} value={formData.modeReglementId} required>
                    <option value="">Sélectionnez un Mode Réglement</option>
                    {Mode && Mode.map((mode) => (
                      <option key={mode.idReg} value={mode.idReg}>{mode.libelle}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>
              <br />
              <Row>
                <Form.Group as={Col} controlId="formGridPrenom">
                  <Form.Label>* Vendeur</Form.Label>
                  <Form.Select name='vendeurId' onChange={handleChange} value={formData.vendeurId} required>
                    <option value="">Sélectionnez un Vendeur </option>
                    {Vendeur && Vendeur.map((vendeur) => (
                      <option key={vendeur.id} value={vendeur.id}>{vendeur.Nom}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPrenom">
                  <Form.Label>Secteur</Form.Label>
                  <Form.Select name='secteurGeoId' onChange={handleChange} value={formData.secteurGeoId} >
                    <option value="">Sélectionnez un secteur </option>
                    {Secteur && Secteur.map((secteur) => (
                      <option key={secteur.id} value={secteur.id}>{secteur.Libelle}</option>
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

export default UpdateClient;
