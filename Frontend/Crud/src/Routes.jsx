import React from 'react';
import Home from './Pages/PagesDossier/Home';
import Dasboard from './Components/Dossier/Dasboard';
import Droit from './Components/Dossier/Init/Droit';
import TypeTarif from './Components/Dossier/Init/TypeTarif';
import ModeRegl from './Components/Dossier/Init/ModeRegl'
import FamArticle from './Components/Dossier/Init/FamArticle'
import FamClient from './Components/Dossier/Init/FamClient'
import Marque from './Components/Dossier/Init/Marque'
import ZoneInter from './Components/Dossier/Init/ZoneInter'
import SecteurGeo from './Components/Dossier/Init/SecteurGeo'
import UserEmp from './Components/Dossier/UserDossier/UserEmp';
import Fournisseur from './Components/Dossier/UserDossier/Fournisseur';
import Technicien from './Components/Dossier/UserDossier/Technicien';
import Vendeur from './Components/Dossier/UserDossier/Vendeur';
import ArticleD from './Components/Dossier/ArticleDossier/ArticleD';
import Appareil from './Components/Dossier/ArticleDossier/Appareil';
import Mvt from './Components/Dossier/Stocks/Mvt'
import Entree from './Components/Dossier/Stocks/Entree'
import Sortie from './Components/Dossier/Stocks/Sortie'




function getRoutes() {
  const routes = [
    {
      path: "/acceuil",
      name: "Dashboard",
      component: Dasboard,
    },
    {
      path: "/init/droitaccess",
      name: "Droit d\'Accés",
      component: Droit,
    },
    {
      path: "/init/typetarif",
      name: "Type Tarif",
      component: TypeTarif,
    },

    {
      path: "/init/moderegl",
      name: "Mode Reglement",
      component: ModeRegl,
    }, {
      path: "/init/famillearticle",
      name: "Famille Article",
      component: FamArticle,
    }, {
      path: "/init/familleclient",
      name: "Famille Client",
      component: FamClient,
    }, {
      path: "/init/marque",
      name: "Marque",
      component: Marque,
    }, {
      path: "/init/zoneinter",
      name: "Zone d\'intervention",
      component: ZoneInter,
    }, {
      path: "/init/secteursgeo",
      name: "Secteur Géographique",
      component: SecteurGeo,
    },
    {
      path: "/utilisateurs",
      name: "Utilisateurs",
      component: UserEmp,
    },
    {
      path: "/users/fournisseurs",
      name: "Utilisateurs \\ Fournissuers",
      component: Fournisseur,
    },
    {
      path: "users/techniciens",
      name: "Utilisateurs \\ Techniciens",
      component: Technicien,
    },
    {
      path: "users/vendeurs",
      name: "Utilisateurs \\ Vendeurs",
      component: Vendeur,
    },
    {
      path: "/articles",
      name: "Article",
      component: ArticleD,
    },
    {
      path: "/article/appareils",
      name: "Article \\ Appareils",
      component: Appareil,
    },
    {
      path: "/stocks",
      name: "Stocks \\ Movements",
      component: Mvt,

    },
    {
      path: "/stock/entree",
      name: "Stocks \\ Entree",
      component: Entree,

    },
    {
      path: "/stock/sortie",
      name: "Stocks \\ Sortie",
      component: Sortie,

    },
  ];

  return routes;
}

export default getRoutes;
