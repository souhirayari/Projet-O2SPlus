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

function AddFamilleClient() {
    const currentPageUrl = window.location.pathname;
    const newUrl = currentPageUrl.replace('/ajouterfamilleclient', '');

    const tokenString = localStorage.getItem('token');
    const token = JSON.parse(tokenString);
    const dossierId = localStorage.getItem('dossierId')
    const [Tarifs, setTarif] = useState([])
    const [Modes, setMode] = useState([])
    const [Vendeurs, setvendeur] = useState([])


    const [formData, setFormData] = useState({
        CodeFamilleClient: '',
        Libelle: '',
        dossierId: dossierId,
        modeReglementId: '',
        typeTarifId: '',
        vendeurId: ''

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

    };

    useEffect(() => {
        async function fetchData() {
            try {
                // Utilisation de Promise.all pour attendre que les deux requêtes soient terminées
                const [TarifResponse, ModeResponse, VendeurResponse] = await Promise.all([
                    fetch(`http://localhost:5000/api/article/findAllTypeTarifbyDossier/${dossierId}`, {
                        headers: {
                            'authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
                        }
                    }),
                    fetch(`http://localhost:5000/api/article/findAllModeRegl/${dossierId}`, {
                        headers: {
                            'authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
                        }
                    }),
                    fetch(`http://localhost:5000/api/vendeur/getAllVendeurByDossier/${dossierId}`, {
                        headers: {
                            'authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
                        }
                    })
                ]);
                // Vérification de la réponse pour la famille
                if (!TarifResponse.ok) {
                    if (TarifResponse.status === 404) {
                        setFamille([]);
                    } else {
                        toast.error('Erreur lors de la récupération des Type tarif')
                        throw new Error('Erreur lors de la récupération des Type tarif');
                    }
                } else {
                    const TarifData = await TarifResponse.json();
                    setTarif(TarifData);
                }

                // Vérification de la réponse pour la marque
                if (!ModeResponse.ok) {
                    if (ModeResponse.status === 404) {
                        setMarque([]);
                    } else {
                        toast.error('Erreur lors de la récupération des Mode Réglement')
                        throw new Error('Erreur lors de la récupération des mode réglemnt');
                    }
                } else {
                    const ModeData = await ModeResponse.json();
                    setMode(ModeData);
                }
                // Vérification de la réponse pour la marque
                if (!VendeurResponse.ok) {
                    if (VendeurResponse.status === 404) {
                        setvendeur([]);
                    } else {
                        toast.error('Erreur lors de la récupération des Vendeurs')
                        throw new Error('Erreur lors de la récupération des vendeurs');
                    }
                } else {
                    const VendeurData = await VendeurResponse.json();
                    setvendeur(VendeurData);
                }
            } catch (error) {
                toast.error('Erreur lors de la récupération de données')
                console.error('Erreur fetchData:', error);
            }
        }
        fetchData();


    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Vérifier si tous les champs obligatoires sont remplis
        const requiredFields = ['CodeFamilleClient', 'Libelle', 'modeReglementId', 'vendeurId', 'typeTarifId'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            toast.error(`Les champs suivants sont obligatoires : ${missingFields.join(', ')}`);
            return;
        }

        // Générer un mot de passe unique de 8 caractères
        console.log(formData)

        try {
            const response = await fetch('http://localhost:5000/api/familleclient/addFamilleClient',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,// Ajout du token d'authentification dans le header
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...formData })
                });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout du famille');
            }

            toast.success('famille ajouté avec succès !');

            setTimeout(() => {
                window.location.replace(newUrl);
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de la Ajout du famille client:', error.message);
            toast.error('Erreur lors de la Ajout du famille client');
        }
    };
    return (
        <div>
            <div className='Revenir'>
                <a href={newUrl}><FontAwesomeIcon icon={faArrowLeft} size="xl" style={{ color: "#5856d6", }} /> Familles Clients </a>
            </div>
            <Form className='formulaire'>
                <h3>Ajouter Famille Client</h3>
                <br />
                <div className='BoxAjout'>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridRaisonsociale">
                            <Form.Label>* Code Famille Client </Form.Label>
                            <Form.Control type="text" name='CodeFamilleClient' onChange={handleChange} placeholder="Enter Code Famille Client " required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPrenom">
                            <Form.Label>* Libelle</Form.Label>
                            <Form.Control type="text" name='Libelle' onChange={handleChange} placeholder="Enter libelle " />
                        </Form.Group>
                    </Row>
                    <br />
                    <Row >
                        <Form.Group as={Col} controlId="formGridRaisonsociale">
                            <Form.Label>* Type Tarif </Form.Label>
                            <Form.Select name='typeTarifId' onChange={handleChange} required>
                                <option value="">Sélectionnez une Type Tarif</option>
                                {Tarifs && (Tarifs.map((tarif) => (
                                    <option key={tarif.idTypetarif} value={tarif.idTypetarif}>{tarif.libelle}</option>
                                )))}
                            </Form.Select>                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPrenom">
                            <Form.Label>* Mode Réglement</Form.Label>
                            <Form.Select name='modeReglementId' onChange={handleChange} required>
                                <option value="">Sélectionnez un Mode Réglement</option>
                                {Modes && (Modes.map((mode) => (
                                    <option key={mode.idReg} value={mode.idReg}>{mode.libelle}</option>
                                )))}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <br />
                    <Form.Group as={Col} controlId="formGridPrenom">
                        <Form.Label>* Vendeur</Form.Label>
                        <Form.Select name='vendeurId' onChange={handleChange} required>
                            <option value="">Sélectionnez un Vendeur </option>
                            {Vendeurs && (Vendeurs.map((vendeur) => (
                                <option key={vendeur.id} value={vendeur.id}>{vendeur.Nom}</option>
                            )))}
                        </Form.Select>
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit" className='btnAjout' onClick={handleSubmit}>
                        Ajouter Famille Client
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default AddFamilleClient