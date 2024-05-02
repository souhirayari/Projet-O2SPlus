import React from 'react'
import SideBar from '../../Components/SideBar/SideBar'
import AddDossier from '../../Components/AddComponent/AddDossier'
import { useParams } from 'react-router-dom';
import AddUser from '../../Components/AddComponent/AddUser';
import AddLicence from '../../Components/AddComponent/AddLicence';

function PageAjout() {
    const { title } = useParams();
    return (
        <>
            <SideBar />
            <div className='box'>
                {title === 'Dossiers' ? <AddDossier /> : null}
                {title === 'Utilisateurs' ? <AddUser /> : null}
                {title === 'Licences' ? <AddLicence /> : null}
            </div>


        </>
    )
}

export default PageAjout