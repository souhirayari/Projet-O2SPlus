import React, { useEffect } from "react";
import {
	Stepper,
	Step,
	Button,
	Typography,
	Input,
	Select,
	Option,
	Popover,
	PopoverHandler,
	PopoverContent,
} from "@material-tailwind/react";
import { Package } from "lucide-react";
import Swal from "sweetalert2";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useState } from "react";
import { PlusIcon } from "lucide-react";

function AddMouvementStock() {
	const [activeStep, setActiveStep] = useState(0);
	const [isLastStep, setIsLastStep] = useState(false);
	const [isFirstStep, setIsFirstStep] = useState(false);
	const [rows, setRows] = useState([
		{ article: "", quantite: "", prix: "", depot: "", type: "" },
	]);
	const [enteteStockId, setEnteteStockId] = useState(null);

	const handlePrev = () => {
		window.location.href = "/listedesmouvements";
	};

	const dossierId = localStorage.getItem("connectedUserDossier");
	const [fournisseurs, setFournisseurs] = useState([]);
	const handleAddRow = () => {
		setRows([
			...rows,
			{ article: "", quantite: "", prix: "", depot: "", type: "" },
		]);
	};

	const handleRowChange = (index, key, value) => {
		const updatedRows = [...rows];
		updatedRows[index][key] = value;
		setRows(updatedRows);
	};

	useEffect(() => {
		const getFournisseurData = async () => {
			const { data } = await axios.get(
				`http://localhost:3001/api/fournisseur/getAllFournisseurByDossier/${dossierId}`
			);
			setFournisseurs(data);
			//console.log(fournisseurs);
		};
		getFournisseurData();
	}, []);

	const [articles, setArticles] = useState([]);

	useEffect(() => {
		const getArticleData = async () => {
			const { data } = await axios.get(
				`http://localhost:3001/api/article/getAllAricleByDossier/${dossierId}`
			);
			setArticles(data);

			console.log(articles);
		};
		getArticleData();
	}, []);

	const [depots, setDepots] = useState([]);

	useEffect(() => {
		const getDepotData = async () => {
			const { data } = await axios.get(
				`http://localhost:3001/api/depot/getAllDepotByDossier/${dossierId}`
			);
			setDepots(data);
		};
		getDepotData();
	}, []);

	const [date, setDate] = React.useState(new Date());
	const formatedDate = format(new Date(), "yyyy-MM-dd");

	const [enteteStock, setEnteteStock] = useState({
		Type: "",
		CodeEntete: "",
		Date: formatedDate,
		depotId: "",
		fournisseurId: "",
	});

	const handleAddLigneStocks = async (e) => {
		e.preventDefault();
		let errorDetected = false;
		try {
			const totalQuantities = {};

			for (let row of rows) {
				if (!row.depot) {
					row.depot = enteteStock.depotId;
				}

				if (!row.type) {
					row.type = enteteStock.Type;
				}

				const { data: currentQuantity } = await axios.get(
					`http://localhost:3001/api/ligneStock/getQuantityByArticleAndDepot/${row.article}/${row.depot}`
				);
				console.log("QTE from DB :" + currentQuantity);

				const key = `${row.article}-${row.depot}`;
				if (!totalQuantities[key]) {
					totalQuantities[key] = currentQuantity;
				}
				if (row.type === "Sortie") {
					console.log("QTE from row Sortie :" + parseFloat(row.quantite));
					totalQuantities[key] =
						totalQuantities[key] - parseFloat(row.quantite);
				} else if (row.type === "Entree") {
					console.log("QTE from row Entree :" + parseFloat(row.quantite));
					totalQuantities[key] += parseFloat(row.quantite);
				}
				console.log(totalQuantities);
			}

			for (let key in totalQuantities) {
				if (totalQuantities[key] < 0) {
					console.error(
						"Total quantity exceeds threshold for product:",
						key.split("-")[0],
						"in depot:",
						key.split("-")[1]
					);
					errorDetected = true;
					break;
				}
			}

			if (!errorDetected) {
				for (let row of rows) {
					const ligneStockData = {
						Quantite: row.quantite,
						PrixUnitaire: row.prix,
						Type: row.type,
						articleId: row.article,
						enteteStockId: enteteStockId,
						depotId: row.depot,
					};

					await axios.post(
						"http://localhost:3001/api/ligneStock/addLigneStock",
						ligneStockData
					);
				}
				window.location.href = "/ajouterunmouvement";
			}
		} catch (error) {
			console.error(error);
			if (
				error.response &&
				error.response.data === "There is no article in stock to remove"
			) {
				Swal.fire({
					icon: "error",
					title: "Erreur",
					text: `Il n'y a pas d'article en stock à supprimer 
			`,
				});
			} else {
				Swal.fire({
					icon: "error",
					title: "Erreur",
					text: `Une erreur s'est produite lors de l'ajout des lignes de stock`,
				});
			}
		}
	};

	const handleAddEnteteStock = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				"http://localhost:3001/api/enteteStock/addEnteteStock",
				enteteStock
			);
			//console.log(res.data);
			const { id } = res.data;
			setEnteteStockId(id);

			!isLastStep && setActiveStep((cur) => cur + 1);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="grid grid-cols-12 min-h-screen font-roboto  bg-gray-200 ">
			<div className=" fixed">
				<Sidebar></Sidebar>
			</div>
			<div className="  mt-16 col-start-4 col-span-8 w-full px-24 py-4">
				<Stepper
					activeStep={activeStep}
					isLastStep={(value) => setIsLastStep(value)}
					isFirstStep={(value) => setIsFirstStep(value)}
				>
					<Step onClick={() => setActiveStep(0)}>
						<DocumentMagnifyingGlassIcon className="h-5 w-5" />
						<div className="absolute -bottom-[4.5rem] w-max text-center">
							<Typography
								variant="h6"
								color={activeStep === 0 ? "blue-gray" : "gray"}
							>
								Etape 1
							</Typography>
							<Typography
								color={activeStep === 0 ? "blue-gray" : "gray"}
								className="font-normal"
							>
								Detail Du Mouvement
							</Typography>
						</div>
					</Step>
					<Step onClick={() => setActiveStep(1)}>
						<Package className="h-5 w-5" />
						<div className="absolute -bottom-[4.5rem] w-max text-center">
							<Typography
								variant="h6"
								color={activeStep === 1 ? "blue-gray" : "gray"}
							>
								Etape 2
							</Typography>
							<Typography
								color={activeStep === 1 ? "blue-gray" : "gray"}
								className="font-normal"
							>
								Ajouter Les Articles
							</Typography>
						</div>
					</Step>
				</Stepper>

				{activeStep === 0 && (
					<div className="mt-40">
						<form>
							<div className="grid grid-cols-2 gap-4 ">
								<div className="col-span-1">
									<Input
										label="Code Du Mouvement"
										onChange={(e) =>
											setEnteteStock({
												...enteteStock,
												CodeEntete: e.target.value,
											})
										}
									/>
								</div>
								<div className="col-span-1">
									<Select
										label="Type Du Mouvemenent"
										onChange={(value) =>
											setEnteteStock({ ...enteteStock, Type: value })
										}
									>
										<Option value="Entree">Entree</Option>
										<Option value="Sortie">Sortie</Option>
									</Select>
								</div>
								<div className="col-span-1 mt-10">
									<Select
										label="Fournisseur"
										onChange={(value) =>
											setEnteteStock({ ...enteteStock, fournisseurId: value })
										}
									>
										{fournisseurs.map((fournisseur) => (
											<Option value={fournisseur.id}>{fournisseur.Nom}</Option>
										))}
									</Select>
								</div>
								<div className="col-span-1 mt-10">
									<Select
										label="Depot"
										onChange={(value) =>
											setEnteteStock({ ...enteteStock, depotId: value })
										}
									>
										{depots.map((depot) => (
											<Option value={depot.id}>{depot.Libelle}</Option>
										))}
									</Select>
								</div>

								{/* <div className="grid grid-cols-8 mt-10 ">
									
								</div> */}
							</div>
							<div className=" grid grid-cols-12">
								<div className="col-start-5 col-span-4 mt-10">
									<div>
										<Popover placement="bottom">
											<PopoverHandler>
												<Input
													label="Select a Date"
													value={date ? format(date, "PPP") : ""}
												/>
											</PopoverHandler>
											<PopoverContent>
												<DayPicker
													mode="single"
													selected={date}
													size="md"
													onSelect={(selectedDate) => {
														setDate(selectedDate);
														setEnteteStock({
															...enteteStock,
															Date: format(selectedDate, "yyyy-MM-dd"),
														});
													}}
													showOutsideDays
													className="border-0"
													classNames={{
														caption:
															"flex justify-center py-2 mb-4 relative items-center",
														caption_label: "text-sm font-medium text-gray-900",
														nav: "flex items-center",
														nav_button:
															"h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
														nav_button_previous: "absolute left-1.5",
														nav_button_next: "absolute right-1.5",
														table: "w-full border-collapse",
														head_row: "flex font-medium text-gray-900",
														head_cell: "m-0.5 w-9 font-normal text-sm",
														row: "flex w-full mt-2",
														cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
														day: "h-9 w-9 p-0 font-normal",
														day_range_end: "day-range-end",
														day_selected:
															"rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
														day_today: "rounded-md bg-gray-200 text-gray-900",
														day_outside:
															"day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
														day_disabled: "text-gray-500 opacity-50",
														day_hidden: "invisible",
													}}
													components={{
														IconLeft: ({ ...props }) => (
															<ChevronLeftIcon
																{...props}
																className="h-4 w-4 stroke-2"
															/>
														),
														IconRight: ({ ...props }) => (
															<ChevronRightIcon
																{...props}
																className="h-4 w-4 stroke-2"
															/>
														),
													}}
												/>
											</PopoverContent>
										</Popover>
									</div>
								</div>
							</div>
						</form>
					</div>
				)}
				{activeStep === 1 && (
					<div className="mt-40">
						{rows.map((row, index) => (
							<div key={index} className="grid grid-cols-3 gap-4 mb-10">
								<Select
									label="Article"
									onChange={(value) => handleRowChange(index, "article", value)}
								>
									{articles.map((article) => (
										<Option value={article.id}>{article.Libelle}</Option>
									))}
								</Select>

								<Input
									label="Quantite"
									value={row.quantite}
									type="number"
									onChange={(e) =>
										handleRowChange(index, "quantite", e.target.value)
									}
								/>
								<Input
									label="Prix"
									value={row.prix}
									onChange={(e) =>
										handleRowChange(index, "prix", e.target.value)
									}
								/>

								<div className="ml-32 mt-10 ">
									<Select
										label="Depot"
										value={enteteStock.depotId}
										onChange={(value) => handleRowChange(index, "depot", value)}
									>
										{depots.map((depot) => (
											<Option value={depot.id}>{depot.Libelle}</Option>
										))}
									</Select>
								</div>

								<div className="ml-32 mt-10 ">
									<Select
										label="Type"
										value={enteteStock.Type}
										onChange={(value) => handleRowChange(index, "type", value)}
									>
										<Option value="Entree">Entree</Option>
										<Option value="Sortie">Sortie</Option>
									</Select>
								</div>
							</div>
						))}

						<div className="flex justify-end">
							<button
								className="bg-burgendy text-white p-2 rounded-lg"
								onClick={handleAddRow}
							>
								<PlusIcon size={24} />
							</button>
						</div>
					</div>
				)}

				<div className="mt-40   flex justify-between">
					<Button onClick={handlePrev} disabled={isFirstStep}>
						Prev
					</Button>
					{activeStep === 0 && (
						<Button onClick={handleAddEnteteStock}>Next</Button>
					)}

					{isLastStep && (
						<Button className="bg-burgendy" onClick={handleAddLigneStocks}>
							Ajouter Mouvement
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}

export default AddMouvementStock;
