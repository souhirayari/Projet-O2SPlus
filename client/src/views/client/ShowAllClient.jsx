import React from "react";
import Sidebar from "../../components/Sidebar";
import user from "../../usergrey.png";

function ShowAllClient() {
	return (
		<div className="grid grid-cols-12 min-h-screen font-roboto  bg-gray-200 ">
			<div className=" fixed">
				<Sidebar></Sidebar>
			</div>

			<div className=" col-span-12  ">
				<div className="text-3xl text-center text-burgendy  mt-10 pl-52">
					Liste Des Clients
				</div>
			</div>
			<div className="col-start-4 col-span-1 gap-2 mt-5 mb-52 relative">
				<div class="p-4 bg-white shadow-lg rounded-2xl w-80 dark:bg-gray-800">
					<div class="flex flex-row items-start gap-4">
						<img src={user} class="rounded-lg w-20 h-20" />
						<div class="flex flex-col justify-between w-full h-28">
							<div>
								<p class="text-xl font-medium text-gray-800 dark:text-white">
									Client 1
								</p>
								<p class="text-xs text-gray-400">FullStack dev</p>
							</div>
							<div class="w-full p-2 bg-blue-100 rounded-lg dark:bg-white">
								<div class="flex items-center justify-between text-xs text-black">
									<p class="flex flex-col">
										Appareils
										<span class="font-bold text-black text-center dark:text-indigo-500">
											34
										</span>
									</p>
									<p class="flex flex-col">
										Interventions
										<span class="font-bold text-black text-center dark:text-indigo-500">
											455
										</span>
									</p>
									<p class="flex flex-col">
										Contract
										<span class="font-bold text-black text-center dark:text-indigo-500">
											9
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="flex items-center justify-between gap-4 mt-6">
						<button
							type="button"
							class="w-1/2 px-4 py-2 text-base bg-white border rounded-lg text-grey-500 hover:bg-gray-200 "
						>
							Supprimer
						</button>
						<button
							type="button"
							class="w-1/2 px-4 py-2 text-base text-white bg-indigo-500 border rounded-lg hover:bg-indigo-700 "
						>
							Consulter
						</button>
					</div>
				</div>
			</div>
			<div className="col-start-7 col-span-1 mt-5 gap-2 mb-52 relative">
				<div class="p-4 bg-white shadow-lg rounded-2xl w-80 dark:bg-gray-800">
					<div class="flex flex-row items-start gap-4">
						<img src={user} class="rounded-lg w-20 h-20" />
						<div class="flex flex-col justify-between w-full h-28">
							<div>
								<p class="text-xl font-medium text-gray-800 dark:text-white">
									Client 2
								</p>
								<p class="text-xs text-gray-400">FullStack dev</p>
							</div>
							<div class="w-full p-2 bg-blue-100 rounded-lg dark:bg-white">
								<div class="flex items-center justify-between text-xs text-black     dark:text-black">
									<p class="flex flex-col">
										Appareils
										<span class="font-bold text-black text-center dark:text-indigo-500">
											34
										</span>
									</p>
									<p class="flex flex-col">
										Interventions
										<span class="font-bold text-black text-center dark:text-indigo-500">
											455
										</span>
									</p>
									<p class="flex flex-col">
										Contract
										<span class="font-bold text-black text-center dark:text-indigo-500">
											9.3
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="flex items-center justify-between gap-4 mt-6">
						<button
							type="button"
							class="w-1/2 px-4 py-2 text-base bg-white border rounded-lg text-grey-500 hover:bg-gray-200 "
						>
							Supprimer
						</button>
						<button
							type="button"
							class="w-1/2 px-4 py-2 text-base text-white bg-indigo-500 border rounded-lg hover:bg-indigo-700 "
						>
							Consulter
						</button>
					</div>
				</div>
			</div>
			<div className="col-start-10 col-span-1 mt-5 mb-52 relative">
				<div class="p-4 bg-white shadow-lg rounded-2xl w-80 dark:bg-gray-800">
					<div class="flex flex-row items-start gap-4">
						<img src={user} class="rounded-lg w-20 h-20" />
						<div class="flex flex-col justify-between w-full h-28">
							<div>
								<p class="text-xl font-medium text-gray-800 dark:text-white">
									Client 3
								</p>
								<p class="text-xs text-gray-400">FullStack dev</p>
							</div>
							<div class="w-full p-2 bg-blue-100 rounded-lg dark:bg-white">
								<div class="flex items-center justify-between text-xs text-black">
									<p class="flex flex-col">
										Appareils
										<span class="font-bold text-black text-center dark:text-indigo-500">
											34
										</span>
									</p>
									<p class="flex flex-col">
										Interventions
										<span class="font-bold text-black text-center dark:text-indigo-500">
											455
										</span>
									</p>
									<p class="flex flex-col">
										Contract
										<span class="font-bold text-black text-center dark:text-indigo-500">
											9.3
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="flex items-center justify-between gap-4 mt-6">
						<button
							type="button"
							class="w-1/2 px-4 py-2 text-base bg-white border rounded-lg text-grey-500 hover:bg-gray-200 "
						>
							Supprimer
						</button>
						<button
							type="button"
							class="w-1/2 px-4 py-2 text-base text-white bg-indigo-500 border rounded-lg hover:bg-indigo-700 "
						>
							Consulter
						</button>
					</div>
				</div>
			</div>
			<div className="col-start-4 col-span-1 gap-2 mt-5 mb-52 relative">
				<div class="p-4 bg-white shadow-lg rounded-2xl w-80 dark:bg-gray-800">
					<div class="flex flex-row items-start gap-4">
						<img src={user} class="rounded-lg w-20 h-20" />
						<div class="flex flex-col justify-between w-full h-28">
							<div>
								<p class="text-xl font-medium text-gray-800 dark:text-white">
									Client 1
								</p>
								<p class="text-xs text-gray-400">FullStack dev</p>
							</div>
							<div class="w-full p-2 bg-blue-100 rounded-lg dark:bg-white">
								<div class="flex items-center justify-between text-xs text-black">
									<p class="flex flex-col">
										Appareils
										<span class="font-bold text-black text-center dark:text-indigo-500">
											34
										</span>
									</p>
									<p class="flex flex-col">
										Interventions
										<span class="font-bold text-black text-center dark:text-indigo-500">
											455
										</span>
									</p>
									<p class="flex flex-col">
										Contract
										<span class="font-bold text-black text-center dark:text-indigo-500">
											9
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="flex items-center justify-between gap-4 mt-6">
						<button
							type="button"
							class="w-1/2 px-4 py-2 text-base bg-white border rounded-lg text-grey-500 hover:bg-gray-200 "
						>
							Supprimer
						</button>
						<button
							type="button"
							class="w-1/2 px-4 py-2 text-base text-white bg-indigo-500 border rounded-lg hover:bg-indigo-700 "
						>
							Consulter
						</button>
					</div>
				</div>
			</div>
			<div className="col-start-7 col-span-1 mt-5 gap-2 mb-52 relative">
				<div class="p-4 bg-white shadow-lg rounded-2xl w-80 dark:bg-gray-800">
					<div class="flex flex-row items-start gap-4">
						<img src={user} class="rounded-lg w-20 h-20" />
						<div class="flex flex-col justify-between w-full h-28">
							<div>
								<p class="text-xl font-medium text-gray-800 dark:text-white">
									Client 2
								</p>
								<p class="text-xs text-gray-400">FullStack dev</p>
							</div>
							<div class="w-full p-2 bg-blue-100 rounded-lg dark:bg-white">
								<div class="flex items-center justify-between text-xs text-black     dark:text-black">
									<p class="flex flex-col">
										Appareils
										<span class="font-bold text-black text-center dark:text-indigo-500">
											34
										</span>
									</p>
									<p class="flex flex-col">
										Interventions
										<span class="font-bold text-black text-center dark:text-indigo-500">
											455
										</span>
									</p>
									<p class="flex flex-col">
										Contract
										<span class="font-bold text-black text-center dark:text-indigo-500">
											9.3
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="flex items-center justify-between gap-4 mt-6">
						<button
							type="button"
							class="w-1/2 px-4 py-2 text-base bg-white border rounded-lg text-grey-500 hover:bg-gray-200 "
						>
							Supprimer
						</button>
						<button
							type="button"
							class="w-1/2 px-4 py-2 text-base text-white bg-indigo-500 border rounded-lg hover:bg-indigo-700 "
						>
							Consulter
						</button>
					</div>
				</div>
			</div>
			<div className="col-start-10 col-span-1 mt-5 mb-52 relative">
				<div class="p-4 bg-white shadow-lg rounded-2xl w-80 dark:bg-gray-800">
					<div class="flex flex-row items-start gap-4">
						<img src={user} class="rounded-lg w-20 h-20" />
						<div class="flex flex-col justify-between w-full h-28">
							<div>
								<p class="text-xl font-medium text-gray-800 dark:text-white">
									Client 3
								</p>
								<p class="text-xs text-gray-400">FullStack dev</p>
							</div>
							<div class="w-full p-2 bg-blue-100 rounded-lg dark:bg-white">
								<div class="flex items-center justify-between text-xs text-black">
									<p class="flex flex-col">
										Appareils
										<span class="font-bold text-black text-center dark:text-indigo-500">
											34
										</span>
									</p>
									<p class="flex flex-col">
										Interventions
										<span class="font-bold text-black text-center dark:text-indigo-500">
											455
										</span>
									</p>
									<p class="flex flex-col">
										Contract
										<span class="font-bold text-black text-center dark:text-indigo-500">
											9.3
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="flex items-center justify-between gap-4 mt-6">
						<button
							type="button"
							class="w-1/2 px-4 py-2 text-base bg-white border rounded-lg text-grey-500 hover:bg-gray-200 "
						>
							Supprimer
						</button>
						<button
							type="button"
							class="w-1/2 px-4 py-2 text-base text-white bg-indigo-500 border rounded-lg hover:bg-indigo-700 "
						>
							Consulter
						</button>
					</div>
				</div>
			</div>
			<div className="col-start-4 col-span-1 gap-2 mt-5 mb-52 relative">
				<div class="p-4 bg-white shadow-lg rounded-2xl w-80 dark:bg-gray-800">
					<div class="flex flex-row items-start gap-4">
						<img src={user} class="rounded-lg w-20 h-20" />
						<div class="flex flex-col justify-between w-full h-28">
							<div>
								<p class="text-xl font-medium text-gray-800 dark:text-white">
									Client 1
								</p>
								<p class="text-xs text-gray-400">FullStack dev</p>
							</div>
							<div class="w-full p-2 bg-blue-100 rounded-lg dark:bg-white">
								<div class="flex items-center justify-between text-xs text-black">
									<p class="flex flex-col">
										Appareils
										<span class="font-bold text-black text-center dark:text-indigo-500">
											34
										</span>
									</p>
									<p class="flex flex-col">
										Interventions
										<span class="font-bold text-black text-center dark:text-indigo-500">
											455
										</span>
									</p>
									<p class="flex flex-col">
										Contract
										<span class="font-bold text-black text-center dark:text-indigo-500">
											9
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="flex items-center justify-between gap-4 mt-6">
						<button
							type="button"
							class="w-1/2 px-4 py-2 text-base bg-white border rounded-lg text-grey-500 hover:bg-gray-200 "
						>
							Supprimer
						</button>
						<button
							type="button"
							class="w-1/2 px-4 py-2 text-base text-white bg-indigo-500 border rounded-lg hover:bg-indigo-700 "
						>
							Consulter
						</button>
					</div>
				</div>
			</div>
			<div className="col-start-7 col-span-1 mt-5 gap-2 mb-52 relative">
				<div class="p-4 bg-white shadow-lg rounded-2xl w-80 dark:bg-gray-800">
					<div class="flex flex-row items-start gap-4">
						<img src={user} class="rounded-lg w-20 h-20" />
						<div class="flex flex-col justify-between w-full h-28">
							<div>
								<p class="text-xl font-medium text-gray-800 dark:text-white">
									Client 2
								</p>
								<p class="text-xs text-gray-400">FullStack dev</p>
							</div>
							<div class="w-full p-2 bg-blue-100 rounded-lg dark:bg-white">
								<div class="flex items-center justify-between text-xs text-black     dark:text-black">
									<p class="flex flex-col">
										Appareils
										<span class="font-bold text-black text-center dark:text-indigo-500">
											34
										</span>
									</p>
									<p class="flex flex-col">
										Interventions
										<span class="font-bold text-black text-center dark:text-indigo-500">
											455
										</span>
									</p>
									<p class="flex flex-col">
										Contract
										<span class="font-bold text-black text-center dark:text-indigo-500">
											9.3
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="flex items-center justify-between gap-4 mt-6">
						<button
							type="button"
							class="w-1/2 px-4 py-2 text-base bg-white border rounded-lg text-grey-500 hover:bg-gray-200 "
						>
							Supprimer
						</button>
						<button
							type="button"
							class="w-1/2 px-4 py-2 text-base text-white bg-indigo-500 border rounded-lg hover:bg-indigo-700 "
						>
							Consulter
						</button>
					</div>
				</div>
			</div>
			<div className="col-start-10 col-span-1 mt-5 mb-52 relative">
				<div class="p-4 bg-white shadow-lg rounded-2xl w-80 dark:bg-gray-800">
					<div class="flex flex-row items-start gap-4">
						<img src={user} class="rounded-lg w-20 h-20" />
						<div class="flex flex-col justify-between w-full h-28">
							<div>
								<p class="text-xl font-medium text-gray-800 dark:text-white">
									Client 3
								</p>
								<p class="text-xs text-gray-400">FullStack dev</p>
							</div>
							<div class="w-full p-2 bg-blue-100 rounded-lg dark:bg-white">
								<div class="flex items-center justify-between text-xs text-black">
									<p class="flex flex-col">
										Appareils
										<span class="font-bold text-black text-center dark:text-indigo-500">
											34
										</span>
									</p>
									<p class="flex flex-col">
										Interventions
										<span class="font-bold text-black text-center dark:text-indigo-500">
											455
										</span>
									</p>
									<p class="flex flex-col">
										Contract
										<span class="font-bold text-black text-center dark:text-indigo-500">
											9.3
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="flex items-center justify-between gap-4 mt-6">
						<button
							type="button"
							class="w-1/2 px-4 py-2 text-base bg-white border rounded-lg text-grey-500 hover:bg-gray-200 "
						>
							Supprimer
						</button>
						<button
							type="button"
							class="w-1/2 px-4 py-2 text-base text-white bg-indigo-500 border rounded-lg hover:bg-indigo-700 "
						>
							Consulter
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ShowAllClient;
