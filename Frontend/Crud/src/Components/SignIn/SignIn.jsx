import React, { useState, useEffect } from 'react';
import '../../Style/SignIn.css';
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Assurez-vous d'importer FontAwesomeIcon
import {  faUser,faLock } from '@fortawesome/free-solid-svg-icons';


function SignIn() {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log (data)
            if (data.success) {
                localStorage.setItem('userId', JSON.stringify(data.user.id));
                localStorage.setItem('token', JSON.stringify(data.token));

                if (data.user.Role === 'adminDossier' || data.user.Role === 'user'){
                    localStorage.setItem('dossierId', JSON.stringify(data.user.dossierId));  
                }
                // Rediriger vers la page appropriée

                setTimeout(() => {
                    window.location.href = data.redirectPath;
                }, 1000);

            } else {
                toast.error(data.error || "Vérifier login ou password ou mail de vérification");
            }
        } catch (error) {
            console.error('Erreur lors de la vérification des informations d\'identification :', error);
            toast.error("user not found")
        }
    };



    return (
        <>
        <div className="login-root">
      <div className="box-root flex-flex flex-direction--column" style={{ minHeight: '100vh', flexGrow: 1 }}>
        <div className="loginbackground box-background--white padding-top--64">
          <div className="loginbackground-gridContainer">
            <div className="box-root flex-flex" style={{ gridArea: 'top / start / 8 / end' }}>
              <div className="box-root" style={{ backgroundImage: 'linear-gradient(white 0%, rgb(247, 250, 252) 33%)', flexGrow: 1 }}>
              </div>
            </div>
            <div className="box-root flex-flex" style={{ gridArea: '4 / 2 / auto / 5' }}>
              <div className="box-root box-divider--light-all-2 animationLeftRight tans3s" style={{ flexGrow: 1 }}></div>
            </div>
            <div className="box-root flex-flex" style={{ gridArea: '6 / start / auto / 2' }}>
              <div className="box-root box-background--blue800" style={{ flexGrow: 1 }}></div>
            </div>
            <div className="box-root flex-flex" style={{ gridArea: '7 / start / auto / 4' }}>
              <div className="box-root box-background--blue animationLeftRight" style={{ flexGrow: 1 }}></div>
            </div>
            <div className="box-root flex-flex" style={{ gridArea: '8 / 4 / auto / 6' }}>
              <div className="box-root box-background--gray100 animationLeftRight tans3s" style={{ flexGrow: 1 }}></div>
            </div>
            <div className="box-root flex-flex" style={{ gridArea: '2 / 15 / auto / end' }}>
              <div className="box-root box-background--cyan200 animationRightLeft tans4s" style={{ flexGrow: 1 }}></div>
            </div>
            <div className="box-root flex-flex" style={{ gridArea: '3 / 14 / auto / end' }}>
              <div className="box-root box-background--blue animationRightLeft" style={{ flexGrow: 1 }}></div>
            </div>
            <div className="box-root flex-flex" style={{ gridArea: '4 / 17 / auto / 20' }}>
              <div className="box-root box-background--gray100 animationRightLeft tans4s" style={{ flexGrow: 1 }}></div>
            </div>
            <div className="box-root flex-flex" style={{ gridArea: '5 / 14 / auto / 17' }}>
              <div className="box-root box-divider--light-all-2 animationRightLeft tans3s" style={{ flexGrow: 1 }}></div>
            </div>
          </div>
        </div>
        <div className="box-root padding-top--24 flex-flex flex-direction--column" style={{ flexGrow: 1, zIndex: 9 }}>
          <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
            <h1><a href="https://www.o2splus.com.tn/" rel="dofollow">Optima software Servises Plus</a></h1>
          </div>
          <div className="formbg-outer">
            <div className="formbg">
              <div className="formbg-inner padding-horizontal--48">
                <span className="padding-bottom--15">Sign in to your account</span>
                <form id="stripe-login" onSubmit={handleSubmit}>
                  <div className="field padding-bottom--24">
                    <label htmlFor="email"> <FontAwesomeIcon icon={faUser} /> Email</label>
                    <input type="email" placeholder='xxxxx@gmail.com' name='login' value={formData.login} onChange={handleChange}/>
                  </div>
                  <div className="field padding-bottom--24">
                    <div className="grid--50-50">   
                      <label htmlFor="password"> <FontAwesomeIcon icon={faLock}  /> Password</label>
                     
                    </div>
                    <input type="password" name="password" placeholder='*********' value={formData.password} onChange={handleChange} />
                  </div>
                
                  <div className="field padding-bottom--24">
                    <input type="submit" name="submit" value="Continue" />
                  </div>
                  
                </form>
              </div>
            </div>
            <div className="footer-link padding-top--24">
              <span>« Votre avenir est créé par ce que vous faites aujourd’hui, pas demain. »</span>
              <span>Robert T. Kiyosaki,</span>
              <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                
                <span><a href="#">Contact</a></span>
                <span><a href="#">Privacy & terms</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        </>


    );
}

export default SignIn;
