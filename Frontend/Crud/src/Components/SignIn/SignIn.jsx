import React, { useState, useEffect } from 'react';
import '../../Style/SignIn.css';
import { toast } from "react-toastify";
import image from '../../assets/login.jpg'
import logo from '../../assets/logo.png'

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
        <body className='BodySignIn'>
        <div className='minlayoutimg'>
                <img src={logo} alt="sign up image" />

            </div>
        <div className="signin-content">
            <div className="signin-image">
                <figure><img src={image} alt="sign up image" /></figure>
            </div>
            
            <div className="signin-form">
                <h1 className="form-title">Bonjour</h1>
                <h2 className="form-title">Sign up</h2>
                <form method="POST" id="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="your_name"><FontAwesomeIcon icon={faUser} /></label>
                        <input type="text" name="login" id="your_name" placeholder="Your Name" value={formData.login}
                            onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="your_pass"><FontAwesomeIcon icon={faLock} /></label>
                        <input type="password" name="password" id="your_pass" placeholder="Password"  value={formData.password}
                            onChange={handleChange}/>
                    </div>

                    <div className="form-group form-button">
                        <input type="submit" name="signin" id="signin" className="form-submit" value="Log in" />
                    </div>
                </form>

            </div>
        </div>
        </body>
        </>


    );
}

export default SignIn;
