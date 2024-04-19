import React, { createContext, useState, useContext } from "react";
import { useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";
import {
	Popover,
	PopoverHandler,
	PopoverContent,
	Button,
	Avatar,
	Typography,
} from "@material-tailwind/react";

import {
	Home,
	LayoutDashboard,
	StickyNote,
	Calendar,
	Layers,
	Flag,
	ChevronFirst,
	ChevronLast,
	MoreVertical,
	Gauge,
	User,
	Building2,
	HeartHandshake,
	Laptop,
	Truck,
	Warehouse,
	Package,
	PackageOpen,
	PencilRuler,
} from "lucide-react";
import { Settings } from "lucide-react";
import { LifeBuoy } from "lucide-react";
import profile from "../o2sLogo.png";
import { useNavigate } from "react-router-dom";
import user from "../user.png";

export const SidebarContext = createContext();

const email = localStorage.getItem("connectedUserEmail");
const login = localStorage.getItem("connectedUserLogin");
const role = localStorage.getItem("connectedUserRole");

const isAdminDossier = role === "AdminDossier";

function Sidebar() {
	const [expanded, setExpanded] = useState(true);
	const [expandedItem, setExpandedItem] = useState(null);
	const [openSubItems, setOpenSubItems] = useState(null);
	const [openPopover, setOpenPopover] = React.useState(false);

	const triggers = {
		onMouseEnter: () => setOpenPopover(true),
		onMouseLeave: () => setOpenPopover(false),
	};
	const sidebarItemsAdmin = [
		{
			icon: <Building2 size={30} />,
			text: "Mon Dosssier",
		},
		{
			icon: <User size={30} />,
			text: "Mes Employés",
		},

		{
			icon: <Warehouse size={30} />,
			text: "Mes Depots",
			subItems: [
				{
					text: "Ajouter Un Depot",
				},
				{
					text: "Liste Des Depots",
				},
			],
		},
		{
			icon: <Truck size={30} />,
			text: "Mes Fournisseurs",
			subItems: [
				{
					text: "Ajouter Un Fournisseur",
				},
				{
					text: "Liste Des Fournisseurs",
				},
			],
		},
		{
			icon: <User size={30} />,
			text: "Mes Vendeurs",
			subItems: [
				{
					text: "Ajouter Un Vendeur",
				},
				{
					text: "Liste Des Vendeurs",
				},
			],
		},
		{
			icon: <HeartHandshake size={30} />,
			text: "Mes Clients",
			subItems: [
				{
					text: "Ajouter Un Client",
				},
				{
					text: "Liste Des Clients",
				},
			],
		},
		{
			icon: <Package size={30} />,
			text: "Mes Articles",
			subItems: [
				{
					text: "Ajouter Un Article",
				},
				{
					text: "Liste Des Articles",
				},
			],
		},
		{
			icon: <Laptop size={30} />,
			text: "Mes Appareils",
			subItems: [
				{
					text: "Ajouter Un Appareil",
				},
				{
					text: "Liste Des Appareils",
				},
			],
		},
		{
			icon: <PackageOpen size={30} />,
			text: "Mouvement De Stock",
			subItems: [
				{
					text: "Ajouter Un Mouvement",
				},
				{
					text: "Liste Des Mouvements",
				},
			],
		},
		{
			icon: <PencilRuler size={30} />,
			text: "Mes Interventions",
			subItems: [
				{
					text: "Ajouter Une Intervention",
				},
				{
					text: "Liste Des Interventions",
				},
			],
		},
		{
			icon: <Settings size={30} />,
			text: "Paramètres Généraux",
		},
	];

	const sidebarItems = [
		{
			icon: <LayoutDashboard size={30} />,
			text: "Mon Dosssier",
		},
		{
			icon: <Flag size={20} />,
			text: "Reporting",

			subItems: [
				{
					text: "Add Report",
					onClick: () => console.log("Add Report clicked"),
				},
				{
					text: "Show Reports",
					onClick: () => console.log("Show Reports clicked"),
				},
			],
		},
	];

	const sidebarItemsToDisplay = isAdminDossier
		? sidebarItemsAdmin
		: sidebarItems;

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("connectedUserRole");
		window.location.href = "/";
	};

	const openMenu = () => {
		setOpenPopover(true);
	};

	return (
		<SidebarContext.Provider
			value={{ expanded, setExpandedItem, openSubItems, setOpenSubItems }}
		>
			<aside className="h-screen ">
				<nav className="h-full flex flex-col bg-sidebar-background border-r shadow-sm overflow-y-auto">
					<div className="p-4 pb-2 flex justify-between items-center">
						<img
							src={profile}
							className={`overflow-hidden transition-all ${
								expanded ? "w-16 rounded-xl" : "w-0 "
							}`}
						/>
						<button
							onClick={() => setExpanded((curr) => !curr)}
							className="p-1.5 rounded-lg bg-gray-50 hover:bg-black hover:text-white transition-colors"
						>
							{expanded ? (
								<ChevronFirst />
							) : (
								<ChevronLast className="w-5 h-5" />
							)}
						</button>
					</div>
					<div
						className={` grid grid-cols-3 place-items-center text-white font-roboto ${
							expanded ? " pl-1 mt-5 mb-5 text-[20px]" : " hidden "
						} `}
					>
						<Gauge color="white" className="col-span-1 ml-10 " />
						<h2 className="col-span-2 mr-14"> Tableau De Bord </h2>
					</div>

					<ul className="flex-1 px-3  ">
						{sidebarItemsToDisplay.map((item, index) => (
							<SidebarItem
								key={index}
								icon={item.icon}
								text={item.text}
								active={item.text === expandedItem}
								subItems={item.subItems}
							/>
						))}
					</ul>
					<div className="border-t flex p-3">
						<img src={user} className="w-10 h-10 rounded-md" />
						<div
							className={`flex justify-between items-center overflow-hidden transition-all ${
								expanded ? "w-52 ml-3" : "w-0"
							} `}
						>
							<div className="leading-4">
								<h4 className="font-semibold text-sidebar-text ">{login}</h4>
								<span className="text-xs text-gray-600">{email}</span>
							</div>
							{/* <MoreVertical
									color="white"
									size={20}
									className="cursor-pointer hover:text-white transition-colors"
									onClick={openMenu}
								/> */}
						</div>

						<Popover open={openPopover} handler={setOpenPopover}>
							<PopoverHandler {...triggers}>
								<div className="pt-2">
									<MoreVertical
										color="white"
										size={20}
										className="cursor-pointer hover:text-white transition-colors"
									/>
								</div>
							</PopoverHandler>
							<PopoverContent
								{...triggers}
								className="z-50 max-w-[24rem] w-[70px] p-2 bg-white rounded-md shadow-lg text-sm font-normal text-blue-gray-500"
							>
								<div className="mt-6 flex items-center gap-8 flex-col border-t border-blue-gray-50 pt-4">
									<div
										onClick={handleLogout}
										className="text-sm font-normal text-blue-gray-500 cursor-pointer hover:text-black"
									>
										<svg
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM2.332 6.027C2.70329 4.96372 3.36579 4.0261 4.244 3.321C4.512 3.73 4.974 4 5.5 4C5.89782 4 6.27936 4.15804 6.56066 4.43934C6.84196 4.72064 7 5.10218 7 5.5V6C7 6.53043 7.21071 7.03914 7.58579 7.41421C7.96086 7.78929 8.46957 8 9 8C9.53043 8 10.0391 7.78929 10.4142 7.41421C10.7893 7.03914 11 6.53043 11 6C10.9998 5.55242 11.1498 5.11773 11.4259 4.76547C11.702 4.41321 12.0883 4.16375 12.523 4.057C13.4773 5.14867 14.0022 6.55002 14 8C14 8.34 13.972 8.675 13.917 9H13C12.4696 9 11.9609 9.21071 11.5858 9.58579C11.2107 9.96086 11 10.4696 11 11V13.197C10.0883 13.7245 9.05331 14.0015 8 14V12C8 11.4696 7.78929 10.9609 7.41421 10.5858C7.03914 10.2107 6.53043 10 6 10C5.46957 10 4.96086 9.78929 4.58579 9.41421C4.21071 9.03914 4 8.53043 4 8C4.00018 7.527 3.83271 7.06924 3.52733 6.70803C3.22195 6.34681 2.79844 6.10552 2.332 6.027Z"
												fill="#90A4AE"
											/>
										</svg>
										Logout
									</div>
									<div className="text-sm font-normal text-blue-gray-500 cursor-pointer hover:text-black">
										<svg
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM2.332 6.027C2.70329 4.96372 3.36579 4.0261 4.244 3.321C4.512 3.73 4.974 4 5.5 4C5.89782 4 6.27936 4.15804 6.56066 4.43934C6.84196 4.72064 7 5.10218 7 5.5V6C7 6.53043 7.21071 7.03914 7.58579 7.41421C7.96086 7.78929 8.46957 8 9 8C9.53043 8 10.0391 7.78929 10.4142 7.41421C10.7893 7.03914 11 6.53043 11 6C10.9998 5.55242 11.1498 5.11773 11.4259 4.76547C11.702 4.41321 12.0883 4.16375 12.523 4.057C13.4773 5.14867 14.0022 6.55002 14 8C14 8.34 13.972 8.675 13.917 9H13C12.4696 9 11.9609 9.21071 11.5858 9.58579C11.2107 9.96086 11 10.4696 11 11V13.197C10.0883 13.7245 9.05331 14.0015 8 14V12C8 11.4696 7.78929 10.9609 7.41421 10.5858C7.03914 10.2107 6.53043 10 6 10C5.46957 10 4.96086 9.78929 4.58579 9.41421C4.21071 9.03914 4 8.53043 4 8C4.00018 7.527 3.83271 7.06924 3.52733 6.70803C3.22195 6.34681 2.79844 6.10552 2.332 6.027Z"
												fill="#90A4AE"
											/>
										</svg>
										Profile
									</div>
								</div>
							</PopoverContent>
						</Popover>
					</div>
				</nav>
			</aside>
		</SidebarContext.Provider>
	);
}

