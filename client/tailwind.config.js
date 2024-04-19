/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				roboto: ["Roboto", "sans-serif"],
			},

			colors: {
				"sidebar-background": "#191919",
				"sidebar-text": "#989898",
				"hover-sidebarSubItem": "#56c8fc",
				"hover-sidebarItem": "#4c5be8",
				"sub-menu": "#353535",
				"log-out": "#f96767",
				blackColor: "#000000",
				burgendy: "#800000",
			},
		},
	},
	plugins: [],
});
