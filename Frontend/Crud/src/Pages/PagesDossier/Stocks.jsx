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
        if (currentPageUrl.includes('/entree/consultermvt')) {
            StocksRoute = Routes.find((route) => route.path.includes('/entree/consultermvt'))
            Component = StocksRoute ? StocksRoute.component : null;
        } else if (currentPageUrl.includes('/sortie/consultermvt')) {
            StocksRoute = Routes.find((route) => route.path.includes('/sortie/consultermvt'))
            Component = StocksRoute ? StocksRoute.component : null;
        } else {


            if (currentPageUrl.includes('ajouterEntree')) {
                StocksRoute = Routes.find((route) => route.path.includes('ajouterEntree'))
                Component = StocksRoute ? StocksRoute.component : null;

            } else if (currentPageUrl.includes('ajouterSortie')) {
                StocksRoute = Routes.find((route) => route.path.includes('ajouterSortie'))
                Component = StocksRoute ? StocksRoute.component : null;

            } else {
                // Utilisation de filter pour trouver la route correspondant à la page d'accueil
                StocksRoute = Routes.find((route) => currentPageUrl.substr(-route.path.length) === route.path) || Routes.find((route) => currentPageUrl.includes(route.path))
                Component = StocksRoute ? StocksRoute.component : null;

            }
        }
    }

    return (
        <div className='containerBody'>
            <SideBarD visible={visible} show={show} setShow={setShow} />
            <div className='biglayout'  >
                <NavbarD setVisible={setVisible} visible={visible} show={show} setShow={setShow} title={StocksRoute ? StocksRoute.name : ''} />
                <div className='boxBody '>
                    {Component && <Component />}
                </div>
            </div>
        </div>
    );
}

export default Stocks;
