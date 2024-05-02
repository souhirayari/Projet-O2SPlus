import React from 'react'
import Sidebar from '../../Components/SideBar/SideBar'
import DashBordTabUser from '../../Components/DashBord/DashBordTabUser'
import '../../Style/BodyPage.css'


function PageGestUser() {
  return (
    <>
    <Sidebar/>
    <div className='box'>
      <DashBordTabUser/>
    </div>
    </>
  )
}

export default PageGestUser