import React from "react";
import { useState } from "react";
import Logo from "../o2sLogo.png";
import axios from "axios";
import AdminSelect from "./AdminSelect";
import {
	Card,
	Input,
	Checkbox,
	Button,
	Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

function Signin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showError, setShowError] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleAuth = (e) => {
		const configuration = {
			method: "post",
			url: "http://localhost:3001/api/utilisateur/login",
			data: {
				Login: email,
				MotDePasse: password,
			},
		};
		e.preventDefault();
		axios(configuration)
			.then((response) => {
				const token = response.data.token;
				const connectedUserRole = response.data.Utilisateur.Role;
				const connectedUserDossier = response.data.Utilisateur.dossierId;
				const connectedUserEmail = response.data.Utilisateur.Email;
				const connectedUserLogin = response.data.Utilisateur.Login;
				localStorage.setItem("connectedUserLogin", connectedUserLogin);
				localStorage.setItem("connectedUserEmail", connectedUserEmail);
				localStorage.setItem("connectedUserDossier", connectedUserDossier);
				localStorage.setItem("token", token);
				localStorage.setItem("connectedUserRole", connectedUserRole);
				//console.log(response.data.Utilisateur.Role);
				//console.log(connectedUserDossier);

				// if (
				// 	connectedUserRole === "AdminDossier" ||
				// 	connectedUserRole === "Utilisateur"
				// ) {
				// 	const connectedUserDossier = response.data.Utilisateur.dossierId;
				// 	localStorage.setItem("connectedUserDossier", connectedUserDossier);
				// }

				if (connectedUserRole === "AdminSite") {
					window.location.href = "/adminSelect";
				} else if (connectedUserRole === "AdminDossier") {
					window.location.href = "/listedesvendeurs";
				} else if (connectedUserRole === "Utilisateur") {
					window.location.href = "/userinterface";
				}

				//console.log(response.data.token);

				//localStorage.setItem("token", response.data.token);
			})
			.catch((error) => {
				console.log(error);
				setShowError(true);

				setTimeout(() => {
					setShowError(false);
				}, 2000);
			});
	};

	return (
		// <section className="bg-white     min-h-screen flex items-center justify-center">
		// 	<div className="bg-gray-200 flex rounded-2xl shadow-lg   w-[700px] p-5 items-center">
		// 		<div className="md:w-1/2 px-8 md:px-16">
		// 			<h2 className="font-bold text-2xl text-[#a7c80f] text-center ">
		// 				Bienvenue a O2sManager !{" "}
		// 			</h2>
		// 			<p className="text-xs mt-4 text-[#002D74]">
		// 				Veuillez vous connecter pour accéder à votre compte
		// 			</p>
		// 			<form
		// 				onSubmit={(e) => handleAuth(e)}
		// 				action=""
		// 				className="flex flex-col gap-4"
		// 			>
		// 				<input
		// 					className="p-2 mt-8 rounded-xl border"
		// 					type="Email"
		// 					value={email}
		// 					name="email"
		// 					placeholder="Adresse Email"
		// 					onChange={(e) => setEmail(e.target.value)}
		// 				></input>
		// 				<div className="relative">
		// 					<input
		// 						className="p-2 rounded-xl border w-full"
		// 						type={showPassword ? "text" : "password"}
		// 						value={password}
		// 						name="password"
		// 						placeholder="Mot de passe"
		// 						onChange={(e) => setPassword(e.target.value)}
		// 					></input>
		// 					<svg
		// 						xmlns="http://www.w3.org/2000/svg"
		// 						width="16"
		// 						height="16"
		// 						fill="blue"
		// 						onClick={() => setShowPassword(!showPassword)}
		// 						className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 hover:cursor-pointer "
		// 						viewBox="0 0 16 16"
		// 					>
		// 						<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z " />
		// 						<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
		// 					</svg>
		// 				</div>
		// 				<button
		// 					type="submit"
		// 					onClick={(e) => handleAuth(e)}
		// 					className="bg-[#a7c80f]  rounded-xl text-white py-2 hover:scale-105 duration-300"
		// 				>
		// 					Login
		// 				</button>
		// 				{showError && (
		// 					<p
		// 						style={{ fontSize: 18 }}
		// 						className="text-xs text-red-500 text-center "
		// 					>
		// 						Email ou mot de passe incorrect
		// 					</p>
		// 				)}
		// 			</form>
		// 			<div className="mt-6 grid grid-cols-3 items-center text-gray-400"></div>
		// 		</div>
		// 		<div className="md:block hidden w-1/2">
		// 			<img className="rounded-2xl" src={Logo}></img>
		// 		</div>
		// 	</div>
		// </section>
		<section className="m-8 flex gap-4">
			<div className="w-full lg:w-3/5 mt-24">
				<div className="text-center">
					<Typography variant="h2" className="font-bold mb-4">
						Connexion
					</Typography>
					<Typography
						variant="paragraph"
						color="blue-gray"
						className="text-lg font-normal"
					>
						Veuillez vous connecter pour accéder à votre compte
					</Typography>
				</div>
				<form
					className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
					onSubmit={(e) => handleAuth(e)}
				>
					<div className="mb-1 flex flex-col gap-6">
						<Typography
							variant="small"
							color="blue-gray"
							className="-mb-3 font-medium"
						>
							Adresse Email
						</Typography>
						<Input
							size="lg"
							placeholder="name@mail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							name="email"
							className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
							labelProps={{
								className: "before:content-none after:content-none",
							}}
						/>
						<Typography
							variant="small"
							color="blue-gray"
							className="-mb-3 font-medium"
						>
							Mot de passe
						</Typography>
						<div className="relative">
							<Input
								type={showPassword ? "text" : "password"}
								size="lg"
								placeholder="********"
								value={password}
								name="password"
								onChange={(e) => setPassword(e.target.value)}
								className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
								labelProps={{
									className: "before:content-none after:content-none",
								}}
							/>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="black"
								onClick={() => setShowPassword(!showPassword)}
								className="  bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 hover:cursor-pointer "
								viewBox="0 0 16 16"
							>
								<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z " />
								<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
							</svg>
						</div>
					</div>
					<Checkbox
						label={
							<Typography
								variant="small"
								color="gray"
								className="flex items-center justify-start font-medium"
							>
								I agree the&nbsp;
								<a
									href="#"
									className="font-normal text-black transition-colors hover:text-gray-900 underline"
								>
									Terms and Conditions
								</a>
							</Typography>
						}
						containerProps={{ className: "-ml-2.5" }}
					/>
					<Button
						type="submit"
						onClick={(e) => handleAuth(e)}
						className="mt-6"
						fullWidth
					>
						Se Connecter
					</Button>
					{showError && (
						<Typography
							variant="small"
							color="red"
							className="text-center mt-4"
						>
							Veuillez vérifier vos Coordonnées
						</Typography>
					)}

					<div className="flex items-center justify-between gap-2 mt-6">
						{/* <Checkbox
							label={
								<Typography
									variant="small"
									color="gray"
									className="flex items-center justify-start font-medium"
								>
									Subscribe me to newsletter
								</Typography>
							}
							containerProps={{ className: "-ml-2.5" }}
						/> */}
						<Typography
							variant="small"
							className="font-medium text-gray-900 pl-80 hover:underline "
						>
							<a href="#">Mot De Passe Oublié? </a>
						</Typography>
					</div>
					{/* <div className="space-y-4 mt-8">
						<Button
							size="lg"
							color="white"
							className="flex items-center gap-2 justify-center shadow-md"
							fullWidth
						>
							<svg
								width="17"
								height="16"
								viewBox="0 0 17 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clipPath="url(#clip0_1156_824)">
									<path
										d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z"
										fill="#4285F4"
									/>
									<path
										d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z"
										fill="#34A853"
									/>
									<path
										d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z"
										fill="#FBBC04"
									/>
									<path
										d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z"
										fill="#EA4335"
									/>
								</g>
								<defs>
									<clipPath id="clip0_1156_824">
										<rect
											width="16"
											height="16"
											fill="white"
											transform="translate(0.5)"
										/>
									</clipPath>
								</defs>
							</svg>
							<span>Sign in With Google</span>
						</Button>
						<Button
							size="lg"
							color="white"
							className="flex items-center gap-2 justify-center shadow-md"
							fullWidth
						>
							<img src="/img/twitter-logo.svg" height={24} width={24} alt="" />
							<span>Sign in With Twitter</span>
						</Button>
					</div> */}
					{/* <Typography
						variant="paragraph"
						className="text-center text-blue-gray-500 font-medium mt-4"
					>
						Not registered?
						<Link to="/auth/sign-up" className="text-gray-900 ml-1">
							Create account
						</Link>
					</Typography> */}
				</form>
			</div>
			<div className="w-2/5 h-full hidden lg:block">
				<img
					src="/pattern.png"
					className="h-full w-full object-cover rounded-3xl"
				/>
			</div>
		</section>
	);
}

export default Signin;
