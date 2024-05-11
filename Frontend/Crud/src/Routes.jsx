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
import AddMarque from './Components/Dossier/Add/AddMarque';
import AddZone from './Components/Dossier/Add/AddZone';
import AddSecteur from './Components/Dossier/Add/AddSecteur';
import AddFamilleArticle from './Components/Dossier/Add/AddFamilleArticle';
import AddFamilleClient from './Components/Dossier/Add/AddFamilleClient';
import ConsulterFamilleClient from './Components/Dossier/Consulter/ConsulterFamilleClient';



function getRoutes() {
  const routes = [
    {
      path: `/acceuil`,
      name: "Dashboard",
      component: Dasboard,
    },
    {
      path: "/init/droitaccess",
      name: "Initialisation \\ Droit d\'Accés",
      component: Droit,
    },
    {
      path: "/init/typetarif",
      name: "Initialisation \\ Type Tarif",
      component: TypeTarif,
    },
    {
      path: "/init/typetarif/ajoutertypetarif",
      name: "Initialisation \\ Type Tarif \\ Ajouter Type",
      component: AddTypeTarif,
    },
    {
      path: "/init/moderegl",
      name: "Initialisation \\ Mode Réglement",
      component: ModeRegl,
    },
    {
      path: "/init/moderegl/ajoutermodeRegl",
      name: "Initialisation \\ Mode Reglement \\ Ajouter Mode",
      component: AddModeRegl,
    },


    {
      path: "/init/famillearticle",
      name: "Initialisation \\ Famille Article",
      component: FamArticle,
    },
    {
      path: "/init/famillearticle/ajouterfamillearticle",
      name: "Initialisation \\ Famille Article \\ Ajouter Famille ",
      component: AddFamilleArticle,
    }, {
      path: "/init/familleclient",
      name: " Initialisation \\ Famille Client",
      component: FamClient,
    },
    {
      path: "/init/familleclient/ajouterfamilleclient",
      name: " Initialisation \\ Famille Client  \\ Ajouter Famille  ",
      component: AddFamilleClient,
    },
    {
      path: "/init/familleclient/consulterfamilleClient/:id",
      name: " Initialisation \\ Famille Client  \\ consulter Famille  ",
      component: ConsulterFamilleClient,
    },
    {
      path: "/init/marque",
      name: "Initialisation \\ Marque",
      component: Marque,
    },
    {
      path: "/init/marque/ajoutermarque",
      name: " Initialisation \\ Marque \\ Ajoouter Marque ",
      component: AddMarque,
    },
    {
      path: "/init/zoneinter/ajouterzoneinter",
      name: "Initialisation \\ Zone d\'intervention \\ Ajouter Zone",
      component: AddZone,
    },
    {
      path: "/init/zoneinter",
      name: "Initialisation \\ Zone d\'intervention",
      component: ZoneInter,
    },
    {
      path: "/init/secteursgeo",
      name: "Initialisation \\ Secteur Géographique",
      component: SecteurGeo,
    },
    {
      path: "/init/secteursgeo/ajoutersecteur",
      name: "Initialisation \\ Secteur Géographique  \\ Ajouter Secteur",
      component: AddSecteur,
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
