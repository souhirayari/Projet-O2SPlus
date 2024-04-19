import React from "react";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Delete, Search } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";

function ShowAllVendeur() {
	const [vendeurs, setVendeurs] = useState([]);
	const dossierId = localStorage.getItem("connectedUserDossier");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;
	const lastIndex = currentPage * itemsPerPage;
	const firstIndex = lastIndex - itemsPerPage;
	const [searchTerm, setSearchTerm] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedVendeur, setSelectedVendeur] = useState(null);
	let [isOpen, setIsOpen] = useState(false);

	function closeModifyModal() {
		setIsOpen(false);
	}

	function openModifyModal() {
		setIsOpen(true);
	}

	const openModal = (vendeur) => {
		setSelectedVendeur(vendeur);
		setIsModalOpen(true);
	};

	// Function to close modal
	const closeModal = () => {
		setSelectedVendeur(null);
		setIsModalOpen(false);
	};

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};
	const filteredVendeurs = vendeurs.filter(
		(vendeur) =>
			vendeur.Nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
			vendeur.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			vendeur.Telephone.toLowerCase().includes(searchTerm.toLowerCase()) ||
			vendeur.CodeVendeur.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const currentItems = filteredVendeurs.slice(firstIndex, lastIndex);
	const numberOfPages = Math.ceil(filteredVendeurs.length / itemsPerPage);

	const numbers = [...Array(numberOfPages + 1).keys()].slice(1);

	const handleDelete = async (id) => {
		await axios.delete(`http://localhost:3001/api/vendeur/deleteVendeur/${id}`);
		// const { data } = await axios.get(
		// 	`http://localhost:3001/api/vendeur/getAllVendeurByDossier/${dossierId}`
		// );
		// setVendeurs(data);
	};

	useEffect(() => {
		const getVendeursData = async () => {
			const { data } = await axios.get(
				`http://localhost:3001/api/vendeur/getAllVendeurByDossier/${dossierId}`
			);
			setVendeurs(data);
		};
		getVendeursData();
	}, []);

	const columns = ["", "Nom", "Email", "Télèphone", "Code ", "Actions"];

	const data = currentItems.map((vendeur) => [
		vendeurs.indexOf(vendeur) + 1,
		vendeur.Nom,
		vendeur.Email,
		vendeur.Telephone,
		vendeur.CodeVendeur,
		<div className="flex justify-around">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				onClick={() => openModal(vendeur)}
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6 hover:cursor-pointer "
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
				/>
			</svg>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				onClick={openModifyModal}
				strokeWidth={1.5}
				stroke="#4c5ce9"
				className="w-6 h-6 hover:cursor-pointer "
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
				/>
			</svg>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="#800000"
				class="w-6 h-6 hover:cursor-pointer "
				onClick={() => {
					Swal.fire({
						title: "Êtes-vous sûr de vouloir supprimer ce vendeur?",
						icon: "warning",
						showCancelButton: true,
						confirmButtonColor: "#3085d6",
						cancelButtonColor: "#d33",
						confirmButtonText: "Yes, delete it!",
					}).then((result) => {
						if (result.isConfirmed) {
							handleDelete(vendeur.id);

							window.location.reload(
								setTimeout(() => {
									window.location.href = "/listedesvendeurs";
								}, 500)
							);
						} else if (result.isDenied) {
							Swal.fire("Vendeur non supprimé", "", "info");
						}
					});
				}}
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
				/>
			</svg>
		</div>,
	]);

	const handleResetSearch = () => {
		setSearchTerm("");
	};

	return (
		<div className="grid grid-cols-12 min-h-screen font-roboto  bg-gray-200 ">
			<div className=" fixed">
				<Sidebar></Sidebar>
			</div>
			<div className=" col-span-12  ">
				<div className="text-3xl text-center text-burgendy  mt-10 pl-52">
					Liste Des Vendeurs
				</div>
			</div>
			<div className="col-start-5 col-span-2 mt-24 mb-5 relative">
				<input
					type="tel"
					id="example4"
					onChange={handleSearch}
					value={searchTerm}
					className="rounded-lg border-2 border-black flex-1 appearance-none w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent pl-10"
					placeholder="Recherche..."
				/>
				{searchTerm && (
					<Delete
						className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer  "
						color="#191919"
						onClick={handleResetSearch}
					/>
				)}
				{!searchTerm && (
					<Search
						className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer  "
						color="#800000"
					/>
				)}
			</div>

			<div className=" col-start-11 col-span-1  mt-24 hover:scale-110 ">
				<button
					type="submit"
					onClick={() => {
						window.location.href = "/ajouterunvendeur";
					}}
					className="w-full bg-[#800000] hover:bg-[#800000] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Ajouter
				</button>
			</div>

			<div className="col-start-4  mb-36 col-span-8">
				<Table columns={columns} data={data} />
				<Transition appear show={isOpen} as={Fragment}>
					<Dialog
						as="div"
						className="relative z-10 font-roboto  "
						onClose={closeModifyModal}
					>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-black/25" />
						</Transition.Child>

						<div className="fixed inset-0 overflow-y-auto">
							<div className="flex min-h-full items-center justify-center p-4 text-center">
								<Transition.Child
									as={Fragment}
									enter="ease-out duration-300"
									enterFrom="opacity-0 scale-95"
									enterTo="opacity-100 scale-100"
									leave="ease-in duration-200"
									leaveFrom="opacity-100 scale-100"
									leaveTo="opacity-0 scale-95"
								>
									<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
										<Dialog.Title
											as="h3"
											className=" text-center text-lg font-medium leading-6 text-burgendy mb-10"
										>
											Modifier Vendeur
										</Dialog.Title>
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												Modifier les informations du vendeur
											</p>
										</div>

										<div className="mt-4">
											<button
												type="button"
												className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
												onClick={closeModifyModal}
											>
												Got it, thanks!
											</button>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition>

				{isModalOpen && (
					<div className="fixed z-10 inset-0 overflow-y-auto">
						<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
							<div
								className="fixed inset-0 transition-opacity"
								aria-hidden="true"
							>
								<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
							</div>
							<span
								className="hidden sm:inline-block sm:align-middle sm:h-screen"
								aria-hidden="true"
							>
								&#8203;
							</span>
							<div
								className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
								role="dialog"
								aria-modal="true"
								aria-labelledby="modal-headline"
							>
								<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
									<div className="sm:flex sm:items-start">
										<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
											<h3
												className="text-lg leading-6 font-medium text-gray-900"
												id="modal-headline"
											>
												Informations du Vendeur
											</h3>
											<div className="mt-2">
												<div className="grid grid-cols-2 gap-4">
													<div>
														<label className="block text-sm font-medium text-gray-700">
															Nom
														</label>
														<p className="mt-1 text-sm text-gray-900">
															{selectedVendeur?.Nom}
														</p>
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-700">
															Email
														</label>
														<p className="mt-1 text-sm text-gray-900">
															{selectedVendeur?.Email}
														</p>
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-700">
															Télèphone
														</label>
														<p className="mt-1 text-sm text-gray-900">
															{selectedVendeur?.Telephone}
														</p>
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-700">
															Code
														</label>
														<p className="mt-1 text-sm text-gray-900">
															{selectedVendeur?.CodeVendeur}
														</p>
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-700">
															Pays
														</label>
														<p className="mt-1 text-sm text-gray-900">
															{selectedVendeur?.Pays}
														</p>
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-700">
															Ville
														</label>
														<p className="mt-1 text-sm text-gray-900">
															{selectedVendeur?.Ville}
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
									<button
										type="button"
										onClick={closeModal}
										className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#800000] text-base font-medium text-white hover:bg-[#800000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#800000] sm:ml-3 sm:w-auto sm:text-sm"
									>
										Fermer
									</button>
								</div>
							</div>
						</div>
					</div>
				)}

				<div class="flex flex-col items-center px-5 py-5 bg-gray-200 xs:flex-row xs:justify-between">
					<div class="flex items-center">
						<button
							type="button"
							onClick={() =>
								setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
							}
							class="w-full p-4 text-base text-gray-600 bg-burgendy border rounded-l-xl hover:bg-gray-100"
						>
							<svg
								width="9"
								fill="white"
								height="8"
								class=""
								viewBox="0 0 1792 1792"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
							</svg>
						</button>

						{numbers.map((n, i) => (
							<button
								key={i}
								type="button"
								class={`w-full px-4 py-2 text-base text-[#4c5ce9] bg-white border-t border-b hover:bg-gray-100 ${
									currentPage === n && "bg-gray-100"
								}`}
								onClick={() => setCurrentPage(n)}
							>
								{n}
							</button>
						))}

						<button
							type="button"
							onClick={() =>
								setCurrentPage(
									currentPage < numberOfPages ? currentPage + 1 : currentPage
								)
							}
							class="w-full p-4 text-base text-gray-600 bg-burgendy border-t border-b border-r rounded-r-xl hover:bg-gray-100"
						>
							<svg
								width="9"
								fill="white"
								height="8"
								class=""
								viewBox="0 0 1792 1792"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ShowAllVendeur;