function SidebarItem({ icon, text, active, subItems }) {
	const navigate = useNavigate();
	const { expanded, setExpandedItem, openSubItems, setOpenSubItems } =
		useContext(SidebarContext);
	const [isOpen, setIsOpen] = useState(false);
	const [activeItem, setActiveItem] = useState(null);

	const handleClick = () => {
		if (subItems) {
			setOpenSubItems(text);
			setIsOpen((prev) => !prev);
			setExpandedItem(text);
		} else {
			const formattedText = text.replace(/\s+/g, ""); // Remove spaces from the text
			navigate("/" + formattedText.toLowerCase());
		}
	};

	const handleSubItemClick = (text) => {
		const formattedText = text.replace(/\s+/g, ""); // Remove spaces from the text
		navigate("/" + formattedText.toLowerCase());
	};

	useEffect(() => {
		if (!expanded || openSubItems !== text) {
			setIsOpen(false);
		}
	}, [expanded, openSubItems, text]);

	return (
		<li
			className={`relative flex flex-col my-1 font-medium rounded-md cursor-pointer group`}
		>
			<div
				className={`relative flex items-center py-2 px-3 transition-colors  hover:text-white text-gray-600 hover:rounded-md hover:bg-hover-sidebarItem   
						`}
				onClick={expanded ? handleClick : null}
			>
				{icon}
				<span
					className={`overflow-hidden transition-all ${
						expanded ? "w-52 ml-3" : "w-0"
					}`}
				>
					{text}
				</span>
				{subItems && expanded && (
					<BsChevronDown
						className={`ml-auto transition-transform transform   ${
							isOpen ? "rotate-180 duration-500 " : ""
						}`}
					/>
				)}
			</div>
			{isOpen && (
				<ul className="pl-6 bg-sub-menu ">
					{subItems.map((subItem, index) => (
						<li
							key={index}
							className="relative py-2 px-3 transition-colors hover:bg-hover-sidebarSubItem hover:text-white text-gray-600"
							onClick={() => handleSubItemClick(subItem.text)}
						>
							{subItem.text}
						</li>
					))}
				</ul>
			)}
		</li>
	);
}

export default Sidebar;
