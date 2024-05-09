import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { countries } from 'countries-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Assurez-vous d'importer FontAwesomeIcon
import {
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

function generatePassword(length) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

function AddTechnicien() {
  const currentPageUrl = window.location.pathname;
  const newUrl = currentPageUrl.replace('/ajoutertechnicien', '');

  const tokenString = localStorage.getItem('token');
  const token = JSON.parse(tokenString);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = generatePassword(8);
    // Vérifier si tous les champs obligatoires sont remplis
    const requiredFields = ['login', 'nom', 'email', 'status'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(`Les champs suivants sont obligatoires : ${missingFields.join(', ')}`);
      return;
    }

    // Générer un mot de passe unique de 8 caractères
    console.log(formData)

    try {
      const response = await fetch('http://localhost:5000/api/technicien/addtechnicien',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,// Ajout du token d'authentification dans le header
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...formData, password: newPassword })
        });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du technicien');
      }

      toast.success('User ajouté avec succès !');

      setTimeout(() => {
        window.location.replace(newUrl);
      }, 1000);
    } catch (error) {
      console.error('Erreur lors de la Ajout du technicien:', error.message);
      toast.error('Erreur lors de la Ajout du technicien');
    }
  };

  const countryOptions = Object.entries(countries).map(([countryCode, country]) => (
    <option key={countryCode} value={countryCode}>{`${countryCode} - ${country.name}`}</option>
  ));

  return (
    <>
      <div className='Revenir'>
        <a href={newUrl}><FontAwesomeIcon icon={faArrowLeft} size="xl" style={{ color: "#5856d6", }} /> Techniciens </a>
      </div>
      <Form className='formulaire'>
        <h3>Ajouter un Technicin</h3>
        <br />
        <div className='BoxAjout'>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridRaisonsociale">
              <Form.Label> Login </Form.Label>
              <Form.Control type="text" name='login' onChange={handleChange} placeholder="Enter login" required />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridNom">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" name='nom' onChange={handleChange} placeholder="Enter Nom" required />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPrenom">
              <Form.Label>Prénom</Form.Label>
              <Form.Control type="text" name='prenom' onChange={handleChange} placeholder="Enter Prénom" />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridSexe">
              <Form.Label>Genre</Form.Label>
              <Form.Select name='genre' onChange={handleChange}>
                <option value="">Sélectionnez un sexe</option>
                <option value="H">Homme</option>
                <option value="F">Femme</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridDateNaissance">
              <Form.Label>Date de Naissance</Form.Label>
              <Form.Control type="date" name='dateNaissance' onChange={handleChange} />
            </Form.Group>
          </Row>
          <br />
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name='email' onChange={handleChange} placeholder="Enter Email" required />
            </Form.Group>
          </Row>
          <br />
          <Form.Group as={Col} controlId="formGridEmploi">
            <Form.Label>specialité</Form.Label>
            <Form.Control type="text" name='specialite' onChange={handleChange} placeholder="Enter specialite" />
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
              <Form.Control type="text" name='adresse' onChange={handleChange} placeholder="Enter Adresse" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridVille">
              <Form.Label>Ville</Form.Label>
              <Form.Control type="text" name='ville' onChange={handleChange} placeholder="Enter Ville" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCodePostal">
              <Form.Label>Code Postal</Form.Label>
              <Form.Control type="text" name='codePostal' onChange={handleChange} placeholder="Enter Code Postal" />
            </Form.Group>
          </Row>
          <br />

          <Form.Group as={Col} controlId="formGridStatut">
            <Form.Label>Statut</Form.Label>
            <Form.Select name='status' onChange={handleChange} required>
              <option value="">Sélectionnez un status</option>
              <option value="Actif">Actif</option>
              <option value="Suspendu">Suspendu</option>
              <option value="Inactif">Inactif</option>
              <option value="Retraité">Retraité</option>
            </Form.Select>
          </Form.Group>

          <br />

          <Form.Group className="mb-3" id="formGridCheckbox">
          </Form.Group>
          <br />
          <Button variant="primary" type="submit" className='btnAjout' onClick={handleSubmit}>
            Ajouter Technicien
          </Button>
        </div>
      </Form>
    </>
  );
}

export default AddTechnicien;
