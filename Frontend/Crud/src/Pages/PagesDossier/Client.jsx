import React, { useState, useEffect } from 'react';
import SideBarD from '../../Components/Dossier/SideBarD';
import NavbarD from './NavbarD';
import getRoutes from '../../Routes';

function Client() {
    const [visible, setVisible] = useState(true);
    const [show, setShow] = useState(false);
    const [currentPageUrl, setCurrentPageUrl] = useState('');
    const Routes = getRoutes();

    useEffect(() => {
        setCurrentPageUrl(window.location.href);
    }, []);

    let clientRoute = null;
    let Component = null;

    if (currentPageUrl !== '') {
        if (currentPageUrl.includes('consulterclient')) {
            clientRoute = Routes.find((route) => route.path.toLowerCase().includes('consulterclient'));
            Component = clientRoute ? clientRoute.component : null;
        } else {
            // Utilisation de filter pour trouver la route correspondant à la page d'accueil
            clientRoute = Routes.find((route) => currentPageUrl.substr(-route.path.length) === route.path) || Routes.find((route) => currentPageUrl.includes(route.path));
            Component = clientRoute ? clientRoute.component : null;
        }
    }

    return (
        <div>
            <SideBarD visible={visible} show={show} setShow={setShow} />
            <div className={visible ? 'biglayout' : 'smalllayout'}>
                <NavbarD setVisible={setVisible} visible={visible} show={show} setShow={setShow} title={clientRoute && clientRoute.name} />
                <div className="boxBody">
                    {Component && <Component />}
                </div>
            </div>
        </div>
    );
}

export default Client;
