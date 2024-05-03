import React, { useState, useEffect } from 'react';
import SideBarD from '../../Components/Dossier/SideBarD';
import NavbarD from './NavbarD';
import getRoutes from '../../Routes';

function UsersD() {
  const [visible, setVisible] = useState(true);
  const [show, setShow] = useState(false);
  const [currentPageUrl, setCurrentPageUrl] = useState('');


  useEffect(() => {
    // Met à jour currentPageUrl lorsque le composant est monté
    setCurrentPageUrl(window.location.href);
  }, []);

  const Routes = getRoutes();
  let UserRoute = null;
  let Component = null;

  if (currentPageUrl !== '') {
    // Utilisation de filter pour trouver la route correspondant à la page d'accueil
    UserRoute = Routes.find((route) => currentPageUrl.includes(route.path));
    Component = UserRoute ? UserRoute.component : null;
  }

  return (
    <div>
      <SideBarD visible={visible} show={show} setShow={setShow} />
      <div className={visible ? 'biglayout' : 'smalllayout'} >
        <NavbarD setVisible={setVisible} visible={visible} show={show} setShow={setShow} title={UserRoute ? UserRoute.name : ''} />
        {Component && <Component />}
      </div>
    </div>
  );
}

export default UsersD;
