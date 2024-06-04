import React, { useEffect, useState } from 'react';
import { CButton } from '@coreui/react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Pagination from 'react-bootstrap/Pagination';
import { Switch } from 'antd';
import '../../../Style/Dossier/userStyle.css';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashCan, faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import UpdateArticle from '../Update/UpdateArticle';

function ArticleD() {
  const [articles, setArticles] = useState([]);
  const dossierId = localStorage.getItem('dossierId');
  const tokenString = localStorage.getItem('token');
  const token = JSON.parse(tokenString);
  const [show, setShow] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch articles
        const res = await fetch(`http://localhost:5000/api/article/findAllArticlebyDossier/${dossierId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) {
          if (res.status === 404) {
            setArticles([]);
          } else {
            throw new Error('Erreur lors de la récupération des articles');
          }
        } else {
          const jsonres = await res.json();
          // Fetch quantities for each article
          if (jsonres) {
            const articlesWithQuantities = await Promise.all(jsonres.map(async (article) => {
              const quantityRes = await fetch(`http://localhost:5000/api/ligneStock/getQuantityByArticle/${article.idArticle}`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              const quantity = await quantityRes.json();
              return { ...article, quantity: quantity.quantity };
            }));
            setArticles(articlesWithQuantities);
          }
        }
      } catch (error) {
        console.error('Erreur fetchData:', error);
      }
    }
    fetchData();
  }, [dossierId, token]);

  const handleDeleteArticle = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/article/deleteArticle/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error('Erreur lors de la suppression de l\'article');
      } else {
        toast.success('La suppression a été effectuée avec succès!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Erreur handleDeleteArticle:', error);
    }
  };

  const extractDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredArticles = articles.filter(article => {
    const libelleMatch = article.libelle.toLowerCase().includes(searchTerm.toLowerCase());
    const creematch = extractDate(article.createdAt).includes(searchTerm);
    const marqueMatch = article.Marque.libelle.toLowerCase().includes(searchTerm.toLowerCase());
    const familleMatch = article.FamilleArticle.libelle.toLowerCase().includes(searchTerm.toLowerCase());
    const prixmatch = String(article.prixAchat).toLowerCase().includes(searchTerm.toLowerCase());
    return libelleMatch || creematch || marqueMatch || familleMatch || prixmatch;
  });
  const currentItems = filteredArticles.slice(startIndex, endIndex);

  const handleClose = () => setShow(false);
  console.log(articles)
  return (
    <>
      <div>
        <div>
          <a href={window.location.href + '/ajouterarticle'}>
            <CButton color="primary" className='btnAjout'>Ajouter un Article</CButton>
          </a>
        </div>
        <InputGroup className="mb-3" style={{ width: '50%' }}>
          <InputGroup.Text>
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#5856d6" }} />
          </InputGroup.Text>
          <Form.Control
            placeholder="Rechercher..."
            aria-label="Search"
            aria-describedby="basic-addon1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <br />
        <Table responsive>
          <thead style={{ textAlign: 'center' }}>
            <tr>
              <th>#</th>
              <th>Libelle</th>
              <th>Famille Article</th>
              <th>Marque</th>
              <th>Prix Achat</th>
              <th>Gérer En Stock</th>
              <th>Quantité</th>
              <th>Crée le</th>
              <th colSpan={3}>Action</th>
            </tr>
          </thead>
          <tbody className='TabAff'>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="10" style={{ textAlign: 'center' }}>Aucun item trouvé</td>
              </tr>
            ) : (
              currentItems.map((article, index) => (
                <tr key={index}>
                  <td><input type="checkbox" name="" id="" /></td>
                  <td>{article.libelle}</td>
                  <td>{article.FamilleArticle.libelle}</td>
                  <td>{article.Marque.libelle}</td>
                  <td>{article.prixAchat}</td>
                  <td>
                    <Switch checked={article.gereEnStock} className={article.gereEnStock ? 'switch-checked' : ''} disabled />
                  </td>
                  <td>{article.quantity}</td>
                  <td>{extractDate(article.createdAt)}</td>
                  <td className='btnView'>
                    <a href={window.location.href + `/consulterarticle/${article.idArticle}`}>
                      <CButton color="dark" variant="outline"><FontAwesomeIcon icon={faEye} /></CButton>
                    </a>
                  </td>
                  <td className='btnEdit' onClick={() => { setShow(true); setSelectedArticle(article); }}>
                    <CButton color="primary" variant="outline" className='edit'>
                      <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#5856d6" }} />
                    </CButton>
                  </td>
                  <td className='btnsupp' onClick={() => handleDeleteArticle(article.idArticle)}>
                    <CButton color="danger" variant="outline" className='supp'>
                      <FontAwesomeIcon icon={faTrashCan} style={{ color: "#f96767" }} />
                    </CButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        {/* Pagination */}
        <Pagination>
          {Array.from({ length: Math.ceil(filteredArticles.length / itemsPerPage) }).map((_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      <UpdateArticle show={show} handleClose={handleClose} article={selectedArticle} />
    </>
  );
}

export default ArticleD;
