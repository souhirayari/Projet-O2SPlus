import React from 'react'
import Sidebar from '../Components/SideBar/SideBar'
import DashBordTabLicence from '../Components/DashBord/DashBordTabLicence'
import '../Style/BodyPage.css'


function PageGestLicence() {
    return (
        <>
            <Sidebar />
            <div className='box'>
                <DashBordTabLicence/>
            </div>
        </>
    )
}

export default PageGestLicence