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
import AddUserD from './Components/Dossier/Add/AddUserD';
import View from './Components/Dossier/Consulter/View';
import AddFournisseur from './Components/Dossier/Add/AddFournisseur';
import AddTechnicien from './Components/Dossier/Add/AddTechnicien';
import AddVendeur from './Components/Dossier/Add/AddVendeur';
import AddArticle from './Components/Dossier/Add/AddArticle';
import ConsultArticle from './Components/Dossier/Consulter/ConsultArticle';
import AddTypeTarif from './Components/Dossier/Add/AddTypeTarif';
import AddModeRegl from './Components/Dossier/Add/AddModeRegl';



function getRoutes() {
  const routes = [
    {
      path: `/acceuil`,
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
      path: "/init/typetarif/ajoutertypetarif",
      name: "Type Tarif",
      component: AddTypeTarif,
    },
    {
      path: "/init/typetarif/consultertypetarif/:idtype",
      name: "Type Tarif",
      component: AddTypeTarif,
    },


    {
      path: "/init/moderegl",
      name: "Mode Reglement",
      component: ModeRegl,
    },
    {
      path: "/init/moderegl/ajoutermodeRegl",
      name: "Mode Reglement",
      component: AddModeRegl,
    },
  
   
    {
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
      path: "/utilisateurs/ajouterUtilisateur",
      name: "Utilisateurs \\ Ajouter Un Utilisateur",
      component: AddUserD,
    },
    {
      path: '/consulterutilisateur/:userId',
      name: "Utilisateurs \\ Consulter un  Utilisateur ",
      component: View,
    },

    {
      path: "/users/fournisseurs",
      name: "Utilisateurs \\ Fournissuers",
      component: Fournisseur,
    },
    {
      path: "/users/fournisseurs/ajouterfournisseur",
      name: "Utilisateurs \\ Fournissuers",
      component: AddFournisseur,
    },
    {
      path: "users/techniciens",
      name: "Utilisateurs \\ Techniciens",
      component: Technicien,
    },
    {
      path: "users/techniciens/ajoutertechnicien",
      name: "Utilisateurs \\ Techniciens",
      component: AddTechnicien,
    },
    {
      path: "users/vendeurs",
      name: "Utilisateurs \\ Vendeurs",
      component: Vendeur,
    },
    {
      path: "users/vendeurs/ajoutervendeur",
      name: "Utilisateurs \\ Vendeurs",
      component: AddVendeur,
    },
    {
      path: "/articles",
      name: "Article",
      component: ArticleD,
    },
    {
      path: "/articles/ajouterarticle",
      name: "Article",
      component: AddArticle,
    },
    {
      path: "/articles/consulterarticle/:idarticle",
      name: "Article",
      component: ConsultArticle,
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
