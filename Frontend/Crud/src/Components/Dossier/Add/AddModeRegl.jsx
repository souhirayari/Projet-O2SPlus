import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Assurez-vous d'importer FontAwesomeIcon
import {
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
function AddModeRegl() {
  const currentPageUrl = window.location.pathname;
  const newUrl = currentPageUrl.replace('/ajoutermodeRegl', '');

  const tokenString = localStorage.getItem('token');
  const token = JSON.parse(tokenString);
  const dossierId = localStorage.getItem('dossierId')

  const [formData, setFormData] = useState({
    codeReg: '',
    libelle: '',
    dossierId: dossierId,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Vérifier si tous les champs obligatoires sont remplis
    const requiredFields = ['codeReg', 'libelle', 'TypePaiment', 'modePaiment'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(`Les champs suivants sont obligatoires : ${missingFields.join(', ')}`);
      return;
    }

    // Générer un mot de passe unique de 8 caractères
    console.log(formData)

    try {
      const response = await fetch('http://localhost:5000/api/article/addmoderegl',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,// Ajout du token d'authentification dans le header
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...formData })
        });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du mode Reglement');
      }

      toast.success('Mode ajouté avec succès !');

      setTimeout(() => {
        window.location.replace(newUrl);
      }, 1000);
    } catch (error) {
      console.error('Erreur lors de la Ajout du mode Reglement:', error.message);
      toast.error('Erreur lors de la Ajout du mode Reglement');
    }
  };
  return (
    <div>
      <div className='Revenir'>
        <a href={newUrl}><FontAwesomeIcon icon={faArrowLeft} size="xl" style={{ color: "#5856d6", }} /> Mode Réglements </a>
      </div>
      <Form className='formulaire'>
        <h3>Ajouter un Mode Réglement</h3>
        <br />
        <div className='BoxAjout'>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridRaisonsociale">
              <Form.Label>* Code Mode Réglement </Form.Label>
              <Form.Control type="text" name='codeReg' onChange={handleChange} placeholder="Enter code reglement " required />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPrenom">
              <Form.Label>* Libelle</Form.Label>
              <Form.Control type="text" name='libelle' onChange={handleChange} placeholder="Enter libelle " />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridRaisonsociale">
              <Form.Label> Mois </Form.Label>
              <Form.Control type="number" name='Mois' min='0' onChange={handleChange} placeholder="Enter number de Mois " required />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPrenom">
              <Form.Label>Nombre de Jours</Form.Label>
              <Form.Control type="number" name='nbj' min='0' onChange={handleChange} placeholder="Enter number du jours " />
            </Form.Group>
          </Row>
          <Form.Group as={Col} controlId="formGridRaisonsociale">
            <Form.Label> Pourcentage </Form.Label>
            <Form.Control type="number" name='pourcentage' onChange={handleChange} placeholder="Enter code reglement " required />
          </Form.Group>
          <br />
          <Row>
            <Form.Group as={Col} controlId="formGridNom">
              <Form.Label>* Type Paiment</Form.Label>
              <Form.Select name='TypePaiment' onChange={handleChange}>
                <option value="">Sélectionnez un Type Paiment </option>
                <option value="comptant">comptant</option>
                <option value="Net">Net</option>
                <option value="Fin Mois">Fin Mois</option>
                <option value="Fin Décade">Fin Décade</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridNom">
              <Form.Label>* Mode Paiement</Form.Label>
              <Form.Select name='modePaiment' onChange={handleChange}>
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
          <Button variant="primary" type="submit" className='btnAjout' onClick={handleSubmit}>
            Ajouter Mode Réglement
          </Button>
        </div>
      </Form>

    </div>
  )
}

export default AddModeRegl