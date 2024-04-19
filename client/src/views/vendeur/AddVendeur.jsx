import React from "react";
import { Country, State, City } from "country-state-city";
import { useState, useEffect } from "react";
import Selector from "../../components/Selector";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function AddVendeur() {
	const navigate = useNavigate();

	let countryData = Country.getAllCountries();
	//console.log(countryData);

	const [stateData, setStateData] = useState();
	const [cityData, setCityData] = useState();
	const [codeVendeur, setCodeVendeur] = useState();
	const dossierId = localStorage.getItem("connectedUserDossier");
	//	console.log(dossierId);

	useEffect(() => {
		axios
			.get(
				`http://localhost:3001/api/vendeur/numberOfVendeursByDossier/${dossierId}`
			)
			.then((response) => {
				const count = response.data.count;
				setCodeVendeur(`Vendeur${count + 1}`);
				console.log("Vendeur count:", count);
			})
			.catch((error) => {
				console.error("Error fetching vendeur count:", error);
			});
	}, []);

	const [vendeur, setVendeur] = useState({
		Nom: "",
		CodeVendeur: "",
		Email: "",
		Telephone: "",
		Pays: "",
		Ville: "",
		CodePostal: "",
		dossierId: dossierId,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVendeur({ ...vendeur, [name]: value });
	};
	const handleCountryChange = (selectedCountry) => {
		setCountry(selectedCountry);
		setVendeur({ ...vendeur, Pays: selectedCountry.name });
	};

	const handleStateChange = (selectedState) => {
		setState(selectedState);
		setVendeur({ ...vendeur, Ville: selectedState.name });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				"http://localhost:3001/api/vendeur/addVendeur",
				vendeur
			);
			Swal.fire({
				title:
					"<span style='color: #4c5ce9  '>Vendeur ajouté avec succès</span>",
				icon: "success",
				timer: 10000,
				confirmButtonColor: "#800000",
				iconColor: "#800000",
			});
			navigate("/listedesvendeurs");
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		setVendeur((prevVendeur) => ({
			...prevVendeur,
			CodeVendeur: codeVendeur,
		}));
	}, [codeVendeur]);

	const [country, setCountry] = useState(countryData[0]);
	const [state, setState] = useState();
	const [city, setCity] = useState();

	useEffect(() => {
		setStateData(State.getStatesOfCountry(country?.isoCode));
	}, [country]);

	useEffect(() => {
		setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
	}, [state]);

	useEffect(() => {
		stateData && setState(stateData[0]);
	}, [stateData]);

	//const { dossier, setDossier } = useContext(StepperContext);

	return (
		<div className="md:w-1/2   mx-auto shadow-xl rounded-2xl bg-[#FFFFFF] ring-2 ring-[#808080] font-roboto ">
			<div className="text-[#800000] container horizontal text-2xl mt-24 grid place-content-center pt-5">
				Ajouter Un Vendeur
			</div>
			<form className="p-5">
				<div className="grid grid-cols-12 gap-5 p-5">
					<div className="col-span-6">
						<label className="flex items-center mb-2">
							<span className="block text-sm font-medium text-[#000000] text-[18px] mr-2">
								Nom
							</span>
						</label>
						<input
							type="text"
							id="name-with-label"
							className="rounded-lg border-2 border-black flex-1 appearance-none w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent"
							name="Nom"
							placeholder="Insérer le nom du vendeur..."
							onChange={(e) => setVendeur({ ...vendeur, Nom: e.target.value })}
						/>
					</div>
					<div className="col-span-6">
						<label className="flex items-center mb-2">
							<span className="block text-sm font-medium text-[#000000] text-[18px] mr-2">
								Code
							</span>
						</label>
						<input
							type="text"
							id="name-with-label"
							className="rounded-lg border-2 border-black flex-1 appearance-none w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent"
							name="CodeVendeur"
							value={codeVendeur}
							placeholder="Insérer le code du vendeur..."
							onChange={(e) => setCodeVendeur(e.target.value)}
						/>
					</div>
					<div className="col-span-6">
						<label className="flex items-center mb-2">
							<span className="block text-sm font-medium text-[#000000] text-[18px] mr-2">
								Email
							</span>
							<span className="text-[#800000] text-">*</span>
						</label>
						<div className="relative">
							<input
								type="email"
								id="example4"
								className="rounded-lg border-2 border-black flex-1 appearance-none w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent pl-10"
								placeholder="example@gmail.com"
								onChange={(e) =>
									setVendeur({ ...vendeur, Email: e.target.value })
								}
							/>
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2.5">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="#800000"
									class="w-5 h-5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
									/>
								</svg>
							</div>
						</div>
					</div>

					<div className="col-span-6">
						<label className="flex items-center mb-2">
							Numéro de Téléphone
						</label>

						<div className="relative">
							<input
								type="tel"
								id="example4"
								className="rounded-lg border-2 border-black flex-1 appearance-none w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent pl-10"
								placeholder="(+216) 99 999 999"
								onChange={(e) =>
									setVendeur({ ...vendeur, Telephone: e.target.value })
								}
							/>
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2.5">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="#800000"
									class="w-5 h-5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
									/>
								</svg>
							</div>
						</div>
					</div>

					<div className="col-span-4">
						<label className="flex items-center mb-2">
							<span className="block text-sm font-medium text-[#000000] text-[18px] mr-2">
								Pays
							</span>
						</label>
						<Selector
							data={countryData}
							selected={country}
							setSelected={handleCountryChange}
							name="Pays"
							onChange={handleChange}
						/>
					</div>

					{state && (
						<div className="col-span-4">
							<label className="flex items-center mb-2">
								<span className="block text-sm font-medium text-[#000000] text-[18px] mr-2">
									Ville
								</span>
							</label>
							<Selector
								data={stateData}
								selected={state}
								setSelected={handleStateChange}
								name="Ville"
								onChange={handleChange}
							/>
						</div>
					)}

					<div className="col-span-4">
						<label className="flex items-center mb-2">
							<span className="block text-sm font-medium text-[#000000] text-[18px] mr-2">
								Code Postal
							</span>
						</label>
						<input
							type="text"
							id="name-with-label"
							className="rounded-lg border-2 border-black flex-1 appearance-none w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent"
							name="CodePostal"
							onChange={(e) =>
								setVendeur({ ...vendeur, CodePostal: e.target.value })
							}
						/>
					</div>

					<div className="col-start-5 col-span-4">
						<button
							type="submit"
							onClick={handleSubmit}
							className="w-full bg-[#800000] hover:bg-[#800000] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Ajouter
						</button>
					</div>

					<div className="col-start-5 col-span-4">
						<button
							type=""
							onClick={(e) => {
								e.preventDefault(); // prevent default form submission behavior
								window.location.href = "/listedesvendeurs";
							}}
							className="w-full bg-[#CCCCCC] hover:bg-[#800000] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Annuler
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddVendeur;
