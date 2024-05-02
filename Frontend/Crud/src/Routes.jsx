import React from 'react';

import Home from './Pages/PagesDossier/Home';
import init from './Pages/PagesDossier/init';





function Routes() {
  const routes = [
    {
      path: "/dashbord",
      name: "dashbord",
      icon: <FontAwesomeIcon icon={faTableColumns} />,
      component: Home,
    },
    {
      path: "/initialisation",
      name: "initialisation",
      icon: Person,
      component: init,
    },
    {
      path: "/utilisateurs",
      name: "utilisateurs",
      icon: Person,
      component: Home,
    },
    {
      path: "/utilisateurs/founissueur",
      name: "fournissuers",
      icon: Person,
      component: Home,
    },
    {
      path: "/utilisateurs",
      name: "v",
      icon: Person,
      component: Home,
    },
    {
      path: "/utilisateurs",
      name: "utilisateurs",
      icon: Person,
      component: Home,
    },
  ];

  return routes;
}

export default Routes;
