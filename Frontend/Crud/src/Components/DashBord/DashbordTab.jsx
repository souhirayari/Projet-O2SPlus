import React from 'react'
import NavBar from '../NavBar/NavBar'
import BodyPage from '../Body/BodyPage'

function DashbordTab({navBarTitle,Component}) {
  
  return (
    <div className='box'>
        <NavBar title={navBarTitle} />
        <BodyPage title={navBarTitle} Component={Component} />
      </div>
  )
}

export default DashbordTab