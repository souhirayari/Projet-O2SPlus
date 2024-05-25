import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';


function UpdateArticle({ show, handleClose, article }) {
  const dossierId = localStorage.getItem('dossierId'); // Suppose que vous stockez le token dans le localStorage

  const [Familles, setFamille] = useState([])
  const [Marques, setMarque] = useState([])
  const [Fournisseurs, setFournisseurs] = useState([])

  const tokenString = localStorage.getItem('token');
  const token = JSON.parse(tokenString);
  const [formData, setFormData] = useState({
    codeArticle: '',
    libelle: '',
    idFamArt: '', // Correction : familleArticle au lieu de type
    idMarque: '', // Correction : marque au lieu de type
    modele: '',
    typeModele: '',
    puissance: '',
    TVA: 0.0,
    prixAchat: 0.0,
    prixTTC: 0.0,
    prixHT: 0.0,
    durreGarantie: '',
    valorisation: '',
    couverture: '',
    condition: '',
    gereEnStock: false, // Correction : Initialiser à false
    Serialize: false, // Correction : Initialiser à false
    idFournisseur: '',
    prixAchatFournisseur: ''
  });

  useEffect(() => {
    if (article) {
      setFormData({
        codeArticle: article.codeArticle || '',
        libelle: article.libelle || '',
        modele: article.modele || '',
        typeModele: article.typeModele || '',
        TVA: article.TVA || '',
        prixAchat: article.prixAchat || '',
        prixTTC: article.prixTTC || '',
        prixHT: article.prixHT || '',
        durreGarantie: article.durreGarantie || '',
        valorisation: article.valorisation || '',
        couverture: article.couverture || '',
        condition: article.condition || '',
        gereEnStock: article.gereEnStock || '',
        Serialize: article.Serialize || '',

      });
    }
  }, [article]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(name, value)

    // Convertir les valeurs float
    const floatValue = type === 'number' ? parseFloat(value) : value;

    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? true : floatValue
    }));
  };;


  useEffect(() => {
    async function fetchData() {
      try {
        // Utilisation de Promise.all pour attendre que les deux requêtes soient terminées
        const [familleResponse, marqueResponse, fournissueurRes] = await Promise.all([
          fetch(`http://localhost:5000/api/article/findAllFamillebydossier/${dossierId}`, {
            headers: {
              'authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
            }
          }),
          fetch(`http://localhost:5000/api/article/findAllMarqueByDossier/${dossierId}`, {
            headers: {
              'authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
            }
          }),
          fetch(`http://localhost:5000/api/article/findAllFournisseurByDosier/${dossierId}`, {
            headers: {
              'authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
            }
          })
        ]);
        // Vérification de la réponse pour la famille
        if (!familleResponse.ok) {
          if (familleResponse.status === 404) {
            setFamille([]);
          } else {
            throw new Error('Erreur lors de la récupération des familles');
          }
        } else {
          const familleData = await familleResponse.json();
          setFamille(familleData);
        }

        // Vérification de la réponse pour la marque
        if (!marqueResponse.ok) {
          if (marqueResponse.status === 404) {
            setMarque([]);
          } else {
            throw new Error('Erreur lors de la récupération des marques');
          }
        } else {
          const marqueData = await marqueResponse.json();
          setMarque(marqueData);
        }
        // Vérification de la réponse pour la marque
        if (!fournissueurRes.ok) {
          if (fournissueurRes.status === 404) {
            setFournisseurs([]);
          } else {
            throw new Error('Erreur lors de la récupération des marques');
          }
        } else {
          const FournisseurData = await fournissueurRes.json();
          setFournisseurs(FournisseurData);
        }
      } catch (error) {
        console.error('Erreur fetchData:', error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
      const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
      const response = await fetch(`http://localhost:5000/api/article/updateArticle/${article.idArticle}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du article');
      }

      toast.success('article mis à jour avec succès !');
      handleClose();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du article:', error.message);
      toast.error('Erreur lors de la mise à jour du article');
    }
  };


  return (
    <div className='EditForm'>
      {article && (
        <Modal show={show} onHide={handleClose}  >
          <Modal.Header closeButton>
            <Modal.Title>Article</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCodeArticle">
                  <Form.Label>Code Article</Form.Label>
                  <Form.Control type="text" name='codeArticle' onChange={handleChange} value={formData.codeArticle} disabled />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridLibelle">
                  <Form.Label>Libellé</Form.Label>
                  <Form.Control type="text" name='libelle' onChange={handleChange} value={formData.libelle} placeholder="Entrez le libellé de l'article" required />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridFamilleArticle">
                  <Form.Label>Famille Article</Form.Label>
                  <Form.Select name='idFamArt' onChange={handleChange} required>
                    <option value="">Sélectionnez une Famille Article</option>
                    {Familles && (Familles.map((famille) => (
                      <option key={famille.idFamArt} value={famille.idFamArt}>{famille.libelle}</option>
                    )))}
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridMarque">
                  <Form.Label>Marque</Form.Label>
                  <Form.Select name='idMarque' onChange={handleChange} required>
                    <option value="">Sélectionnez une Marque</option>
                    {Marques && (Marques.map((marque) => (
                      <option value={marque.idMarque} key={marque.idMarque}>{marque.libelle}</option>
                    )))}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridModele">
                  <Form.Label>Modèle</Form.Label>
                  <Form.Control type="text" name='modele' onChange={handleChange} value={formData.modele} placeholder="Entrez le modèle de l'article" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridTypeModele">
                  <Form.Label>Type Modèle</Form.Label>
                  <Form.Control type="text" name='typeModele' onChange={handleChange} value={formData.typeModele} placeholder="Entrez le type de modèle de l'article" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPuissance">
                  <Form.Label>Puissance</Form.Label>
                  <Form.Control type="text" name='puissance' onChange={handleChange} value={formData.puissance} placeholder="Entrez la puissance de l'article" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridTVA">
                  <Form.Label>TVA</Form.Label>
                  <Form.Control type="number" min="0" name='TVA' onChange={handleChange} value={formData.TVA} placeholder="Entrez la TVA de l'article" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPrixAchat">
                  <Form.Label>Prix Achat</Form.Label>
                  <Form.Control type="number" min="0" name='prixAchat' onChange={handleChange} value={formData.prixAchat} placeholder="Entrez le prix d'achat de l'article" required />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPrixTTC">
                  <Form.Label>Prix TTC</Form.Label>
                  <Form.Control type="number" min="0" name='prixTTC' onChange={handleChange} value={formData.prixTTC} placeholder="Entrez le prix TTC de l'article" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPrixHT">
                  <Form.Label>Prix HT</Form.Label>
                  <Form.Control type="number" min="0" name='prixHT' onChange={handleChange} value={formData.prixHT} placeholder="Entrez le prix HT de l'article" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridDurreGarantie">
                  <Form.Label>Durée Garantie</Form.Label>
                  <Form.Control type="number" min="0" name='durreGarantie' onChange={handleChange} value={formData.durreGarantie} placeholder="Entrez la durée de garantie de l'article" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridValorisation">
                  <Form.Label>Valorisation</Form.Label>
                  <Form.Select name='valorisation' onChange={handleChange} value={formData.valorisation} required>
                    <option value="">Sélectionnez une valorisation</option>
                    <option value="P">PEMP</option>
                    <option value="D">Der Pa</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCouverture">
                  <Form.Label>Couverture</Form.Label>
                  <Form.Select name='couverture' onChange={handleChange} value={formData.couverture} required>
                    <option value="">Sélectionnez une couverture</option>
                    <option value="A">Articles</option>
                    <option value="M">Main d'oeuvre</option>
                    <option value="AM">Article et Main d'oeuvre</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCondition">
                  <Form.Label>Condition</Form.Label>
                  <Form.Select name='condition' onChange={handleChange} value={formData.condition} required>
                    <option value="">Sélectionnez une condition</option>
                    <option value="Sur Site">Sur Site</option>
                    <option value="Atelier">Atelier</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCouverture">
                  <Form.Label>Fournisseur</Form.Label>
                  <Form.Select name='idFournisseur' onChange={handleChange} required>
                    <option value="">Sélectionnez un Fournissueur</option>
                    {Fournisseurs && (Fournisseurs.map((fournisseur) => (
                      <option value={fournisseur.idFournisseur} key={fournisseur.idFournisseur}>{fournisseur.nom}</option>
                    )))}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCondition">
                  <Form.Label>prix d'achat Fournisseur</Form.Label>
                  <Form.Control type="number" name='prixAchatFournisseur' onChange={handleChange} placeholder="Entrez le prix HT de l'article" />
                </Form.Group>
              </Row>
              <br />
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridGereEnStock">
                  <Form.Check
                    type="checkbox"
                    label="Gérer par le stock"
                    name='gereEnStock'
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridSerialize">
                  <Form.Check
                    type="checkbox"
                    label="Sérializer"
                    name='Serialize'
                    onChange={handleChange}
                  />
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

export default UpdateArticle;
