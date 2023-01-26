/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				nav_icon_color: "#404040",
				border_color: "#f1f5fa",
				bg_2: "#f4f6f8",
				text_1: "#00101b",
				text_2: "#8c8e92",
			},
		},
	},
	plugins: [],
};
