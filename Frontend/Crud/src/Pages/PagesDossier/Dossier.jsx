import React, { useState, useEffect } from 'react';
import SideBarD from '../../Components/Dossier/SideBarD';
import NavbarD from './NavbarD';
import '../../Style/Dossier/test2.css';

function Dossier({ dossier }) {
    const [visible, setVisible] = useState(true);
    const [show, setShow] = useState(false);
    console.log(dossier)

    return (
        <div className='containerBody'>
            <SideBarD visible={visible} show={show} setShow={setShow} />
            <div className='biglayout'>
                <NavbarD setVisible={setVisible} visible={visible} show={show} setShow={setShow} title={'Dossier'} />
                <div className="boxBody">

                    <h2>Dossier Détail</h2>
                    <div>
                        <div class="container">
                            <div class="row gutters">
                                <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <div class="row gutters">
                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <h6 class="mb-2 text-primary">Détails</h6>
                                                </div>
                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div class="form-group">
                                                        <label for="fullName">Raison Sociale </label>
                                                        <h6>{dossier.RaisonSociale}</h6>
                                                    </div>
                                                </div>
                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div class="form-group">
                                                        <label for="eMail">Email</label>
                                                        <h6>{dossier.Email}</h6>
                                                    </div>
                                                </div>
                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div class="form-group">
                                                        <label for="phone">Matricule Fiscale</label>
                                                        <h6>{dossier.MatriculeFiscale}</h6>
                                                    </div>
                                                </div>
                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div class="form-group">
                                                        <label for="website">Telephone</label>
                                                        <h6>{dossier.Telephone}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row gutters">
                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <h6 class="mt-3 mb-2 text-primary">Addresse</h6>
                                                </div>

                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div class="form-group">
                                                        <label for="ciTy">Adresse</label>
                                                        <h6>{dossier.Adresse}</h6>
                                                    </div>
                                                </div>
                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div class="form-group">
                                                        <label for="sTate">ville</label>
                                                        <h6>{dossier.Ville}</h6>
                                                    </div>
                                                </div>
                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div class="form-group">
                                                        <label for="zIp">code Postal</label>
                                                        <h6>{dossier.CodePostal}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row gutters">
                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <h6 class="mt-3 mb-2 text-primary">Site et création</h6>
                                                </div>

                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div class="form-group">
                                                        <label for="ciTy">Site web</label>
                                                        <h6>{dossier.SiteWeb}</h6>
                                                    </div>
                                                </div>
                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div class="form-group">
                                                        <label for="sTate">Crée le </label>
                                                        <h6>{dossier.createdAt}</h6>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dossier;
