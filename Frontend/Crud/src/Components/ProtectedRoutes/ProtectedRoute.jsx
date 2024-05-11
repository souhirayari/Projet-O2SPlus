import { Outlet, Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


const  PrivateRoutes = ({ allowRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Si aucun token n'est trouvé, redirige l'utilisateur vers la page de connexion
    return <Navigate to="/SignIn" />;
  } else {
    try {
      // Décodez le token JWT pour obtenir les informations de l'utilisateur
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.user.Role;

      // Vérifie si le rôle de l'utilisateur est autorisé
      if (!allowRoles.includes(userRole)) {
        // Si le rôle de l'utilisateur n'est pas autorisé, redirige-le vers une page d'erreur ou une page non autorisée
        return <Navigate to="/Unauthorized" />;
      } else {
        // Si le rôle de l'utilisateur est autorisé, affiche les routes protégées
        return <Outlet />;
      }
    } catch (error) {
      // En cas d'erreur lors du décodage du token, redirige également vers une page d'erreur
      console.error("Erreur lors du décodage du token :", error);
      return <Navigate to="/ErrorPage" />;
    }
  }
};

export default PrivateRoutes;
