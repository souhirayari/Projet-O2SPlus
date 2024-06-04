import React, { useEffect, useState } from 'react'
import { CCallout, CNavItem, CNavTitle } from '@coreui/react'
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Assurez-vous d'importer FontAwesomeIcon
import {
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

function ConsultAppareil() {
    const currentPageUrl = window.location.pathname;
    const newUrl = currentPageUrl.split('appareils/consulterappareil')[0] + 'article/appareils';
    console.log(newUrl)
    const { idappareil } = useParams();
    console.log(idappareil)
    const [Appareil, setAppareil] = useState({});
    const [Article, setArticle] = useState({});


    const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
    const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets

    useEffect(() => {
        async function getData() {
            try {
                const res = await fetch(`http://localhost:5000/api/article/findOneAppareil/${idappareil}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    return console.log("erreur fetching data");
                }

                const jsondata = await res.json();
                setAppareil(jsondata);

                if (jsondata.idArticle) {
                    const resArticle = await fetch(`http://localhost:5000/api/article/findOneArticle/${jsondata.idArticle}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!resArticle.ok) {
                        return console.log("erreur fetching article data");
                    }

                    const jsonArticle = await resArticle.json();
                    setArticle(jsonArticle);
                }

            } catch (err) {
                console.error("erreur dans getData DashBordView", err);
            }
        }

        getData();
    }, [idappareil, token]);
    console.log(Article)

    const extractDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    console.log(Appareil)
    const vars = {
        'border-top-width': "4px",
        'border-left-color': '#dbdfe6',
        'border-left-width': '1px'
    }


    return (
        <div>
            <div className='Revenir'>
                <a href={newUrl}><FontAwesomeIcon icon={faArrowLeft} size="xl" style={{ color: "#5856d6", }} /> Appareils </a>
            </div>
            <br />
            <h2>Appareil {Appareil.libelle}</h2>
            {Appareil && (
                <div style={{ display: 'flex', gap: '20px' }}>
                    <CCallout style={{ ...vars, borderTopColor: "#5856d6", width: '380px' }} className='viewmodel' >
                        <CNavTitle style={{ textAlign: 'center' }}><h3>Information </h3></CNavTitle>
                        <CNavItem>Code Article <CNavTitle>{Appareil.codeAppareil}</CNavTitle></CNavItem>
                        <CNavItem>Libelle <CNavTitle>{Appareil.libelle}</CNavTitle></CNavItem>
                        <br />
                        <CNavItem>Modele<CNavTitle>{Appareil.modele}</CNavTitle></CNavItem>
                        <CNavItem>Puissance <CNavTitle>{Appareil.puissance}</CNavTitle></CNavItem>
                        <CNavItem>type Modele <CNavTitle> {Appareil.typeModele}</CNavTitle></CNavItem>
                        <br />
                        <CNavItem>Prix Achat <CNavTitle>{Appareil.prixachat}</CNavTitle></CNavItem>
                        <CNavItem>Prix  TTC <CNavTitle> {Appareil.prixTTC}</CNavTitle></CNavItem>
                        <CNavItem>Prix  Ht <CNavTitle> {Appareil.prixHT}</CNavTitle></CNavItem>
                        <CNavItem>TVA <CNavTitle>{Appareil.TVA}</CNavTitle></CNavItem>
                        <CNavItem>Condition <CNavTitle>{Appareil.condition}</CNavTitle></CNavItem>
                        <CNavItem>Couverture  <CNavTitle>{Appareil.couverture}</CNavTitle></CNavItem>
                        <CNavItem>Durée Garantie <CNavTitle> {Appareil.dureeGarentie}</CNavTitle></CNavItem>
                        <br />
                        <CNavItem>Crée le  <CNavTitle>{extractDate(Appareil.createdAt)}</CNavTitle></CNavItem>
                    </CCallout>
                    <CCallout color="info" className='viewmodel' style={{ ...vars, borderTopColor: "#39f", width: '380px' }}   >
                        <CNavTitle style={{ textAlign: 'center' }}><h3>Article </h3></CNavTitle>
                        {Appareil.Article && (
                            <>
                                <CNavItem>Code Article <CNavTitle>{Appareil.Article.codeArticle}</CNavTitle></CNavItem>
                                <CNavItem>Libelle <CNavTitle>{Appareil.Article.libelle}</CNavTitle></CNavItem>
                                <br />
                                <CNavItem>Durée Garantie <CNavTitle> {Appareil.Article.dureeGarentie ? Appareil.Article.dureeGarentie : 'N/A'}</CNavTitle></CNavItem>
                                <CNavItem>Gere en Stock <CNavTitle> {Appareil.Article.gereEnStock ? 'oui' : 'non'}</CNavTitle></CNavItem>
                                <CNavItem>Sérialisé <CNavTitle> {Appareil.gereEnStock ? 'oui' : 'non'}</CNavTitle></CNavItem>
                                <br />
                                <CNavItem>Famille Article <CNavTitle> {Article.FamilleArticle?.libelle}</CNavTitle></CNavItem>
                                <CNavItem>Marque <CNavTitle> {Article.Marque?.libelle}</CNavTitle></CNavItem>
                                <CNavItem>Coefficient <CNavTitle> {Article.FamilleArticle?.coefficient}</CNavTitle></CNavItem>

                            </>

                        )}
                    </CCallout>
                    <CCallout color="success" className='viewmodel' style={{ ...vars, borderTopColor: "#2eb85c", width: '380px' }}  >
                        <CNavTitle style={{ textAlign: 'center' }}><h3>Client </h3></CNavTitle>
                        {Appareil.Clients && (
                            <>
                                <CNavItem>code Client <CNavTitle>{Appareil.Clients.CodeClient}</CNavTitle></CNavItem>

                                <CNavItem>Nom Client <CNavTitle>{Appareil.Clients.Nom}</CNavTitle></CNavItem>
                                <CNavItem>Civilité <CNavTitle>{Appareil.Clients.Civilite}</CNavTitle></CNavItem>
                                <CNavItem>Email <CNavTitle>{Appareil.Clients.Email}</CNavTitle></CNavItem>

                                <br />
                                <CNavItem>Pays<CNavTitle>{Appareil.Clients.pays}</CNavTitle></CNavItem>
                                <CNavItem>Adresse <CNavTitle>{Appareil.Clients.adresse}</CNavTitle></CNavItem>
                                <CNavItem> Ville  <CNavTitle> {Appareil.Clients.ville}</CNavTitle></CNavItem>
                                <br />
                                <CNavItem>Telephone <CNavTitle>{Appareil.Clients.telephone  }</CNavTitle></CNavItem>

                                <br />
                            </>
                        )}
                    </CCallout>
                </div>
            )
            }
        </div >

    )
}

export default ConsultAppareil