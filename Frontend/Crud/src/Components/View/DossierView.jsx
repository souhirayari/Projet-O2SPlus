import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

function DossierView({ dossier }) {

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
            <Card.Title>Dossier :</Card.Title>
            <Row className='mb-3'>
              <Card.Text as={Col}>
                <strong>Raison Sociale:</strong> {dossier.RaisonSociale}
              </Card.Text>
              <Card.Text as={Col}>
                <strong>Email:</strong> {dossier.Email}
              </Card.Text>
            </Row>
            <br />
            <Row className='mb-3'>
              <Card.Text as={Col}>
                <strong>Téléphone:</strong> {dossier.Telephone}
              </Card.Text>
              <Card.Text as={Col}>
                <strong>Mobile:</strong> {dossier.Mobile}
              </Card.Text>
            </Row>
            <br />
            <Row className='mb-3'>
              <Card.Text as={Col}>
                <strong>Adresse:</strong> {dossier.Adresse}
              </Card.Text>
              <Card.Text as={Col}>
                <strong>Ville:</strong> {dossier.Ville}
              </Card.Text>
              <Card.Text as={Col}>
                <strong>Code Postal:</strong> {dossier.CodePostal}
              </Card.Text>
            </Row>
            <br />
            <Row className='mb-3'>
              <Card.Text as={Col}>
                <strong>Site Web:</strong> {dossier.SiteWeb}
              </Card.Text>
              <Card.Text as={Col}>
                <strong>Créé le:</strong> {extractDate(dossier.createdAt)}
              </Card.Text>
            </Row>
            <Card.Text as={Col}>
              <strong>Utilisateur(s) :</strong>
              {dossier.Utilisateurs && dossier.Utilisateurs.length !== 0 ? (
                dossier.Utilisateurs.map((utilisateur, index) => (
                  <span key={index}>
                    <ol>Login: {utilisateur.Nom +' '+ utilisateur.prenom} </ol>
                    <ol> Role: {utilisateur.Role}</ol>
                  </span>
                ))
              ) : (
                <span> Aucun utililisateur attribué</span>
              )}
            </Card.Text>
            <Card.Text as={Col}>
              <strong>Licence(s) :</strong>
              {dossier.licence && dossier.licence.length !== 0 ? (
                dossier.licence.map((licence, index) => (
                  <span key={index} className='dossierUser'>
                    <ol>Statut: {licence.statut}  </ol>
                   <ol> Date de validation: {licence.Datevalidation} </ol>
                  <ol> Date de Debut: {licence.DateDebut} </ol>

                  </span>
                ))
              ) : (
                <span> Aucune licence attribuée</span>
              )}

            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default DossierView;
