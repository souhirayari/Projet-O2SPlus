import React, { useEffect } from 'react';
import '../../Style/Profile.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faBookmark, faUser, faCompass, faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import UpdateUser from '../UpdateComponent/UpdateUser';
import { useState } from 'react';


function BodyProfile({UserInfo}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    return (
        <>
            <div className='bodyProfile'>
                <Button className='buttonEdit' variant="primary" onClick={() => { setShow(true) }}> <FontAwesomeIcon icon={faPen} /> Modifier Profile </Button>{' '}
                <div className='espace'>
                    <div>
                        <h2 className='information'> <FontAwesomeIcon icon={faBookmark} /> Information :</h2>
                        <br />
                        <Card.Body className='layout'>

                            <Row className="mb-3">
                                <Card.Text as={Col}>
                                    <strong>Nom : </strong>
                                    <li>{UserInfo.nom}</li>
                                </Card.Text>
                                <Card.Text as={Col}>
                                    <strong>Prénom :</strong>
                                    <li>  {UserInfo.prenom}</li>
                                </Card.Text>
                            </Row>

                            <Row className="mb-3">
                                <Card.Text as={Col}>
                                    <strong>login:</strong>
                                    <li>{UserInfo.login}</li>
                                </Card.Text>
                                <Card.Text as={Col}>
                                    <strong>Email :</strong>
                                    <li> {UserInfo.email}</li>
                                </Card.Text>
                            </Row>
                            <br />
                            <hr />
                            <br />
                            <h3> <FontAwesomeIcon icon={faUser} /> Personnelle :</h3>
                            <br />
                            <Row className="mb-3">

                                <Card.Text as={Col}>
                                    <strong>Emploi :</strong>
                                    <li> {UserInfo.emploi}</li>
                                </Card.Text>
                            </Row>
                            <Row className="mb-3">
                                <Card.Text as={Col}>
                                    <strong>Date Naissance :</strong>
                                    <li> {UserInfo.dateNaissance}</li>
                                </Card.Text>
                                <Card.Text as={Col}>
                                    <strong>Genre :</strong>
                                    <li>{UserInfo.genre === 'Femme' ? 'Femme' : 'Homme'}</li>
                                </Card.Text>
                            </Row>
                            <Row className='mb-3'>
                                <Card.Text as={Col}>
                                    <strong>Pays :</strong> {UserInfo.pays}
                                </Card.Text>
                                <Card.Text as={Col}>
                                    <strong>Adresse :</strong> {UserInfo.adresse}
                                </Card.Text>
                            </Row>
                            <Row className="mb-3">
                                <Card.Text as={Col}>
                                    <strong>Ville :</strong> {UserInfo.ville}
                                </Card.Text>

                                <Card.Text as={Col}>
                                    <strong>Code Postal :</strong> {UserInfo.codePostal}
                                </Card.Text>
                            </Row>

                            <br />
                            <hr />
                            <br />
                            <h3> <FontAwesomeIcon icon={faCompass} />  Statut et Role :</h3>
                            <br />
                            <Row className='mb-3'>
                                <Card.Text as={Col}>
                                    <strong>Role :</strong> {UserInfo.Role}
                                </Card.Text>
                                <Card.Text as={Col}>
                                    <strong>Statut :</strong> {UserInfo.statut}
                                </Card.Text>
                            </Row>
                            <br />
                            <br />


                        </Card.Body>


                    </div>
                </div>
            </div>
            <UpdateUser show={show} handleClose={handleClose} user={UserInfo} />

        </>
    )
}

export default BodyProfile;
