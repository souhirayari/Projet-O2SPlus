import React, { useState, useEffect } from 'react';
import SideBarD from '../../Components/Dossier/SideBarD';
import NavbarD from './NavbarD';
import getRoutes from '../../Routes';

function Stocks() {
    const [visible, setVisible] = useState(true);
    const [show, setShow] = useState(false);
    const [currentPageUrl, setCurrentPageUrl] = useState('');


    useEffect(() => {
        // Met à jour currentPageUrl lorsque le composant est monté
        setCurrentPageUrl(window.location.href);
    }, []);

    const Routes = getRoutes();
    let StocksRoute = null;
    let Component = null;

    if (currentPageUrl !== '') {
        // Utilisation de filter pour trouver la route correspondant à la page d'accueil
        StocksRoute = Routes.find((route) => currentPageUrl.includes(route.path));
        Component = StocksRoute ? StocksRoute.component : null;
    }

    return (
        <div>
            <SideBarD visible={visible} show={show} setShow={setShow} />
            <div className={visible ? 'biglayout' : 'smalllayout'} >
                <NavbarD setVisible={setVisible} visible={visible} show={show} setShow={setShow} title={StocksRoute ? StocksRoute.name : ''} />
                {Component && <Component />}
            </div>
        </div>
    );
}

export default Stocks;
