import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Assurez-vous d'importer FontAwesomeIcon
import { faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons'; // Importer les icônes de la bibliothèque FontAwesome
import UpdateLicence from '../UpdateComponent/UpdateLicence';
import { toast } from "react-toastify";


function Licence({ searchTerm }) {

    const [licences, setlicence] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedLicence, setSelectedlicence] = useState(null); // Ajout de l'état pour le dossier sélectionné

    const tokenString = localStorage.getItem('token');
    const token = JSON.parse(tokenString);
    useEffect(() => {
        async function fetchData() {
            try {


                const reslicence = await fetch('http://localhost:5000/api/licence/findAll', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
                    }
                });

                if (!reslicence.ok) {
                    if (reslicence.status === 404) {
                        setlicence([]);
                    } else {
                        throw new Error('Erreur lors de la récupération des dossiers');
                    }
                } else {
                    const jsonlicence = await reslicence.json();
                    setlicence(jsonlicence);
                }
            } catch (error) {
                console.error('Erreur fetchData:', error);
            }
        }

        fetchData();
    }, []);

    const handleDeleteLicence = async (id) => {
        try {
            const reslicence = await fetch(`http://localhost:5000/api/licence/delete/${id}`, {
                method: "DELETE",

                headers: {
                    'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
                }

            });

            if (!reslicence.ok) {
                throw new Error('Erreur lors de la suppression de user');
            } else {
                toast.success('La suppression a été effectuée avec succès!');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            console.error('Erreur handleDeleteLicence:', error);
        }
    }
    const handleClose = () => setShow(false);

    const extractDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    const filteredLicence = licences.filter(licence => {
        const statutMatch = licence.statut.toLowerCase().includes(searchTerm.toLowerCase());
        const dateDebutMatch = extractDate(licence.DateDebut).includes(searchTerm);
        return statutMatch || dateDebutMatch;
    });

    return (
        <>
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date Validation</th>
                        <th>Date Debut</th>
                        <th>Date Fin</th>
                        <th>Statut</th>
                        <th>Dossier</th>
                        <th>Crée le </th>

                        <th colSpan="3">Action</th>



                    </tr>
                </thead>
                <tbody className='TabAff'>
                    {filteredLicence.length === 0 ? (
                        <tr>
                            <td colSpan="7">Aucune licence disponible</td>
                        </tr>
                    ) :
                        (filteredLicence.map((licence, index) => (
                            <tr key={index}>
                                <td><input type="checkbox" name="" id="" /></td>
                                <td>{licence.Datevalidation}</td>
                                <td>{licence.DateDebut}</td>
                                <td>{licence.DateFin}</td>
                                <td>{licence.statut}</td>
                                <td>{licence.Dossier.RaisonSociale}</td>
                                <td>{extractDate(licence.createdAt)}</td>

                                <td className='btnEdit' onClick={() => { setShow(true); setSelectedlicence(licence); }}>Edit</td>
                                <td className='btnView'><a href={`/licence/${licence.idLicence}`}><FontAwesomeIcon icon={faEye} /></a></td>
                                <td className='btnsupp' onClick={() => handleDeleteLicence(licence.idLicence)}><FontAwesomeIcon icon={faTrashCan} /></td>

                            </tr>
                        )))}
                </tbody>
            </Table>
            <UpdateLicence show={show} handleClose={handleClose} licence={selectedLicence} />
        </>
    );
}

export default Licence;
