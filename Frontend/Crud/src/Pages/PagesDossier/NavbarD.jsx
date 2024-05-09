import React, { useEffect, useState } from 'react';
import {
    CNavbar,
    CContainer,
    CNavbarToggler,
    CNavbarNav,
    CNavLink,
    CSidebarToggler,
    CNavItem,
    CNavTitle,
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faFileImport } from '@fortawesome/free-solid-svg-icons';

function NavbarD({ setVisible, visible, show, setShow, title }) {
    const [dossier, setDossier] = useState(null);
    const [user, setUser] = useState(null);

    const dossierId = localStorage.getItem('dossierId');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        async function getData() {
            try {
                const tokenString = localStorage.getItem('token');
                const token = JSON.parse(tokenString);
                const resDossier = await fetch(`http://localhost:5000/api/dossier/findDossierById/${dossierId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const resuser = await fetch(`http://localhost:5000/api/users/findOneUser/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!resDossier.ok) {
                    return console.log("erreur fetching data");
                }
                const dossierData = await resDossier.json();
                setDossier(dossierData);

                if (!resuser.ok) {
                    return console.log("erreur fetching data");
                }
                const UserData = await resuser.json(); // Correction de la variable UserData
                setUser(UserData.user);

            } catch (err) {
                console.error("erreur dans getData NavbarDossier", err);
            }
        }

        getData();
    }, [dossierId, userId]);

    return (
        <>
            <CNavbar expand="lg" className="bg-body-tertiary">
                <CContainer fluid className='containerNav'>
                    <div className='leftpartnav'>
                        <CSidebarToggler onClick={() => setVisible(!visible)} style={{ color: "#5856d6", fontSize: "24px" }} />
                        <CNavbarToggler onClick={() => setShow(!show)} />
                        <CNavbarNav>
                            <CNavItem>
                                <CNavLink href="#" active style={{ color: '#0f77c7' }}>
                                    {title}
                                </CNavLink>
                            </CNavItem>
                        </CNavbarNav>
                    </div>
                    <div>
                        <CNavbarNav>
                            <CNavItem>
                                <CNavLink href="/dossier/info" className='namelogin'>
                                    <FontAwesomeIcon icon={faFileImport} size="2xl" style={{ color: "#5856d6", }} />
                                    <CNavTitle> Dossier {dossier ? dossier.RaisonSociale : ''}</CNavTitle>
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink href="/Profile" className='namelogin'>
                                    <FontAwesomeIcon icon={faCircleUser} size="2x" style={{ color: "#5856d6" }} />
                                    <CNavTitle> {user ? user.nom + ' ' + user.prenom : ''}</CNavTitle>
                                </CNavLink>
                            </CNavItem>
                        </CNavbarNav>
                    </div>
                </CContainer>
            </CNavbar>
        </>
    );
}

export default NavbarD;
