import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBarView from '../NavBar/NavBarView';
import UserView from '../View/UserView';

function DashBordUser() {
    const { userId } = useParams();
    const [User, setUser] = useState({}); 

    const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
    const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
    useEffect(() => {
        async function getData() {
            try {
                const resUser = await fetch(`http://localhost:3000/api/users/findOneUser/${userId}`,{
                    headers: {
                        'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
                    }
                });

                if (!resUser.ok) {
                    return console.log("erreur fetching data");

                }

                const jsonUser = await resUser.json();
                setUser(jsonUser.user);

            } catch (err) {
                console.error("erreur dans getData DashBordView", err);
            }
        }

        getData();
    }, [userId]); // Ajoutez UserId en tant que dépendance pour recharger les données lorsque l'ID du User change

    return (
        <div className='box'>
            <NavBarView title={User.nom +' '+User.prenom} />
            <UserView user={User} token={token} />
        </div>
    );
}

export default DashBordUser;
