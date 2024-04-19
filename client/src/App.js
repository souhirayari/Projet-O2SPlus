import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core"; // Import MantineProvider
import AddDossier from "./views/dossier/AddDossier";
import RestrictedShowDossiers from "./views/dossier/ShowAllDossier";
import ShowAllUtilisateur from "./views/utilisateur/ShowAllUtilisateur";
import DetailDossier from "./views/dossier/DetailDossier";
import Sidebar from "./components/Sidebar";
import Layout from "./Layout";
import "./App.css";
import Logo from "./o2sLogo.png";
import Signin from "./views/Signin";
import RestrictedComponent from "./RestrictedComponent";
import AdminSelect from "./views/AdminSelect";
import ShowAllLicence from "./views/licence/ShowAllLicence";
import LandingPageAdmin from "./views/landingPageAdmin/LandingPageAdmin";
import AddVendeur from "./views/vendeur/AddVendeur";
import ShowAllVendeur from "./views/vendeur/ShowAllVendeur";
import ShowAllClient from "./views/client/ShowAllClient";
import AddMouvementStock from "./views/mouvementStock/AddMouvementStock";

const Hero = () => {
	return (
		<div className="h-screen flex items-center justify-center">
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content flex-col lg:flex-row">
					<img
						src={Logo}
						className="max-w-sm rounded-lg shadow-2xl"
						alt="Logo"
					/>
					<div>
						<h1 className="text-5xl font-bold">O2s Manager!</h1>
						<p className="py-6">
							Bienvenue chez o2s manager, le logiciel de gestion de sociétés
							professionnelles.
						</p>
						<button
							onClick={() => {
								window.location.href = "/dossiers";
							}}
							className="btn btn-primary"
						>
							Get Started
						</button>
						<br />
						<br />
						<button
							onClick={() => {
								localStorage.removeItem("token");
								localStorage.removeItem("connectedUserRole");
								window.location.href = "/";
							}}
							className="btn btn-primary"
						>
							logout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const App = () => {
	return (
		<Router>
			{/* Wrap your entire application with MantineProvider */}
			<MantineProvider>
				<Routes>
					<Route path="/" element={<Signin />} />
					<Route
						path="/hero"
						element={
							<RestrictedComponent
								component={Hero}
								allowedRoles={["AdminDossier", "Utilisateur", "AdminSite"]}
							/>
						}
					/>

					<Route
						path="sidebar"
						element={
							<RestrictedComponent
								component={Sidebar}
								allowedRoles={["AdminSite", "AdminDossier"]}
							/>
						}
					/>
					<Route
						path="addDossier"
						element={
							<RestrictedComponent
								component={AddDossier}
								allowedRoles={["AdminSite", "AdminDossier"]}
							/>
						}
					/>
					<Route path="dossiers" element={<RestrictedShowDossiers />} />

					<Route
						path="dossierDetail"
						element={
							<RestrictedComponent
								component={DetailDossier}
								allowedRoles={["AdminSite", "AdminDossier"]}
							/>
						}
					/>

					<Route
						path="adminSelect"
						element={
							<RestrictedComponent
								component={AdminSelect}
								allowedRoles={["AdminSite", "AdminDossier"]}
							/>
						}
					/>
					<Route
						path="users"
						element={
							<RestrictedComponent
								component={ShowAllUtilisateur}
								allowedRoles={["AdminSite", "AdminDossier"]}
							/>
						}
					/>

					<Route
						path="licences"
						element={
							<RestrictedComponent
								component={ShowAllLicence}
								allowedRoles={["AdminSite", "AdminDossier"]}
							/>
						}
					/>

					<Route
						path="landingPageAdmin"
						element={
							<RestrictedComponent
								component={LandingPageAdmin}
								allowedRoles={["AdminSite", "AdminDossier"]}
							/>
						}
					/>
					<Route
						path="ajouterunvendeur"
						element={
							<RestrictedComponent
								component={AddVendeur}
								allowedRoles={["AdminDossier", "Utilisateur"]}
							/>
						}
					/>

					<Route
						path="listedesvendeurs"
						element={
							<RestrictedComponent
								component={ShowAllVendeur}
								allowedRoles={["AdminDossier", "Utilisateur"]}
							/>
						}
					/>
					<Route
						path="listedesclients"
						element={
							<RestrictedComponent
								component={ShowAllClient}
								allowedRoles={["AdminDossier", "Utilisateur"]}
							/>
						}
					/>

					<Route
						path="ajouterunmouvement"
						element={
							<RestrictedComponent
								component={AddMouvementStock}
								allowedRoles={["AdminDossier", "Utilisateur", "AdminSite"]}
							/>
						}
					/>
				</Routes>
			</MantineProvider>
		</Router>
	);
};

export default App;
