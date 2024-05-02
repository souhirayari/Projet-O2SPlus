import React from 'react'
import Sidebar from '../../Components/SideBar/SideBar'
import DashBordTabDossier from '../../Components/DashBord/DashBordTabDossier'
import '../../Style/BodyPage.css'

function PageGestDossiers() {
    return (
        <>
            <Sidebar />
            <div className='box'>
                <DashBordTabDossier/>
            </div>
        </>
    )
}

export default PageGestDossiers