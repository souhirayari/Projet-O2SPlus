import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Selector from "../../components/Selector";
import { Country, State, City } from "country-state-city";
import Stepper from "../../components/Stepper";
import Axios from "axios";
import "../../App.css";
import StepperControl from "../../components/StepperControl";
import Info from "../../views/steps/Info";
import Adresse from "../../views/steps/Adresse";
import Contact from "../../views/steps/Contact";
import { StepperContext } from "../../StepperContext";
import ConfirmAddDossier from "../../views/steps/ConfirmAddDossier";
function AddDossier() {
	const [dossier, setDossier] = useState({
		RaisonSociale: "",
		MatriculeFiscale: "",
		Pays: "",
		CodePostal: "",
		Ville: "",
		Email: "",
		Telephone: "",
		Mobile: "",
	});

	const [finalDossier, setFinalDossier] = useState({});
	const handleChange = (e) => {
		setDossier({ ...dossier, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await Axios.post(
				"http://localhost:3001/api/dossier/getAllDossier",
				dossier
			);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};
	const [currentStep, setCurrentStep] = useState(1);

	const steps = ["Information Générales", "Adresse", "Contact", "Confirmation"];

	const displayStep = (step) => {
		switch (step) {
			case 1:
				return <Info />;
			case 2:
				return <Adresse />;
			case 3:
				return <Contact />;

			case 4:
				return <ConfirmAddDossier />;
			default:
		}
	};

	const handleClick = (direction) => {
		let newStep = currentStep;
		direction === "next" ? newStep++ : newStep--;
		newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
	};

	return (
		<div className=" md:w-1/2 mx-auto shadow-xl rounded-2xl bg-white  ">
			<div className=" container horizontal mt-24 ">
				<Stepper steps={steps} currentStep={currentStep} />
				<div className=" my-10 p-10  ">
					<StepperContext.Provider
						value={{
							dossier,
							setDossier,
							finalDossier,
							setFinalDossier,
						}}
					>
						{displayStep(currentStep)}
					</StepperContext.Provider>
				</div>
			</div>
			<div>
				<StepperControl
					handleClick={handleClick}
					currentStep={currentStep}
					steps={steps}
				/>
			</div>
		</div>
	);
}

export default AddDossier;

{
}
