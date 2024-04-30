import React, { useState, useEffect } from 'react';
import '../../Style/SignIn.css';
import { toast } from "react-toastify";

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
            if (data.success) {
                localStorage.setItem('userId', JSON.stringify(data.user.id));
                localStorage.setItem('token', JSON.stringify(data.token));
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
            <div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right ">
                        <h1 className='h1SignIn'>Hello, Friend!</h1>
                        <p className='PSignIn'>Enter your personal details and start journey with us</p>
                    </div>
                </div>
            </div>
            <div className="form-container sign-in-container">
                <form className='formSign' onSubmit={handleSubmit}>
                    <h1 className='h1SignIn'>Sign In</h1>
                    <br />
                    <input className='inputSignIn' type="text" name="login" placeholder="Email" value={formData.login} onChange={handleChange} />
                    <input className='inputSignIn' type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                    <br />
                    <button className='btnSignIn' type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
