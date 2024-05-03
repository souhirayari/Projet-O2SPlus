import React, { useState, useEffect } from 'react';
import SideBarD from '../../Components/Dossier/SideBarD';
import NavbarD from './NavbarD';
import getRoutes from '../../Routes';

function Initia() {
    const [visible, setVisible] = useState(true);
    const [show, setShow] = useState(false);
    const [currentPageUrl, setCurrentPageUrl] = useState('');

    
    useEffect(() => {
        // Met à jour currentPageUrl lorsque le composant est monté
        setCurrentPageUrl(window.location.href);
    }, []);


    const Routes = getRoutes();
    let initRoute = null;
    let Component = null;

    if (currentPageUrl !== '') {
        // Utilisation de filter pour trouver la route correspondant à la page d'accueil
        initRoute = Routes.find((route) => currentPageUrl.includes(route.path));
        Component = initRoute ? initRoute.component : null;
    }

    return (
        <div>
            <SideBarD visible={visible} show={show} setShow={setShow} />
            <div className={visible ? 'biglayout' : 'smalllayout'} >
                <NavbarD setVisible={setVisible} visible={visible} show={show} setShow={setShow} title={initRoute ? initRoute.name : ''} />
                {Component && <Component />}
            </div>
        </div>
    );
}

export default Initia;
