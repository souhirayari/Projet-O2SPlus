import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { countries } from 'countries-list';


function UpdateUserD({ show, handleClose, user }) {
  const dossierId = localStorage.getItem('dossierId'); // Suppose que vous stockez le token dans le localStorage
  const [formData, setFormData] = useState({
    login: '',
    Role: '',
    dossierId: dossierId,
    nom: '',
    prenom: '',
    genre: '',
    dateNaissance: '',
    email: '',
    emploi: '',
    adresse: '',
    ville: '',
    codePostal: '',
    pays: '',
    statut: '',
    avatar: null // Initialiser à null
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null); // Ajout de l'état pour l'aperçu de l'avatar

  useEffect(() => {
    if (user) {
      setFormData({
        login: user.login || '',
        Role: user.Role || '',
        dossierId: dossierId,
        nom: user.nom || '',
        prenom: user.prenom || '',
        genre: user.genre || '',
        dateNaissance: user.dateNaissance || '',
        email: user.email || '',
        emploi: user.emploi || '',
        adresse: user.adresse || '',
        ville: user.ville || '',
        codePostal: user.codePostal || '',
        pays: user.pays || '',
        statut: user.statut || '',
        avatar: user.avatar || null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result); // Mettre à jour l'aperçu de l'avatar avec les données de l'image chargée
      setFormData({
        ...formData,
        avatar: e.target.files[0].name
      });
    };
    reader.readAsDataURL(file);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
      const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
      const response = await fetch(`http://localhost:5000/api/users/update/${user.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du dossier');
      }

      toast.success('Dossier mis à jour avec succès !');
      handleClose();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du USER:', error.message);
      toast.error('Erreur lors de la mise à jour du USER');
    }
  };

  const countryOptions = Object.entries(countries).map(([countryCode, country]) => (
    <option key={countryCode} value={countryCode}>{`${countryCode} - ${country.name}`}</option>
  ));
  return (
    <div className='EditForm'>
      {user && (
        <Modal show={show} onHide={handleClose}  >
          <Modal.Header closeButton>
            <Modal.Title>Utiliateurs </Modal.Title>
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
                <Form.Label>Emploi</Form.Label>
                <Form.Control type="text" name='emploi' onChange={handleChange} value={formData.emploi} placeholder="Enter Emploi" />
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
              <Form.Group className="mb-3" controlId="formGridAvatar">
                <Form.Label>Avatar</Form.Label>
                <Form.Control type="file" name="avatar" onChange={handleAvatarChange} />
              </Form.Group>
              {/* Affichage de l'aperçu de l'avatar */}
              {avatarPreview && (
                <img src={avatarPreview} alt="Avatar Preview" style={{ maxWidth: '100px', marginTop: '10px' }} />
              )}


              <Form.Group as={Col} controlId="formGridStatut">
                <Form.Label>Statut</Form.Label>
                <Form.Select name='statut' onChange={handleChange} value={formData.statut} required>
                  <option value="">Sélectionnez un statut</option>
                  <option value="Actif">Actif</option>
                  <option value="Suspendu">Suspendu</option>
                  <option value="Inactif">Inactif</option>
                  <option value="Retraité">Retraité</option>
                </Form.Select>
              </Form.Group>

              <br />
              <Form.Group className="mb-3" controlId="formGridRole">
                <Form.Label>Role</Form.Label>
                <Form.Select name='Role' onChange={handleChange} value={formData.Role} required>
                  <option value="">Sélectionnez un rôle</option>
                  <option value="adminDossier">adminDossier</option>
                  <option value="user">user</option>
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

export default UpdateUserD;
