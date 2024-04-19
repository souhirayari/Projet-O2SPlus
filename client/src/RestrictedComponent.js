import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "./useAuth";

const RestrictedComponent = ({ component: Component, allowedRoles }) => {
	const navigate = useNavigate();
	const [userRole, setUserRole] = useState("");

	const { isAuthenticated } = useAuth();

	useEffect(() => {
		const token = localStorage.getItem("token");
		const connectedUserRole = localStorage.getItem("connectedUserRole");
		setUserRole(connectedUserRole);
		console.log("Connected ya broooo", connectedUserRole);
	}, []);

	if (!isAuthenticated) {
		return (
			<div>
				You are not authenticated. Please login.
				<button onClick={() => navigate("/")}>Login</button>
			</div>
		);
	}

	if (allowedRoles.includes(userRole)) {
		return <Component />;
	} else {
		return (
			<div>
				You are not authorized to access this component.
				<button onClick={() => navigate("/")}>Login</button>
				<br></br>
				<button
					onClick={() => {
						localStorage.removeItem("token");
						localStorage.removeItem("connectedUserRole");
						navigate("/");
					}}
				>
					logout
				</button>
			</div>
		);
	}
};

export default RestrictedComponent;
