import React, { useState, useEffect } from 'react'
import SideBar from "../SideBar/SideBar"
import ProfileHeader from './ProfileHeader'
import BodyProfile from './BodyProfile'




function Profile() {

  // Récupérer les données utilisateur depuis localStorage et les convertir en objet JavaScript
  const userId = JSON.parse(localStorage.getItem('userId'));
  const [UserInfo, setUserInfo] = useState({});
  const tokenString = localStorage.getItem('token');
  const token = JSON.parse(tokenString);


  useEffect(() => {
    async function getData() {
      try {
        const resUserInfo = await fetch(`http://localhost:5000/api/users/findOneUser/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
          }
        });

        if (!resUserInfo.ok) {
          return console.log("erreur fetching data");

        }

        const jsonUserInfo = await resUserInfo.json();
        setUserInfo(jsonUserInfo.user);

      } catch (err) {
        console.error("erreur dans getData BodyProfile", err);
      }
    }

    getData();
  }, [userId]); // Ajoutez UserInfoId en tant que dépendance pour recharger les données lorsque l'ID du UserInfo change
  console.log(UserInfo.avatar)
  return (

    <div>
      <SideBar />
      <div className='box'>
        <div className='Exemple'></div>

        <BodyProfile UserInfo={UserInfo} />
        <ProfileHeader avatar={UserInfo.avatar} />
      </div>
    </div>
  )

}

export default Profile
