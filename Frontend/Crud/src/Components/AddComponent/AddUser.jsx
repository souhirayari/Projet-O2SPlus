import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { countries } from 'countries-list';

function generatePassword(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

function AddUser() {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        Role: '',
        dossierId: '',
        nom: '',
        prenom: '',
        genre: '',
        dateNaissance: '',
        email: '',
        emploi: '',
        adresse: '',
        ville: '',
        codePostal: '',
        pays: '',
        statut: '',
        codeUser: '',
        avatar: ''
    });

    const [dossiers, setDossiers] = useState([]);
    const [showDossierSelect, setShowDossierSelect] = useState(false);
    
    const tokenString = localStorage.getItem('token');
    const token = JSON.parse(tokenString);

    useEffect(() => {
        const fetchDossiers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/dossier/findAll', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
                    }
                });
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des dossiers');
                }
                const data = await response.json();
                setDossiers(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des dossiers:', error);
            }
        };

        fetchDossiers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (name === 'Role' && (value === 'adminDossier' || value === 'user')) {
            setShowDossierSelect(true);
        } else {
            setShowDossierSelect(false);
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatarFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({
                ...formData,
                avatar: reader.result // Convertit l'image en base64 et l'ajoute au state
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPassword = generatePassword(8);
        // Vérifier si tous les champs obligatoires sont remplis
        const requiredFields = ['login', 'Role', 'nom', 'email', 'statut', 'codeUser'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            toast.error(`Les champs suivants sont obligatoires : ${missingFields.join(', ')}`);
            return;
        }

        // Générer un mot de passe unique de 8 caractères
        console.log(formData)

        try {
            const response = await fetch('http://localhost:5000/api/users/Add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}` ,// Ajout du token d'authentification dans le header
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData, password: newPassword })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout du User');
            }

            toast.success('User ajouté avec succès !');

            setTimeout(() => {
                window.location.replace('/Utilisateurs');
            }, 1000);
        } catch (error) {
            console.error('Erreur lors de la Ajout du User:', error.message);
            toast.error('Erreur lors de la Ajout du User');
        }
    };

    const countryOptions = Object.entries(countries).map(([countryCode, country]) => (
        <option key={countryCode} value={countryCode}>{`${countryCode} - ${country.name}`}</option>
    ));

    return (
        <Form className='formulaire'>
            <h3>Ajouter un Utilisateur</h3>
            <br />
            <div className='BoxAjout'>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridRaisonsociale">
                        <Form.Label> Login </Form.Label>
                        <Form.Control type="text" name='login' onChange={handleChange} placeholder="Enter login" required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridMatriculeFiscale">
                        <Form.Label>password</Form.Label>
                        <Form.Control type="text" name='password' onChange={handleChange} value={formData.password} readOnly placeholder="Auto-generated Password" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridNom">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" name='nom' onChange={handleChange} placeholder="Enter Nom" required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPrenom">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control type="text" name='prenom' onChange={handleChange} placeholder="Enter Prénom" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridSexe">
                        <Form.Label>Genre</Form.Label>
                        <Form.Select name='genre' onChange={handleChange}>
                            <option value="">Sélectionnez un sexe</option>
                            <option value="H">Homme</option>
                            <option value="F">Femme</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDateNaissance">
                        <Form.Label>Date de Naissance</Form.Label>
                        <Form.Control type="date" name='dateNaissance' onChange={handleChange} />
                    </Form.Group>
                </Row>
                <br />
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCodeUser">
                        <Form.Label>Code User</Form.Label>
                        <Form.Control type="text" name='codeUser' onChange={handleChange} placeholder="Enter Code User" required />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name='email' onChange={handleChange} placeholder="Enter Email" required />
                    </Form.Group>
                </Row>
                <br />
                <Form.Group as={Col} controlId="formGridEmploi">
                    <Form.Label>Emploi</Form.Label>
                    <Form.Control type="text" name='emploi' onChange={handleChange} placeholder="Enter Emploi" />
                </Form.Group>
                <br />
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPays">
                        <Form.Label>Pays</Form.Label>
                        <Form.Select name='pays' onChange={handleChange} value={formData.pays}>
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
                <br />
                <Form.Group className="mb-3" controlId="formGridAvatar">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control type="file" name="avatar" onChange={handleAvatarChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridStatut">
                    <Form.Label>Statut</Form.Label>
                    <Form.Select name='statut' onChange={handleChange} required>
                        <option value="">Sélectionnez un statut</option>
                        <option value="Actif">Actif</option>
                        <option value="Suspendu">Suspendu</option>
                        <option value="Inactif">Inactif</option>
                        <option value="Retraité">Retraité</option>
                    </Form.Select>
                </Form.Group>

                <br />
                <Form.Group className="mb-3" controlId="formGridRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Select name='Role' onChange={handleChange} required>
                        <option value="">Sélectionnez un rôle</option>
                        <option value="adminSite">adminSite</option>
                        <option value="adminDossier">adminDossier</option>
                        <option value="user">user</option>
                    </Form.Select>
                </Form.Group>

                {showDossierSelect && (
                    <Form.Group className="mb-3" controlId="formGridDossier">
                        <Form.Label>Sélectionnez un dossier</Form.Label>
                        <Form.Select name='dossierId' onChange={handleChange} required>
                            <option value="">Sélectionnez un dossier</option>
                            {dossiers.map(dossier => (
                                <option key={dossier.id} value={dossier.id}>{dossier.RaisonSociale}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                )}

                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit" className='btnAjout' onClick={handleSubmit}>
                    Ajouter Utilisateur
                </Button>
            </div>
        </Form>
    );
}

export default AddUser;
