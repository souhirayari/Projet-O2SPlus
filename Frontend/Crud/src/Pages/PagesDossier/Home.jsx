import React, { useState } from 'react'
import SideBarD from '../../Components/Dossier/SideBarD'
import NavbarD from './NavbarD'


function Home() {
  const [visible, setVisible] = useState(true)
  const [show, setShow] = useState(false)

  return (
    <div>
      <SideBarD visible={visible} show={show} setShow={setShow} />
      <div className={visible ? 'biglayout' : 'smalllayout'} >
        <NavbarD setVisible={setVisible} visible={visible} show={show} setShow={setShow} />
      </div>
    </div>
  )
}

export default Home