import React, { useEffect } from 'react'
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

function AddFamilleArticle() {
    const currentPageUrl = window.location.pathname;
    const newUrl = currentPageUrl.replace('/ajouterfamillearticle', '');
    const [Fournisseurs, setFournisseurs] = useState([])
    const [Tarifs, settarif] = useState([])


    const tokenString = localStorage.getItem('token');
    const token = JSON.parse(tokenString);
    const dossierId = localStorage.getItem('dossierId')

    const [formData, setFormData] = useState({
        codefamille: '',
        libelle: '',
        dossierId: dossierId,
        coefficient: '',
        valorisation: '',
        delaisliv: '',
        principale: '',
        equivStokage: '',
        idFournisseur: '',
        idTarif: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFormData({
            ...formData,
            [name]: value
        });

    };
    useEffect(() => {
        async function fetchData() {
            try {
                // Utilisation de Promise.all pour attendre que les deux requêtes soient terminées
                const [tarifResponse, fournissueurRes] = await Promise.all([
                    fetch(`http://localhost:5000/api/article/findAllTypeTarifbyDossier/${dossierId}`, {
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
                if (!tarifResponse.ok) {
                    if (tarifResponse.status === 404) {
                        settarif([]);
                    } else {
                        throw new Error('Erreur lors de la récupération des tarifs');
                    }
                } else {
                    const tarifData = await tarifResponse.json();
                    settarif(tarifData);
                }
                // Vérification de la réponse pour la marque
                if (!fournissueurRes.ok) {
                    if (fournissueurRes.status === 404) {
                        setFournisseurs([]);
                    } else {
                        throw new Error('Erreur lors de la récupération des fournissuer');
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
        // Vérifier si tous les champs obligatoires sont remplis
        const requiredFields = ['codefamille', 'libelle', 'coefficient', 'valorisation'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            toast.error(`Les champs suivants sont obligatoires : ${missingFields.join(', ')}`);
            return;
        }

        // Générer un mot de passe unique de 8 caractères
        console.log(formData)

        try {
            const response = await fetch('http://localhost:5000/api/article/AddFamille',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,// Ajout du token d'authentification dans le header
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...formData })
                });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message, ' essayer une autre .. !');
                throw new Error('Erreur lors de l\'ajout du Famille Article');
            }

            toast.success('famille article ajouté avec succès !');

            setTimeout(() => {
                window.location.replace(newUrl);
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de la Ajout duFamille Articlet:', error.message);
            toast.error('Erreur lors de la Ajout du Famille Article');
        }
    };
    return (
        <div>
            <div className='Revenir'>
                <a href={newUrl}><FontAwesomeIcon icon={faArrowLeft} size="xl" style={{ color: "#5856d6", }} /> Famille Articles </a>
            </div>
            <Form className='formulaire'>
                <h3>Ajouter un Famille Article</h3>
                <br />
                <div className='BoxAjout'>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridRaisonsociale">
                            <Form.Label>* Code Famille Article </Form.Label>
                            <Form.Control type="text" name='codefamille' onChange={handleChange} placeholder="Enter code famille " required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPrenom">
                            <Form.Label>* Libelle</Form.Label>
                            <Form.Control type="text" name='libelle' onChange={handleChange} placeholder="Enter libelle " />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridNom">
                            <Form.Label>* Valorisation </Form.Label>
                            <Form.Select name='valorisation' onChange={handleChange}>
                                <option value="">Sélectionnez un valorisation </option>
                                <option value="P">PEMP</option>
                                <option value="D">Der Pa</option>

                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridNom">
                            <Form.Label>* Coefficient</Form.Label>
                            <Form.Control type="number" name='coefficient' min='0' onChange={handleChange} placeholder="Enter coefficient " />
                        </Form.Group>

                    </Row>
                    <br />
                    <Row>
                        <Form.Group as={Col} controlId="formGridNom">
                            <Form.Label>*Fournisseur </Form.Label>
                            <Form.Select name='idFournisseur' onChange={handleChange}>
                                <option value="">Sélectionnez un Fournisseusr </option>
                                {Fournisseurs && (Fournisseurs.map((fournisseur) => (
                                    <option value={fournisseur.idFournisseur} key={fournisseur.idFournisseur}>{fournisseur.nom}</option>
                                )))}

                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridNom">
                            <Form.Label>Delais Livraison</Form.Label>
                            <Form.Control type="number" name='delaisliv' min='0' onChange={handleChange} placeholder="Enter delais livraison " />
                        </Form.Group>
                    </Row>
                    <br />
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridRaisonsociale">
                            <Form.Label>équivalent Stokage </Form.Label>
                            <Form.Control type="text" name='equivStokage' onChange={handleChange} placeholder="Enter Equivalent " required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPrenom">
                            <Form.Label>Principale</Form.Label>
                            <Form.Select name='principale' onChange={handleChange}>
                                <option value="">Sélectionnez un oui ou non </option>
                                <option value="oui">oui</option>
                                <option value="non">non</option>

                            </Form.Select>

                        </Form.Group>
                    </Row>


                    <Form.Group as={Col} controlId="formGridNom">
                        <Form.Label>* Type Tarif </Form.Label>
                        <Form.Select name='idTarif' onChange={handleChange}>
                            <option value="">Sélectionnez un Type Tarif </option>
                            {Tarifs && (Tarifs.map((tarif) => (
                                <option value={tarif.idTypetarif} key={tarif.idTypetarif}>{tarif.libelle}</option>
                            )))}
                        </Form.Select>
                    </Form.Group>

                    <br />
                    <Button variant="primary" type="submit" className='btnAjout' onClick={handleSubmit}>
                        Ajouter Famille Article
                    </Button>
                </div>
            </Form>

        </div>
    )
}

export default AddFamilleArticle