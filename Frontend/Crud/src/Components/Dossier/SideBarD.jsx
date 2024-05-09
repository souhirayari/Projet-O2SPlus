import React, { useEffect, useState } from 'react'
import {
    CSidebar,
    CSidebarBrand,
    CSidebarHeader,
    CSidebarNav,
    CNavTitle,
    CNavItem,
    CNavGroup,
    CCollapse,
    CCloseButton

} from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Assurez-vous d'importer FontAwesomeIcon
import {
    faUsers,
    faGaugeSimpleHigh,
    faBookmark,
    faBoxArchive,
    faTruckRampBox,
    faTags,
    faCartShopping,
    faFileContract,
    faScrewdriverWrench,
    faCircleDollarToSlot,
    faFileInvoiceDollar,
    faChartSimple,
    faFileImport,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import '../../Style/Dossier/SideBarD.css'
import logo from '../../assets/logo.png'

function SideBarD({ visible, show, setShow }) {
    const [dossier, setDossier] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null); // État pour suivre l'élément survolé


    const id = localStorage.getItem('dossierId')

    useEffect(() => {
        async function getData() {
            try {
                const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
                const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
                const resDossier = await fetch(`http://localhost:5000/api/dossier/findDossierById/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
                    }
                });

                if (!resDossier.ok) {
                    return console.log("erreur fetching data");

                }
                const dossierData = await resDossier.json();
                setDossier(dossierData);

            } catch (err) {
                console.error("erreur dans getData SidebarDossier", err);
            }
        }

        getData();
    }, [id]);


    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('dossierId');

        setTimeout(() => {
            window.location.href = '/SignIn';
        }, 1000);

        // Rediriger l'utilisateur vers la page de connexion ou une autre page appropriée après la déconnexion
    };


    return (
        <div >
            <CCollapse visible={visible}>
                <CSidebar className={show ? 'border-end sidebarF' : 'border-end'} colorScheme="dark"  >
                    {show && (<CCloseButton className='closebtn' dark onClick={() => { setShow(!show) }} />)}
                    <CSidebarHeader className='header'>
                        <CSidebarBrand className='imgSideBar'>
                            <img src={logo} alt="logo" />
                            O2S Plus
                        </CSidebarBrand>
                    </CSidebarHeader>

                    <CSidebarNav className='bodySideBar' >
                        <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/accueil`} className='linksidebar' name='Dashbord'> <FontAwesomeIcon icon={faGaugeSimpleHigh} /> Dashboard</CNavItem>
                        <CNavGroup toggler={<a href={`/dossier${dossier ? dossier.RaisonSociale : ''}/init`} className='linksidebar' > <FontAwesomeIcon icon={faBookmark} /> Initialisation</a>}>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/init/droitaccess`} ><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Droits d'access</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/init/typetarif`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Types Tarif</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/init/moderegl`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Mode Réglement</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/init/famillearticle`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Famille Articles</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/init/familleclient`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Famille Clients  </CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/init/marque`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Marques</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/init/zoneinter`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Zone d'Intervention</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/init/secteursgeo`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Secteurs Géoraphique</CNavItem>

                        </CNavGroup>

                        <CNavTitle>utilisateurs</CNavTitle>
                        <CNavGroup toggler={<a href={`/dossier${dossier ? dossier.RaisonSociale : ''}/utilisateurs`} className='linksidebar' > <FontAwesomeIcon icon={faUsers} /> Utilisateurs</a>}>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/utilisateurs`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Utilisateurs</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/users/fournisseurs`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Fournisseurs</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/users/techniciens`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Techniciens</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/users/vendeurs`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Vendeur</CNavItem>
                        </CNavGroup>
                        <CNavTitle>Article Stocks</CNavTitle>
                        <CNavGroup toggler={<a href={`/dossier${dossier ? dossier.RaisonSociale : ''}/articles`} className='linksidebar' > <FontAwesomeIcon icon={faBoxArchive} /> Article</a>}>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/articles`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Article</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/article/appareils`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Appareil</CNavItem>
                        </CNavGroup>
                        <CNavGroup toggler={<a href={`/dossier${dossier ? dossier.RaisonSociale : ''}/stocks`} className='linksidebar'> <FontAwesomeIcon icon={faTruckRampBox} /> Stocks</a>}>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/stocks`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Mouvements</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/stock/entree`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Entree</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/stock/sortie`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Sortie</CNavItem>
                        </CNavGroup>
                        <CNavTitle>Fonctionnalité</CNavTitle>
                        <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/ventes`} className='linksidebar'> <FontAwesomeIcon icon={faTags} /> Ventes</CNavItem>
                        <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/achats`} className='linksidebar'> <FontAwesomeIcon icon={faCartShopping} /> Achats</CNavItem>
                        <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/contrats`} className='linksidebar'> <FontAwesomeIcon icon={faFileContract} />Contrats</CNavItem>
                        <CNavGroup toggler={<a href={`/dossier${dossier ? dossier.RaisonSociale : ''}/intervention`} className='linksidebar' > <FontAwesomeIcon icon={faScrewdriverWrench} />Intervention</a>}>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/intervention/demandes`} ><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Demandes</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/intervention/bons`} ><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Bons</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/intervention/rapport`} ><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Rapport </CNavItem>
                        </CNavGroup>

                        <CNavTitle>marketing</CNavTitle>
                        <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/finance`} className='linksidebar'> <FontAwesomeIcon icon={faCircleDollarToSlot} /> Finance</CNavItem>
                        <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/comptabilite`} className='linksidebar'> <FontAwesomeIcon icon={faFileInvoiceDollar} /> Comptabilité</CNavItem>
                        <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/statistique`} className='linksidebar'> <FontAwesomeIcon icon={faChartSimple} />Statistique</CNavItem>

                        <CNavTitle>Génerale</CNavTitle>
                        <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/dossier`} className='linksidebar'> <FontAwesomeIcon icon={faFileImport} /> Dossier</CNavItem>
                        <CNavItem href='/Signin' onClick={handleLogout} className='linksidebar'> <FontAwesomeIcon icon={faRightFromBracket} /> Déconnecter</CNavItem>

                    </CSidebarNav>

                </CSidebar>
            </CCollapse>
            {!visible && (
                <CSidebar className="border-end smallsideBar " unfoldable colorScheme="dark" onMouseEnter={() => setHoveredItem('Sidebar')} onMouseLeave={() => setHoveredItem(null)}>
                    <CSidebarHeader className='smallheader'>
                        <CSidebarBrand className='smallimg'> <img src={logo} alt="logo" />  {hoveredItem === 'Sidebar' && 'O2S PLUS'}</CSidebarBrand>
                    </CSidebarHeader>
                    <CSidebarNav className='smallside' >
                        <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/accueil`} className='linksidebar' name='Dashbord'><FontAwesomeIcon icon={faGaugeSimpleHigh} />{hoveredItem === 'Sidebar' && 'Dashboard'}    </CNavItem>
                        <CNavGroup
                            toggler={
                                <a href={`/dossier${dossier ? dossier.RaisonSociale : ''}/init`} className='linksidebar'>
                                    <FontAwesomeIcon icon={faBookmark} />
                                    {hoveredItem === 'Sidebar' && 'Initialisation'}
                                </a>
                            }
                        >
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/init/droitaccess`} ><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Droits d'access</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/init/typetarif`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Types Tarif</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/init/moderegl`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Mode Réglement</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/init/famillearticle`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Famille Articles</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/init/familleclient`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Famille Clients  </CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/init/marque`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Marques</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/init/zoneinter`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Zone d'Intervention</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/init/secteursgeo`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Secteurs Géoraphique</CNavItem>

                        </CNavGroup>

                        <CNavTitle>utilisateurs</CNavTitle>
                        <CNavGroup toggler={<a href={`/dossier${dossier ? dossier.RaisonSociale : ''}/utilisateurs`} className='linksidebar' > <FontAwesomeIcon icon={faUsers} />{hoveredItem === 'Sidebar' && 'Utilisation'}</a>}>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/utilisateurs`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Utilisateurs</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/users/fournisseurs`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Fournisseurs</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/users/techniciens`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Techniciens</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/users/vendeurs`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Vendeur</CNavItem>
                        </CNavGroup>
                        <CNavTitle>Article Stocks</CNavTitle>
                        <CNavGroup
                            toggler={<a
                                href={`/dossier${dossier ? dossier.RaisonSociale : ''}/articles`} className='linksidebar'>
                                <FontAwesomeIcon icon={faBoxArchive} />{hoveredItem === 'Sidebar' && 'Article'}</a>}>

                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/articles`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Article</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/article/appareils`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Appareil</CNavItem>
                        </CNavGroup>
                        <CNavGroup toggler={<a href={`/dossier${dossier ? dossier.RaisonSociale : ''}/stocks`} className='linksidebar'> <FontAwesomeIcon icon={faTruckRampBox} />{hoveredItem === 'Sidebar' && 'Stocks'}</a>}>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/stocks`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Mouvements</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/stock/entree`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Entree</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/stock/sortie`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Sortie</CNavItem>
                        </CNavGroup>
                        <CNavTitle>Fonctionnalité</CNavTitle>
                        <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/ventes`} className='linksidebar'> <FontAwesomeIcon icon={faTags} /> {hoveredItem === 'Sidebar' && 'Vente'}</CNavItem>
                        <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/achats`} className='linksidebar'> <FontAwesomeIcon icon={faCartShopping} /> {hoveredItem === 'Sidebar' && 'Achats'}</CNavItem>
                        <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/contrats`} className='linksidebar'> <FontAwesomeIcon icon={faFileContract} />{hoveredItem === 'Sidebar' && 'Contrat'}</CNavItem>
                        <CNavGroup toggler={<a href={`/dossier${dossier ? dossier.RaisonSociale : ''}/intervention`} className='linksidebar' > <FontAwesomeIcon icon={faScrewdriverWrench} />{hoveredItem === 'Sidebar' && 'Intervention'}</a>}>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/intervention/demandes`} ><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Demandes</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/intervention/bons`} ><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Bons</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/intervention/rapport`} ><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Rapport </CNavItem>
                        </CNavGroup>

                        <CNavTitle>marketing</CNavTitle>
                        <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/finance`} className='linksidebar'> <FontAwesomeIcon icon={faCircleDollarToSlot} /> {hoveredItem === 'Sidebar' && 'Finance'}</CNavItem>
                        <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/comptabilite`} className='linksidebar'> <FontAwesomeIcon icon={faFileInvoiceDollar} /> {hoveredItem === 'Sidebar' && 'Comptabilité'}</CNavItem>
                        <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/statistique`} className='linksidebar'> <FontAwesomeIcon icon={faChartSimple} />{hoveredItem === 'Sidebar' && 'Statistique'}</CNavItem>

                        <CNavTitle>Génerale</CNavTitle>
                        <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/dossier`} className='linksidebar'> <FontAwesomeIcon icon={faFileImport} /> {hoveredItem === 'Sidebar' && 'Dossier'}</CNavItem>
                        <CNavItem href='/Signin' onClick={handleLogout} className='linksidebar'> <FontAwesomeIcon icon={faRightFromBracket} /> {hoveredItem === 'Sidebar' && 'Déconnection'}</CNavItem>

                    </CSidebarNav>
                </CSidebar>

            )}
        </div>
    )
}

export default SideBarD