import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

// Dossier-------------------------------------------------------------------
const Dossier = React.lazy(() => import('./views/PagesDossier/General/Dossier'))


//User
const Users = React.lazy(() => import('./views/PagesDossier/User/User'))
const Fournisseur = React.lazy(() => import('./views/PagesDossier/User/Fournisseur'))
const Technicien = React.lazy(() => import('./views/PagesDossier/User/Technicien'))
const Vendeur = React.lazy(() => import('./views/PagesDossier/User/Vendeur'))

//Article Stock
const Article = React.lazy(() => import('./views/PagesDossier/ArticleStock/Article'))
const Appareil = React.lazy(() => import('./views/PagesDossier/ArticleStock/Appareil'))
const Mvt = React.lazy(() => import('./views/PagesDossier/ArticleStock/Mvt'))
const Entree = React.lazy(() => import('./views/PagesDossier/ArticleStock/Entree'))
const Sortie = React.lazy(() => import('./views/PagesDossier/ArticleStock/Sortie'))

//clients
const Clients = React.lazy(() => import('./views/PagesDossier/Client/client'))

//fonction
const Vente = React.lazy(() => import('./views/PagesDossier/Fonction/Vente'))
const Achat = React.lazy(() => import('./views/PagesDossier/Fonction/Achat'))
const Contrat = React.lazy(() => import('./views/PagesDossier/Fonction/Contrats'))
const Intervention = React.lazy(() => import('./views/PagesDossier/Fonction/Intervention'))
const Demande = React.lazy(() => import('./views/PagesDossier/Fonction/Demande'))
const Bon = React.lazy(() => import('./views/PagesDossier/Fonction/Bon'))
const Rapport = React.lazy(() => import('./views/PagesDossier/Fonction/Rapport'))

//Marketing
const Finance = React.lazy(() => import('./views/PagesDossier/Marketing/Finance'))
const comptabilite = React.lazy(() => import('./views/PagesDossier/Marketing/comptabilite'))
const Statistique = React.lazy(() => import('./views/PagesDossier/Marketing/statistique'))

//init
const Droits = React.lazy(() => import('./views/PagesDossier/init/Droits'))
const TypeTarif = React.lazy(() => import('./views/PagesDossier/init/TypeTarif'))
const ModeReg = React.lazy(() => import('./views/PagesDossier/init/ModeRg'))
const FamilleArticle = React.lazy(() => import('./views/PagesDossier/init/FamilleArticle'))
const FamilleClient = React.lazy(() => import('./views/PagesDossier/init/FamilleClient'))
const Marque = React.lazy(() => import('./views/PagesDossier/init/Marque'))
const SecteurGeo = React.lazy(() => import('./views/PagesDossier/init/SecteurGeo'))
const ZoneInter = React.lazy(() => import('./views/PagesDossier/init/ZoneInter'))



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/Users', name: 'Tous Utilisateurs', element: Users },
  { path: '/Users/employes', name: 'Utilisateurs', element: Users },
  { path: '/Users/fournisseurs', name: 'Fournisseur', element: Fournisseur },
  { path: '/Users/techniciens', name: 'Technicien', element: Technicien },
  { path: '/Users/vendeurs', name: 'Vendeur', element: Vendeur },
  { path: '/articles', name: 'Article', element: Article },
  { path: '/articles/allarticle', name: 'Articles', element: Article },
  { path: '/articles/appareils', name: 'Appareil', element: Appareil },
  { path: '/stock', name: 'Stock', element: Mvt },
  { path: '/stock/mvt', name: 'Movements', element: Mvt },
  { path: '/stock/Entree', name: 'Entree', element: Entree },
  { path: '/stock/Sortie', name: 'Sortiee', element: Sortie },
  { path: '/clients', name: 'Clients', element: Clients },
  { path: '/vente', name: 'Ventes', element: Vente },
  { path: '/achat', name: 'Achats', element: Achat },
  { path: '/contrat', name: 'Contrats', element: Contrat },
  { path: '/intervention', name: 'Intervention', element: Intervention },
  { path: '/intervention/demandes', name: 'Demandes', element: Demande },
  { path: '/intervention/bons', name: 'Bons', element: Bon },
  { path: '/intervention/rapport', name: 'Rapports', element: Rapport },
  { path: '/finance', name: 'Finance', element: Finance },
  { path: '/comptabilite', name: 'Comptabilité', element: comptabilite },
  { path: '/statistique', name: 'Statistique', element: Statistique },
  { path: '/initia', name: 'Initialisation', element: Finance },
  { path: '/initia/droitAcces', name: 'Droits d\'accés', element: Droits },
  { path: '/initia/typetarif', name: 'Type Tarif', element: TypeTarif },
  { path: '/initia/moderegl', name: 'Mode Reglements', element: ModeReg },
  { path: '/initia/famillearticle', name: 'Famille Articles', element: FamilleArticle },
  { path: '/initia/familleclient', name: 'Famille Clients', element: FamilleClient },
  { path: '/initia/marque', name: 'Marques', element: Marque },
  { path: '/initia/secteur', name: 'Secteur Géoraphique', element: SecteurGeo },
  { path: '/initia/zone', name: 'Zone d\'Intervention', element: ZoneInter },
  { path: '/Dossier/info', name: 'Dossier', element: Dossier },


]

export default routes
