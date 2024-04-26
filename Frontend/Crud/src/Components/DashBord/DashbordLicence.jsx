import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBarView from '../NavBar/NavBarView';
import LicenceView from '../View/LicenceView';

function DashBordLicence() {
    const { licenceId } = useParams();
    const [Licence, setLicence] = useState({}); // Initialisez Licence à null pour indiquer qu'aucune donnée n'a encore été chargée
    const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
    const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
    useEffect(() => {
        async function getData() {
            try {
                const resLicence = await fetch(`http://localhost:5000/api/licence/findOne/${licenceId}`,{
                    headers: {
                        'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
                    }
                });

                if (!resLicence.ok) {
                    return console.log("erreur fetching data");

                }

                const jsonLicence = await resLicence.json();
                setLicence(jsonLicence.licence);

            } catch (err) {
                console.error("erreur dans getData DashBordView", err);
            }
        }

        getData();
    }, [licenceId]); // Ajoutez LicenceId en tant que dépendance pour recharger les données lorsque l'ID du Licence change

    return (
        <div className='box'>
            <NavBarView title={Licence.login} />
            <LicenceView Licence={Licence} token={token} />
        </div>
    );
}

export default DashBordLicence;
