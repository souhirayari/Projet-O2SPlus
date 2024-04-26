import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function LicenceView({ Licence,token }) {
    const [dossier, setDossier] = useState({});
    const id = Licence.dossierId
    useEffect(() => {
        async function getData() {
            try {
                if (id){
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
    }, [Licence.dossierId]); // Ajoutez dossierId en tant que dépendance pour recharger les données lorsque l'ID du dossier changes
    
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
                        <Card.Title>Licence :</Card.Title>
                        <br />  
                        <Row className="mb-3">

                        <Card.Text as={Col}>
                            <strong>Dossier :</strong> {dossier.RaisonSociale}
                        </Card.Text>
                        <Card.Text as={Col}>
                            <strong>Email</strong> {dossier.Email}
                        </Card.Text>
                        </Row>
                        <Row className="mb-3">
                        <Card.Text as={Col}>
                            <strong>statut :</strong> {Licence.statut}
                        </Card.Text>
                        <Card.Text as={Col}>
                            <strong>Date Validation:</strong> {Licence.Datevalidation}
                        </Card.Text>
                        </Row>
                        <Row className='mb-3'>
                        <Card.Text as={Col}>
                            <strong>Date Debut :</strong> {Licence.DateDebut}
                        </Card.Text>
                        <Card.Text as={Col}>
                            <strong>Date Fin :</strong> {Licence.DateFin}
                        </Card.Text>
                        </Row>
                        <Row className='mb-3'>
                        <Card.Text as={Col}>
                            <strong>nombre User:</strong> {Licence.nombreUser}
                        </Card.Text>
                        <Card.Text as={Col}>
                            <strong>nombreTech:</strong> {Licence.nombreTech}
                        </Card.Text>
                        <Card.Text as={Col}>
                            <strong>nombre client	:</strong> {Licence.nombreclient}
                        </Card.Text>
                        <Card.Text as={Col}>
                            <strong>nombre Article :</strong> {Licence.nombreArticle}
                        </Card.Text>
                        </Row>

                        <Card.Text as={Col}>
                            <strong>Créé le:</strong> {extractDate(Licence.createdAt)}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default LicenceView;
