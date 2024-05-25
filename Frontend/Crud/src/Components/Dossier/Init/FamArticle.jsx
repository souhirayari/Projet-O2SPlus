import React, { useEffect, useState } from 'react';
import { CButton } from '@coreui/react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Pagination from 'react-bootstrap/Pagination'; // Import de la pagination
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import UpdateModeRegl from '../Update/UpdateModeRegl';
import UpdateFamilleArticle from '../Update/UpdateFamilleArticle';


function FamArticle() {
  const [Familles, setFamille] = useState([]);
  const dossierId = localStorage.getItem('dossierId');
  const tokenString = localStorage.getItem('token');
  const token = JSON.parse(tokenString);
  const [show, setShow] = useState(false);
  const [selectedfamille, setSelectedfamille] = useState(null); // Ajout de l'état pour l'utilisateur sélectionné
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // État pour suivre la page actuelle
  const itemsPerPage = 7; // Nombre d'éléments par page


  useEffect(() => {
    async function fetchData() {
      try {
        const [res1, res2] = await Promise.all([
          fetch(`http://localhost:5000/api/article/findAllFamillebydossier/${dossierId}`, {
            headers: {
              'authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
            }
          }),

          fetch(`http://localhost:5000/api/article/findAllfamArtFourBydossier/${dossierId}`, {
            headers: {
              'authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
            }
          })
        ]);

        if (!res1.ok || !res2.ok) {
          if (res1.status === 404 && res2.status === 404) {
            setFamille([]);
          } else {
            throw new Error('Erreur lors de la récupération des données');
          }
        } else {
          const familiesData = await res1.json();
          const fourfamille = await res2.json();
          // Combinaison des informations de famille avec les informations des fournisseurs
          const families = familiesData.map(family => {
            const associated = fourfamille.filter(fourfam => fourfam.idFamArt === family.idFamArt);

            const fourFamArt = associated.map(fam => ({
              delaisliv: fam.delaisliv,
              principale: fam.principale,
              equivStokage: fam.equivStokage
            }));

            return {
              ...family,
              fourFamArt
            };
          });

          setFamille(families);
        }
      } catch (error) {
        console.error('Erreur fetchData:', error);
      }
    }
    fetchData();
  }, [dossierId, token]);
  console.log(Familles)

  const handleDeleteFamille = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/article/deleteFamille/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error('Erreur lors de la suppression du Famille Article ');
      } else {
        toast.success('La suppression a été effectuée avec succès!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Erreur handleDeleteFamille Article:', error);
      toast.error('Erreur lors de la suppression du Famille Article');

    }
  };
  const extractDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredFamille = Familles.filter(famille => {
    const libelleMatch = famille.libelle.toLowerCase().includes(searchTerm.toLowerCase());
    const creematch = extractDate(famille.createdAt).includes(searchTerm);
    // const valoriationmatch = famille.valorisation.toLowerCase().includes(searchTerm.toLowerCase());
    return libelleMatch || creematch ;
  });
  const currentItems = filteredFamille.slice(startIndex, endIndex);

  const handleClose = () => setShow(false);

  return (
    <>
      <div>
        <div>
          <a href={window.location.href + '/ajouterfamillearticle'}>
            <CButton color="primary" className='btnAjout'>Ajouter un Famille Article</CButton>
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
              <th>Coefficient</th>
              <th>Valorisation</th>
              <th>Fournisseur</th>
              <th>delais livraison</th>
              <th>principale</th>
              <th>Equivalent Stockage </th>
              <th>Crée le</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody className='TabAff'>

            {currentItems.length === 0 ?
              (<tr>
                <td colSpan="10">Aucun item trouvé</td>
              </tr>)
              : (currentItems.map((famille, index) => (
                <tr key={index}>
                  <td><input type="checkbox" name="" id="" /></td>
                  <td>{famille.libelle}</td>
                  <td>{famille.coefficient}</td>
                  <td>{famille.valorisation === 'D' ? 'Der Pa' : 'PEMP'}</td>
                  <td>
                    {famille.Fournisseurs.length !== 0 ?
                      famille.Fournisseurs.map((four) => four.nom).join(", ")
                      : 'N/A'}
                  </td>
                  <td>{famille.fourFamArt != 0 && famille.fourFamArt[0].delaisliv !== null ? famille.fourFamArt.map((fam) => fam.delaisliv).join(",") : 'N\\A'}</td>
                  <td>{famille.fourFamArt != 0 && famille.fourFamArt[0].principale !== null ? famille.fourFamArt.map((fam) => fam.principale).join(",") : 'N\\A'}</td>
                  <td>{famille.fourFamArt != 0 && famille.fourFamArt[0].equivStokage !== null ? famille.fourFamArt.map((fam) => fam.equivStokage).join(",") : 'N\\A'}</td>

                  <td>{extractDate(famille.createdAt)}</td>
                  <td className='btnEdit' onClick={() => { setShow(true); setSelectedfamille(famille); }}>
                    <CButton color="primary" variant="outline" className='edit'>
                      <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#5856d6" }} />
                    </CButton>
                  </td>
                  <td className='btnsupp' onClick={() => handleDeleteFamille(famille.idFamArt)}>
                    <CButton color="danger" variant="outline" className='supp'>
                      <FontAwesomeIcon icon={faTrashCan} style={{ color: "#f96767" }} />
                    </CButton>
                  </td>
                </tr>
              )))}
          </tbody>
        </Table>
        {/* Pagination */}
        <Pagination>
          {Array.from({ length: Math.ceil(Familles.length / itemsPerPage) }).map((_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      <UpdateFamilleArticle show={show} handleClose={handleClose} famille={selectedfamille} />
    </>
  )
}

export default FamArticle
