import React, { useState, useEffect } from 'react';
import SideBarD from '../../Components/Dossier/SideBarD';
import NavbarD from './NavbarD';
import getRoutes from '../../Routes';

function Home() {
    const [visible, setVisible] = useState(true);
    const [show, setShow] = useState(false);


    return (
        <div>
            <SideBarD visible={visible} show={show} setShow={setShow} />
            <div className={visible ? 'biglayout' : 'smalllayout'}>
                <NavbarD setVisible={setVisible} visible={visible} show={show} setShow={setShow} title={'Dossier'} />
                <div className="boxBody">

                    <h2>Dossier Détail</h2>
                    <div>
                        <h3>Information</h3>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
