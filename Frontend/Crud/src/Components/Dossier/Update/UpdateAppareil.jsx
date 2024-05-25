import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';


function UpdateAppareil({ show, handleClose, appareil }) {
    const [Familles, setFamille] = useState([]);
    const [clients, setClients] = useState([]);
    const [Articles, setArticle] = useState([]);

    const tokenString = localStorage.getItem('token');
    const token = tokenString ? JSON.parse(tokenString) : null;
    const dossierId = localStorage.getItem('dossierId');

    const [formData, setFormData] = useState({
        codeAppareil: '',
        libelle: '',
        numSerie: '',
        idArticle: '',
        idFamArt: '',
        clientId: '',
        modele: '',
        typeModele: '',
        puissance: '',
        TVA: 0.0,
        prixAchat: 0.0,
        prixTTC: 0.0,
        prixHT: 0.0,
        debutGarantie: '',
        finGarantie: '',
        dureeGarantie: '',
        genre: '',
        couverture: '',
        condition: '',
        note: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const [familleResponse, articleResponse, clientResponse] = await Promise.all([
                    fetch(`http://localhost:5000/api/article/findAllFamillebydossier/${dossierId}`, {
                        headers: {
                            'authorization': `Bearer ${token}`
                        }
                    }),
                    fetch(`http://localhost:5000/api/article/findAllArticlebyDossier/${dossierId}`, {
                        headers: {
                            'authorization': `Bearer ${token}`
                        }
                    }),
                    fetch(`http://localhost:5000/api/client/getAllClientByDossier/${dossierId}`, {
                        headers: {
                            'authorization': `Bearer ${token}`
                        }
                    })
                ]);

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

                if (!articleResponse.ok) {
                    if (articleResponse.status === 404) {
                        setArticle([]);
                    } else {
                        throw new Error('Erreur lors de la récupération des articles');
                    }
                } else {
                    const articleData = await articleResponse.json();
                    setArticle(articleData);
                }

                if (!clientResponse.ok) {
                    if (clientResponse.status === 404) {
                        setClients([]);
                    } else {
                        throw new Error('Erreur lors de la récupération des clients');
                    }
                } else {
                    const clientsData = await clientResponse.json();
                    setClients(clientsData);
                }
            } catch (error) {
                console.error('Erreur fetchData:', error);
            }
        }
        fetchData();
    }, [dossierId, token]);

    useEffect(() => {
        if (appareil) {
            setFormData({
                codeAppareil: appareil.codeAppareil || '',
                numSerie: appareil.numSerie || '',
                libelle: appareil.libelle || '',
                modele: appareil.modele || '',
                typeModele: appareil.typeModele || '',
                puissance: appareil.puissance || '',
                TVA: appareil.TVA || '',
                prixAchat: appareil.prixAchat || '',
                prixTTC: appareil.prixTTC || '',
                prixHT: appareil.prixHT || '',
                durreGarantie: appareil.durreGarantie || '',
                couverture: appareil.couverture || '',
                condition: appareil.condition || '',
                debutGarantie: appareil.debutGarantie || '',
                finGarantie: appareil.finGarantie || '',
                note: appareil.note || '',
                genre: appareil.genre || '',
                idFamArt: appareil.Article.idFamArt || '',
                clientId: appareil.clientId || '',
                idArticle: appareil.idArticle || '',

            });
        }
    }, [appareil]);

    const handleArticleChange = (e) => {
        const ArticleId = parseInt(e.target.value);
        const selectedArticle = Articles.find((A) => A.idArticle === ArticleId);

        if (selectedArticle) {
            setFormData(prevState => ({
                ...prevState,
                idArticle: ArticleId,
                idFamArt: selectedArticle.idFamArt,
                idMarque: selectedArticle.idMarque,
                modele: selectedArticle.modele,
                typeModele: selectedArticle.typeModele,
                puissance: selectedArticle.puissance,
                prixAchat: selectedArticle.prixAchat,
                prixTTC: selectedArticle.prixTTC,
                prixHT: selectedArticle.prixHT,
                TVA: selectedArticle.TVA,
                dureeGarantie: selectedArticle.dureeGarantie,
                condition: selectedArticle.condition,
                couverture: selectedArticle.couverture
            }));
        }
    };


    useEffect(() => {
        async function fetchData() {
            try {
                const [familleResponse, articleResponse, clientResponse] = await Promise.all([
                    fetch(`http://localhost:5000/api/article/findAllFamillebydossier/${dossierId}`, {
                        headers: {
                            'authorization': `Bearer ${token}`
                        }
                    }),
                    fetch(`http://localhost:5000/api/article/findAllArticlebyDossier/${dossierId}`, {
                        headers: {
                            'authorization': `Bearer ${token}`
                        }
                    }),
                    fetch(`http://localhost:5000/api/client/getAllClientByDossier/${dossierId}`, {
                        headers: {
                            'authorization': `Bearer ${token}`
                        }
                    })
                ]);

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

                if (!articleResponse.ok) {
                    if (articleResponse.status === 404) {
                        setArticle([]);
                    } else {
                        throw new Error('Erreur lors de la récupération des articles');
                    }
                } else {
                    const articleData = await articleResponse.json();
                    setArticle(articleData);
                }

                if (!clientResponse.ok) {
                    if (clientResponse.status === 404) {
                        setClients([]);
                    } else {
                        throw new Error('Erreur lors de la récupération des clients');
                    }
                } else {
                    const clientsData = await clientResponse.json();
                    setClients(clientsData);
                }
            } catch (error) {
                console.error('Erreur fetchData:', error);
            }
        }
        fetchData();
    }, [dossierId, token]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
            const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
            const response = await fetch(`http://localhost:5000/api/article/updateAppareil/${appareil.idAppareil}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du Appareil');
            }

            toast.success('Appareil mis à jour avec succès !');
            handleClose();
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du Appreil:', error.message);
            toast.error('Erreur lors de la mise à jour du Appareil');
        }
    };

    return (
        <div className='EditForm'>
            {appareil && (
                <Modal show={show} onHide={handleClose}  >
                    <Modal.Header closeButton>
                        <Modal.Title>Appareil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCodeArticle">
                                    <Form.Label>Code Appareil</Form.Label>
                                    <Form.Control type="text" name='codeAppareil' value={formData.codeAppareil} onChange={handleChange} placeholder="Entrez le code de l'appareil" required />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridLibelle">
                                    <Form.Label>Numero série</Form.Label>
                                    <Form.Control type="text" name='numSerie' value={formData.numSerie} onChange={handleChange} placeholder="Entrez le Numero de série de l'appareil" required />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridLibelle">
                                    <Form.Label>Libellé</Form.Label>
                                    <Form.Control type="text" name='libelle' value={formData.libelle} onChange={handleChange} placeholder="Entrez le libellé de l'appareil" required />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridFamilleArticle">
                                    <Form.Label>Article</Form.Label>
                                    <Form.Select name='idArticle' onChange={handleArticleChange} value={formData.idArticle} required>
                                        <option value="">Sélectionnez un Article</option>
                                        {Articles && (Articles.map((article) => (
                                            <option key={article.idArticle} value={article.idArticle}>{article.libelle}</option>
                                        )))}
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Form.Group as={Col} controlId="formGridFamilleArticle">
                                <Form.Label>Famille Article</Form.Label>
                                <Form.Select name='idFamArt' onChange={handleChange} value={formData.idFamArt} required>
                                    <option value="">Sélectionnez une Famille Article</option>
                                    {Familles && (Familles.map((famille) => (
                                        <option key={famille.idFamArt} value={famille.idFamArt}>{famille.libelle}</option>
                                    )))}
                                </Form.Select>
                            </Form.Group>
                            <br />
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridClient">
                                    <Form.Label>Client</Form.Label>
                                    <Form.Select name='clientId' onChange={handleChange} value={formData.clientId} required>
                                        <option value="">Sélectionnez un client</option>
                                        {clients && (clients.map((client) => (
                                            <option key={client.id} value={client.id}>{client.Nom}</option>
                                        )))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridModele">
                                    <Form.Label>Modèle</Form.Label>
                                    <Form.Control type="text" name='modele' value={formData.modele} onChange={handleChange} placeholder="Entrez le modèle de l'appareil" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridTypeModele">
                                    <Form.Label>Type Modèle</Form.Label>
                                    <Form.Control type="text" name='typeModele' value={formData.typeModele} onChange={handleChange} placeholder="Entrez le type de modèle de l'appareil" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPuissance">
                                    <Form.Label>Puissance</Form.Label>
                                    <Form.Control type="text" name='puissance' value={formData.puissance} onChange={handleChange} placeholder="Entrez la puissance de l'appareil" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridTVA">
                                    <Form.Label>TVA</Form.Label>
                                    <Form.Control type="number" min="0" name='TVA' value={formData.TVA} onChange={handleChange} placeholder="Entrez la TVA de l'appareil" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPrixAchat">
                                    <Form.Label>Prix Achat</Form.Label>
                                    <Form.Control type="number" min="0" name='prixAchat' value={formData.prixAchat} onChange={handleChange} placeholder="Entrez le prix d'achat de l'appareil" required />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridPrixTTC">
                                    <Form.Label>Prix TTC</Form.Label>
                                    <Form.Control type="number" min="0" name='prixTTC' value={formData.prixTTC} onChange={handleChange} placeholder="Entrez le prix TTC de l'appareil" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPrixHT">
                                    <Form.Label>Prix HT</Form.Label>
                                    <Form.Control type="number" min="0" name='prixHT' value={formData.prixHT} onChange={handleChange} placeholder="Entrez le prix HT de l'appareil" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridDebutGarantie">
                                    <Form.Label>Début de Garantie</Form.Label>
                                    <Form.Control type="date" name='debutGarantie' value={formData.debutGarantie} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridFinGarantie">
                                    <Form.Label>Fin de Garantie</Form.Label>
                                    <Form.Control type="date" name='finGarantie' value={formData.finGarantie} onChange={handleChange} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridDureeGarantie">
                                    <Form.Label>Durée Garantie</Form.Label>
                                    <Form.Control type="number" min="0" name='dureeGarantie' value={formData.dureeGarantie} onChange={handleChange} placeholder="Entrez la durée de garantie de l'appareil" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridGenre">
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Control type="text" name='genre' value={formData.genre} onChange={handleChange} placeholder="Entrez le genre de l'appareil" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCouverture">
                                    <Form.Label>Couverture</Form.Label>
                                    <Form.Select name='couverture' value={formData.couverture} onChange={handleChange} required>
                                        <option value="">Sélectionnez une couverture</option>
                                        <option value="A">Articles</option>
                                        <option value="M">Main d'oeuvre</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCondition">
                                    <Form.Label>Condition</Form.Label>
                                    <Form.Select name='condition' value={formData.condition} onChange={handleChange} required>
                                        <option value="">Sélectionnez une condition</option>
                                        <option value="Sur Site">Sur Site</option>
                                        <option value="Atelier">Atelier</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridNote">
                                    <Form.Label>Note</Form.Label>
                                    <Form.Control as="textarea" rows={3} name='note' value={formData.note} onChange={handleChange} placeholder="Entrez une note" />
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

export default UpdateAppareil;
