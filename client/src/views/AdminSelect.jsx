import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

import logo from "../o2sLogo.png";
function AdminSelect() {
	const navigate = useNavigate();

	const connectedUserDossier = localStorage.getItem("connectedUserDossier");
	console.log("connectedUserDossier", connectedUserDossier);
	return (
		<section>
			<div className="w-screen h-screen grid grid-rows-2 text-4xl md:grid-cols-2    ">
				<div className="w-full h-full bg-sidebar-background centered md:h-screen    ">
					<button
						className=" text-white py-2 px-4 rounded-md hover:bg-[#a7c80f]  focus:outline-none focus:shadow-outline-blue"
						onClick={() => navigate("/dossiers")}
					>
						<div className="flex items-center justify-center">
							<svg
								className="w-6 h-6 mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 011-1v-4a1 1 0 011-1h2a1 1 0 011-1v-4a1 1 0 011-1h2a1 1 0 011-1v-4a1 1 0 011-1h3m-6 0H3m0 0l7 7v10m0-14L3 12V5m6 6l-1.41 1.41L11 16.17V12m0 0l4-4m-4 4l4 4"
								/>
							</svg>
							<span>Continuer vers le tableau de bord</span>
						</div>
					</button>
				</div>
				<div className="w-full h-full bg-[#a7c80f] centered  md:h-screen  ">
					<button
						className=" text-gray-800 py-2 px-4 rounded-md hover:bg-sidebar-background focus:outline-none focus:shadow-outline-gray"
						onClick={() => navigate("/hero")}
					>
						<div className="flex items-center justify-center">
							<svg
								className="w-6 h-6 mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span>Accéder au site web principal</span>
						</div>
					</button>
				</div>
			</div>
		</section>
		// <div className="bg-white shadow-md rounded-md p-4">
		// 	<h2 className="text-xl font-semibold text-gray-800 mb-4">
		// 		Sélectionner une option
		// 	</h2>
		// 	<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
		// 		<button
		// 			className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
		// 			onClick={() => navigate("/sidebar")}
		// 		>
		// 			<div className="flex items-center justify-center">
		// 				<svg
		// 					className="w-6 h-6 mr-2"
		// 					fill="none"
		// 					stroke="currentColor"
		// 					viewBox="0 0 24 24"
		// 					xmlns="http://www.w3.org/2000/svg"
		// 				>
		// 					<path
		// 						strokeLinecap="round"
		// 						strokeLinejoin="round"
		// 						strokeWidth={2}
		// 						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 011-1v-4a1 1 0 011-1h2a1 1 0 011-1v-4a1 1 0 011-1h2a1 1 0 011-1v-4a1 1 0 011-1h3m-6 0H3m0 0l7 7v10m0-14L3 12V5m6 6l-1.41 1.41L11 16.17V12m0 0l4-4m-4 4l4 4"
		// 					/>
		// 				</svg>
		// 				<span>Continuer vers le tableau de bord</span>
		// 			</div>
		// 		</button>
		// 		<button
		// 			className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:shadow-outline-gray"
		// 			onClick={() => navigate("/hero")}
		// 		>
		// 			<div className="flex items-center justify-center">
		// 				<svg
		// 					className="w-6 h-6 mr-2"
		// 					fill="none"
		// 					stroke="currentColor"
		// 					viewBox="0 0 24 24"
		// 					xmlns="http://www.w3.org/2000/svg"
		// 				>
		// 					<path
		// 						strokeLinecap="round"
		// 						strokeLinejoin="round"
		// 						strokeWidth={2}
		// 						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		// 					/>
		// 				</svg>
		// 				<span>Accéder au site web principal</span>
		// 			</div>
		// 		</button>
		// 	</div>
		// </div>
	);
}

export default AdminSelect;
