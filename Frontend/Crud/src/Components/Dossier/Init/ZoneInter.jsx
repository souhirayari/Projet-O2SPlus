import React, { useEffect, useState } from 'react';
import { CButton } from '@coreui/react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Pagination from 'react-bootstrap/Pagination'; // Import de la pagination
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import UpdateZoneInter from '../Update/UpdateZoneInter';


function ZoneInter() {
  const [Zones, setZones] = useState([]);
  const dossierId = localStorage.getItem('dossierId');
  const tokenString = localStorage.getItem('token');
  const token = JSON.parse(tokenString);
  const [show, setShow] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null); // Ajout de l'état pour l'utilisateur sélectionné
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // État pour suivre la page actuelle
  const itemsPerPage = 7; // Nombre d'éléments par page

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:5000/api/zoneIntervention/getAllZoneInterventionByDossier/${dossierId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) {
          if (res.status === 404) {
            setZones([]);
          } else {
            throw new Error('Erreur lors de la récupération des Zone intervention');
          }
        } else {
          const jsonres = await res.json();
          setZones(jsonres);
        }
      } catch (error) {
        console.error('Erreur fetchData: Zone intervention', error);
      }
    }
    fetchData();
  }, [dossierId, token]);

  const handleDeleteZoneInter = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/zoneIntervention/deleteZoneIntervention/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error('Erreur lors de la suppression du Zone intervention ');
      } else {
        toast.success('La suppression a été effectuée avec succès!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Erreur handleDeleteZoneintervention:', error);
      toast.error('Erreur lors de la suppression du Zone intervention');

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
  const filteredZone = Zones.filter(zone => {
    const libelleMatch = zone.Libelle.toLowerCase().includes(searchTerm.toLowerCase());
    const creematch = extractDate(zone.createdAt).includes(searchTerm);
    return libelleMatch || creematch;
  });
  const currentItems = filteredZone.slice(startIndex, endIndex);

  const handleClose = () => setShow(false);

  return (
    <>
      <div>
        <div>
          <a href={window.location.href + '/ajouterzoneinter'}>
            <CButton color="primary" className='btnAjout'>Ajouter une Zone d'Intervention</CButton>
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
              <th>Libélle</th>
              <th>Duree (min)</th>
              <th>Note</th>
              <th>Crée le</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody className='TabAff'>

            {currentItems.length === 0 ?
              (<tr>
                <td colSpan="10">Aucun item trouvé</td>
              </tr>)
              : (currentItems.map((Zone, index) => (
                <tr key={index}>
                  <td><input type="checkbox" name="" id="" /></td>
                  <td>{Zone.Libelle}</td>
                  <td>{Zone.Duree} min</td>
                  <td>{Zone.Note}</td>
                  <td>{extractDate(Zone.createdAt)}</td>
                  <td className='btnEdit' onClick={() => { setShow(true); setSelectedZone(Zone); }}>
                    <CButton color="primary" variant="outline" className='edit'>
                      <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#5856d6" }} />
                    </CButton>
                  </td>
                  <td className='btnsupp' onClick={() => handleDeleteZoneInter(Zone.id)}>
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
          {Array.from({ length: Math.ceil(Zones.length / itemsPerPage) }).map((_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      <UpdateZoneInter show={show} handleClose={handleClose} zone={selectedZone} />
    </>
  )
}

export default ZoneInter
