import React, { useEffect, useState } from 'react'
import {
    CSidebar,
    CSidebarBrand,
    CSidebarHeader,
    CSidebarNav,
    CSidebarToggler,
    CNavTitle,
    CNavItem,
    CNavGroup,
    CNavbarToggler,
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
                        <CNavItem href="/accueil" className='linksidebar'   > <FontAwesomeIcon icon={faGaugeSimpleHigh} /> Dashboard</CNavItem>
                        <CNavItem href="/init" className='linksidebar'  > <FontAwesomeIcon icon={faBookmark} /> initialisation </CNavItem>

                        <CNavTitle>utilisateurs</CNavTitle>
                        <CNavGroup toggler={<a href={`/dossier${dossier ? dossier.RaisonSociale : ''}/utilisateurs`} className='linksidebar' > <FontAwesomeIcon icon={faUsers} /> Utilisateurs</a>}>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/utilisateurs`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Utilisateurs</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/fournisseurs`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Fournisseurs</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/technicien`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Techniciens</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/vendeurs`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Vendeur</CNavItem>
                        </CNavGroup>
                        <CNavTitle>Article Stocks</CNavTitle>
                        <CNavGroup toggler={<a href={`/dossier${dossier ? dossier.RaisonSociale : ''}/articles`} className='linksidebar' > <FontAwesomeIcon icon={faBoxArchive} /> Article</a>}>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/articles`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Article</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/appareils`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Appareil</CNavItem>
                        </CNavGroup>
                        <CNavGroup toggler={<a href={`/dossier${dossier ? dossier.RaisonSociale : ''}/stocks`} className='linksidebar'> <FontAwesomeIcon icon={faTruckRampBox} /> Stocks</a>}>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/mouvements`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Mouvements</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/entree`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Entree</CNavItem>
                            <CNavItem href={`/dossier${dossier ? dossier.RaisonSociale : ''}/sortie`}><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Sortie</CNavItem>
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
                <CSidebar className="border-end" narrow colorScheme="dark" style={{ width: '60px' }} >
                    <CSidebarHeader className='smallheader'>
                        <CSidebarBrand className='smallimg'> <img src={logo} alt="logo" /></CSidebarBrand>
                    </CSidebarHeader>
                    <CSidebarNav className='smallside'>
                        <CNavItem href="/dashboard" className='linksidebar'> <FontAwesomeIcon icon={faGaugeSimpleHigh} /> </CNavItem>
                        <CNavItem href="/init" className='linksidebar'> <FontAwesomeIcon icon={faBookmark} /> </CNavItem>
                        <CNavItem href="/utilisateurs" className='linksidebar'> <FontAwesomeIcon icon={faUsers} /> </CNavItem>
                        <CNavItem href="/article" className='linksidebar'> <FontAwesomeIcon icon={faBoxArchive} /> </CNavItem>
                        <CNavItem href="/stocks" className='linksidebar'> <FontAwesomeIcon icon={faTruckRampBox} /> </CNavItem>
                        <CNavItem href="/vente" className='linksidebar'> <FontAwesomeIcon icon={faTags} /> </CNavItem>
                        <CNavItem href="/achat" className='linksidebar'> <FontAwesomeIcon icon={faCartShopping} /> </CNavItem>
                        <CNavItem href="/contrats" className='linksidebar'> <FontAwesomeIcon icon={faFileContract} /> </CNavItem>
                        <CNavItem href="/intervention" className='linksidebar'> <FontAwesomeIcon icon={faScrewdriverWrench} /> </CNavItem>
                        <CNavItem href="/finance" className='linksidebar'> <FontAwesomeIcon icon={faCircleDollarToSlot} /> </CNavItem>
                        <CNavItem href="/comptabilite" className='linksidebar'> <FontAwesomeIcon icon={faFileInvoiceDollar} /> </CNavItem>
                        <CNavItem href="/statistique" className='linksidebar'> <FontAwesomeIcon icon={faChartSimple} /> </CNavItem>
                        <CNavItem href="/dossier/info" className='linksidebar'> <FontAwesomeIcon icon={faFileImport} /> </CNavItem>
                        <CNavItem className='linksidebar' onClick={handleLogout}> <FontAwesomeIcon icon={faRightFromBracket} /> </CNavItem>

                    </CSidebarNav>
                </CSidebar>

            )}
        </div>
    )
}

export default SideBarD