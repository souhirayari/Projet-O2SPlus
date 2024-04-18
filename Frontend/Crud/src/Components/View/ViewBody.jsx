import React from 'react';
import DossierView from './DossierView';
import Card from 'react-bootstrap/Card';

function ViewBody({ dossier }) {
  return (
    <div className='BodyBox'>
      <div className='Viewbody'>
        <Card style={{ width: '30rem' }}>
          <Card.Body>
            <Card.Title>Dossier :</Card.Title>
            <Card.Text>
              <strong>Raison Sociale:</strong> {dossier.RaisonSociale}
            </Card.Text>
            <Card.Text>
              <strong>Adresse:</strong> {dossier.Adresse}
            </Card.Text>
            <Card.Text>
              <strong>Code Postal:</strong> {dossier.CodePostal}
            </Card.Text>
            <Card.Text>
              <strong>Email:</strong> {dossier.Email}
            </Card.Text>
            <Card.Text>
              <strong>Ville:</strong> {dossier.Ville}
            </Card.Text>
            <Card.Text>
              <strong>Téléphone:</strong> {dossier.Telephone}
            </Card.Text>
            <Card.Text>
              <strong>Mobile:</strong> {dossier.Mobile}
            </Card.Text>
            <Card.Text>
              <strong>Site Web:</strong> {dossier.SiteWeb}
            </Card.Text>
            <Card.Text>
              <strong>Créé le:</strong> {dossier.createdAt}
            </Card.Text>
            <Card.Text>
              <strong>Utilisateur(s) :</strong>
              {dossier.Utilisateurs && dossier.Utilisateurs.length !== 0 ? (
                dossier.Utilisateurs.map((utilisateur, index) => (
                  <span key={index}>
                    <li>Login: {utilisateur.login} </li>
                    <p> Role: {utilisateur.Role}</p>
                  </span>
                ))
              ) : (
                <span> Aucun utililisateur attribué</span>
              )}
            </Card.Text>
            <Card.Text>
              <strong>Licence(s) :</strong>
              {dossier.licences && dossier.licences.length !== 0 ? (
                dossier.licences.map((licence, index) => (
                  <span key={index}>
                    <li>Statut: {licence.statut}  </li>
                    <p>Date de validation: {licence.Datevalidation}</p>
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

export default ViewBody;
