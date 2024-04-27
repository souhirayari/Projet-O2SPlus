import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCog,
  cilDescription,
  cilPuzzle,
  cilSpeedometer,
  cilAccountLogout,
  cilBasket,
  cilBarChart,
  cilCash,
  cilChartLine,
  cilFile,
  cilTags,
  cilTruck,
  cilPeople,
  cilLayers,
  cilBriefcase
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,

  },
  {
    component: CNavGroup,
    name: 'Initialisation',
    to: '/initia',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Droit d\'accès ',
        to: '/initia/droitAcces',
      },
      {
        component: CNavItem,
        name: 'Type Tarif ',
        to: '/initia/typetarif',
      },
      {
        component: CNavItem,
        name: 'Mode Réglement',
        to: '/initia/moderegl',
      },
      {
        component: CNavItem,
        name: 'Famille Article',
        to: '/initia/famillearticle',
      },
      {
        component: CNavItem,
        name: 'Famille Client',
        to: '/initia/familleclient',
      },
      {
        component: CNavItem,
        name: 'Marque',
        to: '/initia/marque',
      },
      {
        component: CNavItem,
        name: 'Secteur Géoraphique',
        to: '/initia/secteur',
      },
      {
        component: CNavItem,
        name: 'Zone d\'Intervention',
        to: '/initia/zone',
      },

    ],
  },
  {
    component: CNavTitle,
    name: 'Utilisateurs',
  },
  {
    component: CNavGroup,
    name: 'Utilisateurs',
    to: '/Users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Utilisateurs ',
        to: '/Users/employes',
      },
      {
        component: CNavItem,
        name: 'Fournissuers ',
        to: '/Users/fournisseurs',
      },
      {
        component: CNavItem,
        name: 'Techniciens ',
        to: '/Users/techniciens',
      },
      {
        component: CNavItem,
        name: 'Vendeurs ',
        to: '/Users/vendeurs',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Articles Stocks',
  },
  {
    component: CNavGroup,
    name: 'Articles',
    to: '/articles',
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Articles',
        to: '/articles/allarticle',
      },
      {
        component: CNavItem,
        name: 'Appareils',
        to: '/articles/appareils',
      },

    ],
  },
  {
    component: CNavGroup,
    name: 'Stocks',
    to: '/stock',
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Movements',
        to: '/stock/mvt',
      },
      {
        component: CNavItem,
        name: 'Entrés',
        to: '/stock/Entree',
      },
      {
        component: CNavItem,
        name: 'Sorties',
        to: '/stock/Sortie',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'clients',
  },
  {
    component: CNavItem,
    name: 'Clients',
    to: '/clients',
    icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'fonctionnalités',
  },
  {
    component: CNavItem,
    name: 'Ventes',
    to: '/vente',
    icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Achats',
    to: '/achat',
    icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Contrats',
    to: '/contrat',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Intervention',
    to: '/intervention',
    icon: <CIcon icon={cilCog} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Demandes',
        to: '/intervention/demandes',
      },
      {
        component: CNavItem,
        name: 'Bons',
        to: '/intervention/bons',
      },
      {
        component: CNavItem,
        name: 'Rapports',
        to: '/intervention/rapports',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Marketing',
  },
  {
    component: CNavItem,
    name: 'Finance',
    to: '/finance',
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,

  },
  {
    component: CNavItem,
    name: 'Comptabilité',
    to: '/comptabilite',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Statistique',
    to: '/statistique',
    icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'Génerale',
  },
  {
    component: CNavItem,
    name: 'Dossier ',
    to: '/Dossier/info',
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Se Déconnecter ',
    to: '/logout',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
  },
]

export default _nav
