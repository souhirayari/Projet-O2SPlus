import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Result } from "antd";

export default function PageConfimation() {
    const { activationCode } = useParams();

    useEffect(() => {
        async function confirmation() {
            try {
                const res = await fetch(`http://localhost:5000/api/auth/verifyUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ activationCode }) // Envoie l'activationCode dans le corps de la requête
                });
                const data = await res.json();
                console.log(data);
                // Ajoute ici le traitement des données reçues si nécessaire
            } catch (err) {
                console.error('Error:', err);
                // Gère les erreurs ici si nécessaire
            }
        }

        // Appelle la fonction confirmation lors de l'initialisation de la page
        confirmation();
    }, [activationCode]); // Assure-toi d'inclure activationCode comme dépendance du useEffect pour qu'il soit rappelé lorsque l'activationCode change

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Result
                status="success"
                title="Successfully Confimation Mail!"
                subTitle="vous pouvez revenir à Connexion."
                extra={[
                    <Button type="primary" key="console">
                        <a href="/SignIn">Sign In</a>
                    </Button>,
                    <Button key="buy">Close</Button>,
                ]}
            />
        </div>
    );
}
