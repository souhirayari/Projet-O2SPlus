import React from "react";
import { useContext } from "react";
import { StepperContext } from "../../StepperContext";
import Selector from "../../components/Selector";
import { Country, State, City } from "country-state-city";
import { useState, useEffect } from "react";

function Adresse() {
	let countryData = Country.getAllCountries();
	const [stateData, setStateData] = useState();
	const [cityData, setCityData] = useState();

	const [country, setCountry] = useState(countryData[0]);
	const [state, setState] = useState();
	const [city, setCity] = useState();

	useEffect(() => {
		setStateData(State.getStatesOfCountry(country?.isoCode));
	}, [country]);
	console.log(country);
	useEffect(() => {
		setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
	}, [state]);

	useEffect(() => {
		stateData && setState(stateData[0]);
	}, [stateData]);
	const { dossier, setDossier } = useContext(StepperContext);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setDossier({ ...dossier, [e.target.name]: e.target.value });
		console.log(dossier);
	};

	return (
		<div className="flex">
			<div className="mr-4">
				<p>Country</p>
				<Selector
					data={countryData}
					selected={country}
					setSelected={setCountry}
					name="Pays"
					value={dossier.Pays}
					onChange={handleChange}
				/>
			</div>
			{state && (
				<div>
					<p className="text-teal-800 font-semibold">State :</p>
					<Selector
						data={stateData}
						selected={state}
						setSelected={setState}
						name="Ville"
						value={dossier.Ville}
						onChange={handleChange}
					/>
				</div>
			)}
			<div className="ml-4">
				<p className="text-teal-800 font-semibold">Code Postal </p>
				<input
					type="text"
					className="w-40 h-10 rounded-md border border-gray-300 px-2"
					name="CodePostal"
					value={dossier.CodePostal}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}

export default Adresse;
