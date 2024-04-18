import './App.css';
import Admin from './Pages/Admin';
import Home from './Pages/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from './Pages/User';
import PageViewwDossier from './Pages/PageViewDossier';
import PageViewUser from './Pages/PageViewUser';
import PageViewLicence from './Pages/PageViewLicence';
import PageGestDossiers from './Pages/PageGestDossiers';
import PageGestUser from './Pages/PageGestUser';
import PageGestLicence from './Pages/PageGestLicence';
import PageAjout from './Pages/PageAjout';
import PageSign from './Pages/PageSign';
import Profile from './Components/Profile/Profile';
import PageConfimation from './Pages/PageConfimation';
import PrivateRoutes from './Components/ProtectedRoutes/ProtectedRoute';
import PageError from './Pages/PageError';
import { jwtDecode } from "jwt-decode";
import Unauthorized from './Pages/Unauthorized';






function App() {


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

          <Route path='/ErrorPage' element={<PageError />} />




          <Route path='/home' element={<Home />} />
          <Route element={<PrivateRoutes allowRoles={['adminSite','adminDossier']}  />}>
          <Route path='/admin' element={<Admin />} />
          </Route>
          <Route element={<PrivateRoutes allowRoles={['user']}  />}>
          <Route path='/user' element={<User />} />
          </Route>



          <Route path='/Unauthorized' element={<Unauthorized />} />



        </Routes>
      </Router>

    </>
  );
}

export default App;
