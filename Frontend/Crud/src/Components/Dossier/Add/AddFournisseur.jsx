import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';
import { countries } from 'countries-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function AddFournisseur() {
    const currentPageUrl = window.location.pathname;
    const newUrl = currentPageUrl.replace('/ajouterfournisseur', '');

    const tokenString = localStorage.getItem('token');
    const token = JSON.parse(tokenString);
    const dossierId = localStorage.getItem('dossierId');
    const [moderegl, setModeRegl] = useState([]);

    const [formData, setFormData] = useState({
        codeFournisseur :'',
        genre:'',
        nom:'',
        prenom:'',
        adresse:'',
        codePostal:'',
        ville:'',
        telephone:'',
        mobile:'',
        pays:'',
        email:'',
        siteWeb:'',
        delais:'',
        idReg:'',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        const fetchModeRegl = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/article/findAllModeRegl/${dossierId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des modes de règlement');
                }
                const data = await response.json();
                setModeRegl(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des modes de règlement:', error);
                toast.error('Erreur lors de la récupération des modes de règlement');
            }
        };

        fetchModeRegl();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ['nom', 'prenom', 'genre', 'email', 'codeFournisseur', 'idReg'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            toast.error(`Les champs suivants sont obligatoires : ${missingFields.join(', ')}`);
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/article/AddFournisseur/${dossierId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout du fournisseur');
            }

            toast.success('Fournisseur ajouté avec succès !');
            setTimeout(() => {
                window.location.replace(newUrl);
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du fournisseur:', error.message);
            toast.error('Erreur lors de l\'ajout du fournisseur');
        }
    };

    const countryOptions = Object.entries(countries).map(([countryCode, country]) => (
        <option key={countryCode} value={countryCode}>{`${countryCode} - ${country.name}`}</option>
    ));

    return (
        <>
            <div className='Revenir'>
                <a href={newUrl}><FontAwesomeIcon icon={faArrowLeft} size="xl" style={{ color: "#5856d6" }} /> Fournisseurs </a>
            </div>
            <Form className='formulaire' onSubmit={handleSubmit}>
                <h3>Ajouter un Fournisseur</h3>
                <br />
                <div className='BoxAjout'>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridNom">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control type="text" name='nom' onChange={handleChange} placeholder="Enter Nom" required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPrenom">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control type="text" name='prenom' onChange={handleChange} placeholder="Enter Prénom" required />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridSexe">
                            <Form.Label>Genre</Form.Label>
                            <Form.Select name='genre' onChange={handleChange}>
                                <option value="">Sélectionnez un sexe</option>
                                <option value="Homme">Homme</option>
                                <option value="Femme">Femme</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCodeFournisseur">
                            <Form.Label>Code Fournisseur</Form.Label>
                            <Form.Control type="text" name='codeFournisseur' onChange={handleChange} placeholder="Enter Code Fournisseur" required />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridTelephone">
                            <Form.Label>Téléphone</Form.Label>
                            <Form.Control type="text" name='telephone' onChange={handleChange} placeholder="Enter Téléphone" required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridMobile">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control type="text" name='mobile' onChange={handleChange} placeholder="Enter Mobile" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name='email' onChange={handleChange} placeholder="Enter Email" required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridDelais">
                            <Form.Label>Délais</Form.Label>
                            <Form.Control type="number" name='delais' onChange={handleChange} placeholder="Enter Délais" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridPays">
                            <Form.Label>Pays</Form.Label>
                            <Form.Select name='pays' onChange={handleChange}>
                                <option value="">Choisissez un pays...</option>
                                {countryOptions}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridAdresse">
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control type="text" name='adresse' onChange={handleChange} placeholder="Enter Adresse" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridVille">
                            <Form.Label>Ville</Form.Label>
                            <Form.Control type="text" name='ville' onChange={handleChange} placeholder="Enter Ville" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCodePostal">
                            <Form.Label>Code Postal</Form.Label>
                            <Form.Control type="text" name='codePostal' onChange={handleChange} placeholder="Enter Code Postal" />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="formGridModeReglement">
                        <Form.Label>Sélectionnez un mode de règlement</Form.Label>
                        <Form.Select name='idReg' onChange={handleChange} required>
                            <option value="">Sélectionnez un mode de règlement...</option>
                            {moderegl.map(mode => (
                                <option key={mode.idReg} value={mode.idReg}>{mode.libelle}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit" className='btnAjout'>
                        Ajouter Fournisseur
                    </Button>
                </div>
            </Form>
        </>
    );
}

export default AddFournisseur;
