import React, { useEffect, useState } from 'react'
import { CCallout, CNavItem, CNavTitle } from '@coreui/react'
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Assurez-vous d'importer FontAwesomeIcon
import {
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

function ConsultArticle() {
  const currentPageUrl = window.location.pathname;
  const newUrl = currentPageUrl.split('articles/consulterarticle')[0] + 'articles';
  console.log(newUrl)
  const { idarticle } = useParams();
  console.log(idarticle)
  const [Article, setarticle] = useState({});


  const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
  const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`http://localhost:5000/api/article/findOneArticle/${idarticle}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
          }
        });

        if (!res.ok) {
          return console.log("erreur fetching data");

        }

        const jsondata = await res.json();
        setarticle(jsondata);

      } catch (err) {
        console.error("erreur dans getData DashBordView", err);
      }
    }

    getData();
  }, [idarticle]); // Ajoutez UserId en tant que dépendance pour recharger les données lorsque l'ID du User change

  const extractDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  console.log(Article)



  return (
    <div>
      <div className='Revenir'>
        <a href={newUrl}><FontAwesomeIcon icon={faArrowLeft} size="xl" style={{ color: "#5856d6", }} /> Articles </a>
      </div>
      <br />
      <h2>Article {Article.libelle}</h2>
      {Article && (
        <CCallout color="success" className='viewmodel' style={{ width: '800px' }} >
          <CNavTitle><h4>Information </h4></CNavTitle>
          <div style={{ display: 'flex', gap: '300px', }} >
            <div>
              <CNavItem>Code Article <CNavTitle>{Article.codeArticle}</CNavTitle></CNavItem>
              <CNavItem>Libelle <CNavTitle>{Article.libelle}</CNavTitle></CNavItem>
              <CNavItem>type <CNavTitle>{Article.type}</CNavTitle></CNavItem>
              <CNavItem>Famille Article <CNavTitle> {Article.FamilleArticle ? Article.FamilleArticle.libelle : ''} </CNavTitle></CNavItem>
              <CNavItem>Coefficient <CNavTitle> {Article.FamilleArticle ? Article.FamilleArticle.coefficient : ''}</CNavTitle></CNavItem>

              <CNavItem>Marque <CNavTitle> {Article.Marque ? Article.Marque.libelle : ''}  </CNavTitle></CNavItem>
              <br />
              <CNavItem>Modele<CNavTitle>{Article.modele}</CNavTitle></CNavItem>
              <CNavItem>Puissance <CNavTitle>{Article.puissance}</CNavTitle></CNavItem>
              <CNavItem>type Modele <CNavTitle> {Article.typeModele}</CNavTitle></CNavItem>
              <br />
              <CNavItem>Prix Achat <CNavTitle>{Article.prixachat}</CNavTitle></CNavItem>
              <CNavItem>Prix  TTC <CNavTitle> {Article.prixTTC}</CNavTitle></CNavItem>
              <CNavItem>Prix  Ht <CNavTitle> {Article.prixHT}</CNavTitle></CNavItem>
              <CNavItem>TVA <CNavTitle>{Article.TVA}</CNavTitle></CNavItem>
            </div>
            <div >
              <CNavItem>Condition <CNavTitle>{Article.condition}</CNavTitle></CNavItem>
              <CNavItem>Couverture  <CNavTitle>{Article.couverture}</CNavTitle></CNavItem>
              <CNavItem>Valorisation  <CNavTitle>{Article.valorisation}</CNavTitle></CNavItem>
              <CNavItem>Durée Garantie <CNavTitle> {Article.dureeGarentie}</CNavTitle></CNavItem>
              <CNavItem>Gérer en Stock <CNavTitle>{Article.gereEnStock ? 'oui' : 'non'}</CNavTitle></CNavItem>
              <CNavItem>Sérialiser <CNavTitle>{Article.Serialize ? 'oui' : 'non'}</CNavTitle></CNavItem>
              <br />
              <br />
              <br />
              <CNavItem>Crée le  <CNavTitle>{extractDate(Article.createdAt)}</CNavTitle></CNavItem>



            </div>






          </div>


        </CCallout>
      )}
    </div>

  )
}

export default ConsultArticle