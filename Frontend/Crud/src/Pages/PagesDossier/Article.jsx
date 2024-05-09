import React, { useState, useEffect } from 'react';
import SideBarD from '../../Components/Dossier/SideBarD';
import NavbarD from './NavbarD';
import getRoutes from '../../Routes';

function Article() {
    const [visible, setVisible] = useState(true);
    const [show, setShow] = useState(false);
    const [currentPageUrl, setCurrentPageUrl] = useState('');


    useEffect(() => {
        // Met à jour currentPageUrl lorsque le composant est monté
        setCurrentPageUrl(window.location.href);
    }, []);

    const Routes = getRoutes();
    let ArticleRoute = null;
    let Component = null;

    if (currentPageUrl !== '') {
        if (currentPageUrl.includes('consulterarticle')) {
            ArticleRoute = Routes.find((route) => route.path.includes('consulterarticle'));
            Component = ArticleRoute ? ArticleRoute.component : null;
        } else {
            ArticleRoute = Routes.find((route) => currentPageUrl.substr(-route.path.length) === route.path) || Routes.find((route) => currentPageUrl.includes(route.path))
            Component = ArticleRoute ? ArticleRoute.component : null;
            console.log(ArticleRoute)
        }
    }
    return (
        <div>
            <SideBarD visible={visible} show={show} setShow={setShow} />
            <div className={visible ? ' biglayout' : 'smalllayout'} >
                <NavbarD setVisible={setVisible} visible={visible} show={show} setShow={setShow} title={ArticleRoute ? ArticleRoute.name : ''} />
                <div className='boxBody'> {Component && <Component />}</div>
            </div>
        </div>
    );
}

export default Article;
