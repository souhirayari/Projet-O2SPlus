import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


function AddLicence() {
  const [formData, setFormData] = useState({
    Datevalidation: '',
    DateDebut: '',
    DateFin: '',
    nombreUser: '',
    nombreTech: '',
    nombreclient: '',
    nombreArticle: '',
    statut: '',
    dossierId: ''
  });

  const [dossiers, setDossiers] = useState([]);

  const tokenString = localStorage.getItem('token');
  const token = JSON.parse(tokenString);

  useEffect(() => {
    const fetchDossiers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/dossier/findAll', {
          headers: {
            'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
          }
        }
        );
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des dossiers');
        }
        const data = await response.json();
        setDossiers(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des dossiers:', error);
      }
    };

    fetchDossiers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/licence/AddLicence', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Ajout du token d'authentification dans le header
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du licence');
      }

      toast.success('User ajouté avec succès !');

      setTimeout(() => {
        window.location.replace('/Licences');
      }, 1000);
    } catch (error) {
      console.error('Erreur lors de la Ajout du licence:', error.message);
      toast.error('Erreur lors de la Ajout du licence');
    }
  };

  return (
    <Form className='formulaire'>
      <h3>Ajouter un Licence</h3>
      <br />
      <div className='BoxAjout'>

        <Form.Group controlId="formGridDatevalidation">
          <Form.Label> Date validation </Form.Label>
          <Form.Control type="text" name='Datevalidation' onChange={handleChange} placeholder="Enter Date validation" />
        </Form.Group>
        <br />
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridDateDebut">
            <Form.Label>Date Debut</Form.Label>
            <Form.Control type="date" name='DateDebut' onChange={handleChange} placeholder="Date Debut" />
          </Form.Group>

          <Form.Group as={Col} className="mb-3" controlId="formGridDateFin">
            <Form.Label>Date Fin</Form.Label>
            <Form.Control type="date" name='DateFin' onChange={handleChange} placeholder="Date Fin" />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridnombreUser">
            <Form.Label>Nombre Utilisateurs</Form.Label>
            <Form.Control type="number" name='nombreUser' onChange={handleChange} placeholder="nombre Utilisateurs" />
          </Form.Group>

          <Form.Group as={Col} className="mb-3" controlId="formGridnombreTech">
            <Form.Label>Nombre Techniciens</Form.Label>
            <Form.Control type="number" name='nombreTech' onChange={handleChange} placeholder="nombre Techniciens" />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridnombreclient">
            <Form.Label>Nombre clients</Form.Label>
            <Form.Control type="number" name='nombreclient' onChange={handleChange} placeholder="nombre clients" />
          </Form.Group>

          <Form.Group as={Col} className="mb-3" controlId="formGridnombreclient">
            <Form.Label>Nombre Articles</Form.Label>
            <Form.Control type="number" name='nombreArticle' onChange={handleChange} placeholder="nombre Articles" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridstatut">
          <Form.Label>statut</Form.Label>
          <Form.Select name='statut' onChange={handleChange}>
            <option value="">Sélectionnez un Statut</option>
            <option value="Actif">Actif</option> {/* Option pour le statut actif */}
            <option value="Inactif">Inactif</option> {/* Option pour le statut inactif */}
          </Form.Select>
        </Form.Group>


        <Form.Group className="mb-3" controlId="formGridDossier">
          <Form.Label>Sélectionnez un dossier</Form.Label>
          <Form.Select name='dossierId' onChange={handleChange}>
            <option value="">Sélectionnez un dossier</option>
            {dossiers.map(dossier => (
              <option key={dossier.id} value={dossier.id}>{dossier.RaisonSociale}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit" className='btnAjout' onClick={handleSubmit}>
          Ajouter Licence
        </Button>
      </div>
    </Form>
  );
}

export default AddLicence;
