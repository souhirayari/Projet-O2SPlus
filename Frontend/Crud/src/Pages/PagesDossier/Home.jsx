import React, { useState, useEffect } from 'react';
import SideBarD from '../../Components/Dossier/SideBarD';
import NavbarD from './NavbarD';
import getRoutes from '../../Routes';

function Home() {
  const [visible, setVisible] = useState(true);
  const [show, setShow] = useState(false);
  const [currentPageUrl, setCurrentPageUrl] = useState('');

  useEffect(() => {
    // Met à jour currentPageUrl lorsque le composant est monté
    setCurrentPageUrl(window.location.href);
  }, []);

  console.log('url', currentPageUrl);

  const Routes = getRoutes();
  // Utilisation de filter pour trouver la route correspondant à la page d'accueil
  const homeRoute = Routes.find((route) => route.name.toLowerCase().includes('dashboard'));

  const Component = homeRoute ? homeRoute.component : null;

  return (
    <div className='containerBody' >
      <SideBarD visible={visible} show={show} setShow={setShow} />
      <div className= 'biglayout'>
        <NavbarD setVisible={setVisible} visible={visible} show={show} setShow={setShow} title={homeRoute && homeRoute.name} />
        <div  className="boxBody">
        {Component && <Component />}
        </div>
      </div>
    </div>
  );
}

export default Home;
