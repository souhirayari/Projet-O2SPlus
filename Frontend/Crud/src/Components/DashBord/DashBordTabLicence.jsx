import React from 'react'
import NavBar from '../NavBar/NavBar'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Licence from '../Body/Licence'
import { useState } from 'react';


function DashBordTabLicence() {
    const title = "Licences"
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div>
            <NavBar title={title} />
            <div className='BodyBox'>
                <br />
                <br />
                <div className='Body-header'>
                    <div className="search-container">
                    <input
                            type='text'
                            placeholder='Rechercher'
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Mettre à jour la valeur de recherche
                        />
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    </div>
                    <Button variant="primary"><a href={`/Ajouter/${title}`}>Ajouter {title}</a> </Button>
                </div>
                <br />
                <div className='body'>
                    <Licence searchTerm={searchTerm} />
                </div>
            </div>
        </div>
    )
}

export default DashBordTabLicence