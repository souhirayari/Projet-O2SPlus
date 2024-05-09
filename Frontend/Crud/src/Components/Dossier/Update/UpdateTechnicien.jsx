import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { countries } from 'countries-list';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function UpdateTechnicien({ show, handleClose, technicien }) {
  const currentPageUrl = window.location.pathname;
  const newUrl = currentPageUrl.replace('/ajoutertechnicien', '');
  const dossierId = localStorage.getItem('dossierId')
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    dossierId: dossierId,
    nom: '',
    prenom: '',
    genre: '',
    dateNaissance: '',
    email: '',
    specialite: '',
    adresse: '',
    ville: '',
    codePostal: '',
    pays: '',
    status: '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

  };
  useEffect(() => {
    if (technicien) {
      setFormData({
        login: technicien.login || '',
        Role: technicien.Role || '', // Correction ici
        dossierId: dossierId,
        nom: technicien.nom || '',
        prenom: technicien.prenom || '',
        genre: technicien.genre || '',
        dateNaissance: technicien.dateNaissance || '',
        email: technicien.email || '',
        specialite: technicien.specialite || '',
        adresse: technicien.adresse || '',
        ville: technicien.ville || '',
        codePostal: technicien.codePostal || '',
        pays: technicien.pays || '',
        status: technicien.status || '',
      });
    }
  }, [technicien]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
      const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
      const response = await fetch(`http://localhost:5000/api/technicien/update/${technicien.idTech}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du tecnicien');
      }

      toast.success('technicien mis à jour avec succès !');
      handleClose();
      setTimeout(() => {
        window.location.reload(newUrl);
      }, 1000);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du tchnicien:', error.message);
      toast.error('Erreur lors de la mise à jour du technicien');
    }
  };

  const countryOptions = Object.entries(countries).map(([countryCode, country]) => (
    <option key={countryCode} value={countryCode}>{`${countryCode} - ${country.name}`}</option>
  ));

  return (
    <>
      <div className='EditForm'>
        {technicien && (
          <Modal show={show} onHide={handleClose}  >
            <Modal.Header closeButton>
              <Modal.Title>Technicien</Modal.Title>
            </Modal.Header>
            <Modal.Body >
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridRaisonsociale">
                    <Form.Label> Login </Form.Label>
                    <Form.Control type="text" name='login' onChange={handleChange} value={formData.login} placeholder="Enter login" required />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridNom">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control type="text" name='nom' onChange={handleChange} value={formData.nom} placeholder="Enter Nom" required />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPrenom">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control type="text" name='prenom' onChange={handleChange} value={formData.prenom} placeholder="Enter Prénom" />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridSexe">
                    <Form.Label>Genre</Form.Label>
                    <Form.Select name='genre' onChange={handleChange} value={formData.genre}>
                      <option value="">Sélectionnez un genre</option>
                      <option value="H">Homme</option>
                      <option value="F">Femme</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridDateNaissance">
                    <Form.Label>Date de Naissance</Form.Label>
                    <Form.Control type="date" name='dateNaissance' onChange={handleChange} value={formData.dateNaissance} />
                  </Form.Group>
                </Row>
                <br />
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name='email' onChange={handleChange} value={formData.email} placeholder="Enter Email" required />
                  </Form.Group>
                </Row>
                <br />
                <Form.Group as={Col} controlId="formGridEmploi">
                  <Form.Label>specialité</Form.Label>
                  <Form.Control type="text" name='specialite' onChange={handleChange} value={formData.specialite} placeholder="Enter specialite" />
                </Form.Group>
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

                  <Form.Group as={Col} controlId="formGridCodePostal">
                    <Form.Label>Code Postal</Form.Label>
                    <Form.Control type="text" name='codePostal' onChange={handleChange} value={formData.codePostal} placeholder="Enter Code Postal" />
                  </Form.Group>
                </Row>
                <br />



                <Form.Group as={Col} controlId="formGridStatut">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name='status' onChange={handleChange} value={formData.status} required>
                    <option value="">Sélectionnez un statut</option>
                    <option value="Actif">Actif</option>
                    <option value="Suspendu">Suspendu</option>
                    <option value="Inactif">Inactif</option>
                    <option value="Retraité">Retraité</option>
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
    </>
  );
}

export default UpdateTechnicien;
