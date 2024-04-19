import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import { Switch } from "@headlessui/react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import RestrictedComponent from "../../RestrictedComponent";
import Table from "../../components/Table";
import { AiFillDelete } from "react-icons/ai";

function ShowAllDossier() {
	const [dossiers, setDossiers] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [Enabled, setEnabled] = useState(false);
	const [selectedDossierId, setSelectedDossierId] = useState(null);

	const handleDelete = async (id) => {
		await axios.delete(`http://localhost:3001/api/dossier/deleteDossier/${id}`);
		const { data } = await axios.get(
			"http://localhost:3001/api/dossier/getAllDossier"
		);
		setDossiers(data);
		closeModal();
	};
	const [dossierData, setDossierData] = useState({
		RaisonSociale: "",
		MatriculeFiscale: "",
		Email: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setDossierData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		console.log(dossierData);
	};

	useEffect(() => {
		const getDossiersData = async () => {
			const { data } = await axios.get(
				"http://localhost:3001/api/dossier/getAllDossier"
			);
			setDossiers(data);
		};
		getDossiersData();
	}, []);

	const handleAddDossier = async () => {
		await axios.post(
			"http://localhost:3001/api/dossier/addDossier",
			dossierData
		);
		const { data } = await axios.get(
			"http://localhost:3001/api/dossier/getAllDossier"
		);
		setDossiers(data);
		closeAddModal();
	};

	const filteredDossiers = dossiers.filter(
		(dossier) =>
			dossier.RaisonSociale.toLowerCase().includes(searchTerm.toLowerCase()) ||
			dossier.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			dossier.MatriculeFiscale.toLowerCase().includes(
				searchTerm.toLowerCase()
			) ||
			dossier.id.toString().includes(searchTerm)
	);
	let [isOpen, setIsOpen] = useState(false);
	let [isAddModalOpen, setIsAddModalOpen] = useState(false);

	function openAddModal() {
		setIsAddModalOpen(true);
	}
	function closeAddModal() {
		setIsAddModalOpen(false);
	}

	function closeModal() {
		setIsOpen(false);
	}

	function openModal(id) {
		setSelectedDossierId(id);
		setIsOpen(true);
	}

	const columns = [
		"ID",
		"Raison Sociale",
		"Matricule Fiscale",
		"Email",
		"Actions",
	];

	const data = filteredDossiers.map((dossier) => [
		dossier.id,
		dossier.RaisonSociale,
		dossier.MatriculeFiscale,
		dossier.Email,
		<div className="flex space-x-1">
			<button
				//call the delete function here
				onClick={() => handleDelete(dossier.id)}
				className="text-red-600 hover:text-red-900 "
			>
				<AiFillDelete />
			</button>
		</div>,
	]);

	return (
		<div className="flex h-screen">
			<div className="fixed">
				<Sidebar></Sidebar>
			</div>

			<div className=" w-auto  h-screen   ml-72 p-8 flex flex-col justify-center items-center pr-96">
				<div class="flex items-center pl-96">
					<div class="flex items-center w-full">
						<form class="flex items-center w-full">
							<label for="simple-search" class="sr-only">
								Search
							</label>
							<div class="relative w-full">
								<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<svg
										class="w-5 h-5 text-gray-500 dark:text-gray-400"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
										/>
									</svg>
								</div>
								<input
									type="text"
									id="simple-search"
									placeholder="Recherche..."
									required=""
									class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-white dark:text-black dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
									onChange={(e) => setSearchTerm(e.target.value)}
									style={{ "::placeholder": { color: "red" } }}
								/>
							</div>
						</form>
						<button
							type="button"
							id="createProductButton"
							onClick={() => {
								window.location.href = "/addDossier";
							}}
							data-modal-toggle="createProductModal"
							class="flex items-center justify-center text-[#fefefe] bg-[#4c5ce9] hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 ml-3"
						>
							<svg
								class="h-3.5 w-3.5 mr-1.5 -ml-1"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path
									clip-rule="evenodd"
									fill-rule="evenodd"
									d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
								/>
							</svg>
							Ajouter un dossier
						</button>
					</div>
				</div>
				<br></br>
				<Table columns={columns} data={data} />
			</div>
		</div>
	);
}

const RestrictedShowDossiers = () => {
	return (
		<RestrictedComponent
			component={ShowAllDossier}
			allowedRoles={["AdminSite", "AdminDossier"]}
		/>
	);
};

export default RestrictedShowDossiers;
