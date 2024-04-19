import React from "react";
import { useContext } from "react";
import { StepperContext } from "../../StepperContext";

function Contact() {
	const { dossier, setDossier } = useContext(StepperContext);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setDossier({ ...dossier, [name]: value }); // Use the destructured variables here
		console.log(dossier);
	};
	return (
		<div className="flex flex-col">
			<div className="w-full mx-2 flex-1 ">
				<div className=" font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase   ">
					Email
				</div>
				<div className="bg-white my-2 p-1 flex border border-gray-200  ">
					<input
						type="text"
						name="Email"
						value={dossier.Email}
						onChange={handleChange}
						className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
					/>
				</div>
			</div>
			<div className="w-full mx-2 flex-1 ">
				<div className=" font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase   ">
					Telephone
				</div>
				<div className="bg-white my-2 p-1 flex border border-gray-200  ">
					<input
						type="text"
						name="Telephone"
						value={dossier.Telephone}
						onChange={handleChange}
						className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
					/>
				</div>
			</div>
			<div className="w-full mx-2 flex-1 ">
				<div className=" font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase   ">
					Mobile
				</div>
				<div className="bg-white my-2 p-1 flex border border-gray-200  ">
					<input
						type="text"
						name="Mobile"
						value={dossier.Mobile}
						onChange={handleChange}
						className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
					/>
				</div>
			</div>
		</div>
	);
}

export default Contact;
