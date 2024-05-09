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
    if (currentPageUrl.includes('consulterutilisateur')) {
      UserRoute = Routes.find((route) => route.path.includes('consulterutilisateur'));
      Component = UserRoute ? UserRoute.component : null;
    } else {
      console.log(currentPageUrl);
      UserRoute =
        Routes.find((route) => currentPageUrl.substr(-route.path.length) === route.path) ||
        Routes.find((route) => currentPageUrl.includes(route.path));
      Component = UserRoute ? UserRoute.component : null;
    }
  }

  return UserRoute ? (
    <div>
      <SideBarD visible={visible} show={show} setShow={setShow} />
      <div className={visible ? 'biglayout' : 'smalllayout'}>
        <NavbarD setVisible={setVisible} visible={visible} show={show} setShow={setShow} title={UserRoute ? UserRoute.name : ''} />
        <div className="boxBody">{Component && <Component />}</div>
      </div>
    </div>
  ) : (
<h1>hello</h1>
  );
}

export default UsersD;
