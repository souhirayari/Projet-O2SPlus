import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function UserView({ user, token }) {
  const [dossier, setDossier] = useState({});
  const id = user.dossierId
  useEffect(() => {
    async function getData() {
      try {
        if (id) {
          const resDossier = await fetch(`http://localhost:5000/api/dossier/findOne/${id}`,{
            headers: {
                'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
            }
        });

          if (!resDossier.ok) {
            return console.log("erreur fetching data");

          }

          const jsonDossier = await resDossier.json();
          setDossier(jsonDossier.dossier);
        }
      } catch (err) {
        console.error("erreur dans getData dans licenceView", err);
      }
    }

    getData();
  }, [id]); // Ajoutez dossierId en tant que dépendance pour recharger les données lorsque l'ID du dossier changes
 
  const extractDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
};
  
  return (
    <div className='BodyBox'>
      <div className='Viewbody'>
        <Card style={{ width: '75rem' }}>
          <Card.Body className='layout'>
            <Card.Title>Utilisateur :</Card.Title>
            <Row className="mb-3">
              <Card.Text as={Col}>
                <strong>Nom :</strong> {user.nom}
              </Card.Text>
              <Card.Text as={Col}>
                <strong>Prénom :</strong> {user.prenom}
              </Card.Text>
            </Row>
            <Row className="mb-3">
              <Card.Text as={Col}>
                <strong>login:</strong> {user.login}
              </Card.Text>
              <Card.Text as={Col}>
                <strong>code User :</strong> {user.codeUser}
              </Card.Text>
            </Row>
            
            <Row className="mb-3">
              <Card.Text as={Col}>
                <strong>Email :</strong> {user.login}
              </Card.Text>
              <Card.Text as={Col}>
                <strong>Emploi :</strong> {user.codeUser}
              </Card.Text>
            </Row>
            <Row className="mb-3">
              <Card.Text as={Col}>
                <strong>Date Naissance :</strong> {user.dateNaissance}
              </Card.Text>
              <Card.Text as={Col}>
                <strong>Genre :</strong> {user.sexe == 'F' ? 'Femme' : 'Homme'}
              </Card.Text>
            </Row>
            <Row className="mb-3">
              <Card.Text as={Col}>
                <strong>Adresse :</strong> {user.adresse}
              </Card.Text>
              <Card.Text as={Col}>
                <strong>Ville :</strong> {user.ville}
              </Card.Text>
              <Card.Text as={Col}>
                <strong>Code Postal :</strong> {user.codePostal}
              </Card.Text>
              <Card.Text as={Col}>
                <strong>Pays :</strong> {user.pays}
              </Card.Text>
            </Row>
            <Row className='mb-3'>
              <Card.Text as={Col}>
                <strong>Role :</strong> {user.Role}
              </Card.Text>
              <Card.Text as={Col}>
                <strong>Statut :</strong> {user.statut}
              </Card.Text>
            </Row>
            <Card.Text as={Col}>
              <strong>Créé le:</strong> {extractDate(user.createdAt)}
            </Card.Text>
            <Card.Text as={Col}>
              <strong>Dossier(s) :</strong>
              <br />
              {user.Dossiers && user.Dossiers.length !== 0 ? (
                user.Dossiers.map((dossier, index) => (
                  <span key={index} className='dossierUser'>
                    <li>  Raison Sociale : {dossier.RaisonSociale} </li>
                    Email : {dossier.Email}
                  </span>
                ))
              ) : (
                Object.keys(dossier).length !== 0 ? (
                  <span className='dossierUser' >
                    <li>  Raison Sociale : {dossier.RaisonSociale} </li>
                    Email : {dossier.Email}
                  </span>
                ) : (
                  <span> Aucun dossier attribué </span>
                )
              )}


            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default UserView;
