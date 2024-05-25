import React, { useState, useEffect } from 'react';
import SideBarD from '../../Components/Dossier/SideBarD';
import NavbarD from './NavbarD';
import { CButton } from '@coreui/react';
import userImage from '../../assets/user.jpg'; // Renamed to avoid confusion with user state
import { toast } from 'react-toastify';
import '../../Style/Dossier/test.css';
import UpdateUserD from '../../Components/Dossier/Update/UpdateUserD';


function ProfileUser() {
    const [visible, setVisible] = useState(true);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({});
    const [showUpdate, setShowUpdate] = useState(false);
    const userId = localStorage.getItem('userId'); // Assume userId is stored in localStorage
    const tokenString = localStorage.getItem('token'); // Assume token is stored in localStorage
    const token = tokenString ? JSON.parse(tokenString) : null; // Parse JSON token

    useEffect(() => {
        async function getData() {
            try {
                const resUser = await fetch(`http://localhost:5000/api/users/findOneUser/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Add the authentication token to the headers
                    }
                });

                if (!resUser.ok) {
                    toast.error('Error fetching user data');
                    return console.log("Error fetching user data");
                }

                const jsonUser = await resUser.json();
                setUser(jsonUser.user);
            } catch (err) {
                console.error("Error in getData ProfileUser", err);
            }
        }

        if (userId && token) {
            getData();
        }
    }, [userId, token]); // Add userId and token as dependencies to reload data when they change
    console.log(user)


    const extractDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    const handleClose = () => setShowUpdate(false);

    return (
        <div className='containerBody'>
            <SideBarD visible={visible} show={show} setShow={setShow} />
            <div className='biglayout'>
                <NavbarD setVisible={setVisible} visible={visible} show={show} setShow={setShow} title={'Profile Utilisateur'} />
                <div className="boxBody">
                    <div>
                        <CButton color="primary" className='btnAjout' onClick={() => { setShowUpdate(true) }}>Modifier le Profile </CButton>
                    </div>
                    <br />
                    <div class="container">
                        <div class="row gutters">
                            <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <div class="account-settings">
                                            <div class="user-profile">
                                                <div class="user-avatar">
                                                    <img src={userImage} alt="Maxwell Admin" />
                                                </div>
                                                <h5 class="user-name">{user.nom}</h5>
                                                <h6 class="user-email">{user.email}</h6>
                                            </div>
                                            <div class="about">
                                                <h5>About</h5>
                                                <p>I'm admin. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <div class="row gutters">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <h6 class="mb-2 text-primary">Personal Details</h6>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div class="form-group">
                                                    <label for="fullName">Full Name</label>
                                                    <h6>{user.nom + ' ' + user.prenom}</h6>
                                                </div>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div class="form-group">
                                                    <label for="eMail">Email</label>
                                                    <h6>{user.email}</h6>
                                                </div>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div class="form-group">
                                                    <label for="phone">Genre</label>
                                                    <h6>{user.genre ? user.genre : 'aucun'}</h6>
                                                </div>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div class="form-group">
                                                    <label for="website">Date Naissance</label>
                                                    <h6>{user.dateNaissance}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row gutters">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <h6 class="mt-3 mb-2 text-primary">Address</h6>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div class="form-group">
                                                    <label for="Street">Pays</label>
                                                    <h6>{user.pays}</h6>
                                                </div>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div class="form-group">
                                                    <label for="ciTy">Adresse</label>
                                                    <h6>{user.adresse}</h6>
                                                </div>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div class="form-group">
                                                    <label for="sTate">ville</label>
                                                    <h6>{user.ville}</h6>
                                                </div>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div class="form-group">
                                                    <label for="zIp">code Postal</label>
                                                    <h6>{user.codePostal}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row gutters">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <h6 class="mt-3 mb-2 text-primary">Professionelle</h6>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div class="form-group">
                                                    <label for="Street">Login</label>
                                                    <h6>{user.login}</h6>
                                                </div>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div class="form-group">
                                                    <label for="ciTy">Emploi</label>
                                                    <h6>{user.emploi}</h6>
                                                </div>
                                            </div>
                                            <br />
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div class="form-group">
                                                    <label for="sTate">Status</label>
                                                    <h6>{user.statut}</h6>
                                                </div>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div class="form-group">
                                                    <label for="zIp">Role</label>
                                                    <h6>{user.Role}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row gutters">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <h6 class="mt-3 mb-2 text-primary">Date Embauche</h6>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div class="form-group">
                                                    <label for="Street">Embauché</label>
                                                    <h6>{extractDate(user.createdAt)}</h6>
                                                </div>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div class="form-group">
                                                    <label for="ciTy">Modifier </label>
                                                    <h6>{extractDate(user.updatedAt)}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <UpdateUserD show={showUpdate} handleClose={handleClose} user={user} />
                </div>
            </div>
        </div>
    );
}

export default ProfileUser;
