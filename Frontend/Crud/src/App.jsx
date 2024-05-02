import './App.css';
import Admin from './Pages/Admin';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from './Pages/User';
import PageViewwDossier from './Pages/PagesAdmin/PageViewDossier';
import PageViewUser from './Pages/PagesAdmin/PageViewUser';
import PageViewLicence from './Pages/PagesAdmin/PageViewLicence';
import PageGestDossiers from './Pages/PagesAdmin/PageGestDossiers';
import PageGestUser from './Pages/PagesAdmin/PageGestUser';
import PageGestLicence from './Pages/PagesAdmin/PageGestLicence';
import PageAjout from './Pages/PagesAdmin/PageAjout';
import PageSign from './Pages/PageSign';
import Profile from './Components/Profile/Profile';
import PageConfimation from './Pages/PageConfimation';
import PrivateRoutes from './Components/ProtectedRoutes/ProtectedRoute';
import PageError from './Pages/PageError';
import Unauthorized from './Pages/Unauthorized';
import Home from './Pages/PagesDossier/Home';
import { useState,useEffect } from 'react';






function App() {
  const [dossier,setDossier]=useState(null)

  const dossierId = localStorage.getItem('dossierId')
  

  useEffect(() => {
    async function getData() {
      try {
        const tokenString = localStorage.getItem('token'); // Suppose que vous stockez le token dans le localStorage
        const token = JSON.parse(tokenString); // Analyser la chaîne JSON pour obtenir le token sans les guillemets
        const resDossier = await fetch(`http://localhost:5000/api/dossier/findDossierById/${dossierId}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Ajout du token d'authentification dans le header
          }
        });

        if (!resDossier.ok) {
          return console.log("erreur fetching data");

        }
        const dossierData = await resDossier.json();
        setDossier(dossierData);

      } catch (err) {
        console.error("erreur dans getData SidebarDossier", err);
      }
    }

    getData();
  }, [dossierId]);


  return (
    <>
      <ToastContainer position="top-center"
        reverseOrder={true} />
      <Router>
        <Routes>
          <Route path='/SignIn' element={<PageSign />} exact />
          <Route path='/confirm/:activationCode' element={<PageConfimation />} />

          <Route element={<PrivateRoutes allowRoles={['adminSite']} />} >
            <Route path='/' element={<PageGestDossiers />} />
            <Route path='/Utilisateurs' element={<PageGestUser />} />
            <Route path='/Licences' element={<PageGestLicence />} />

            <Route path={`/Dossier/:dossierId`} element={<PageViewwDossier />} />
            <Route path={`/utilisateur/:userId`} element={<PageViewUser />} />
            <Route path={`/licence/:licenceId`} element={<PageViewLicence />} />

            <Route path="/Ajouter/:title" element={<PageAjout />} />

            <Route path='/Profile' element={<Profile />} />


          </Route>
          <Route element={<PrivateRoutes allowRoles={['adminDossier']} />}>
            <Route path={ dossier ? `/dossier${dossier.RaisonSociale}/accueil` : ''} element={<Home />} />


          </Route>

          <Route path='/ErrorPage' element={<PageError />} />




          <Route path='/home' element={<Home />} />
          <Route element={<PrivateRoutes allowRoles={['adminSite', 'adminDossier']} />}>
            <Route path='/admin' element={<Admin />} />
          </Route>
          <Route element={<PrivateRoutes allowRoles={['user']} />}>
            <Route path='/user' element={<User />} />
          </Route>



          <Route path='/Unauthorized' element={<Unauthorized />} />



        </Routes>
      </Router>

    </>
  );
}

export default App;
