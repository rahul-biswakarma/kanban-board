import React from "react";

const Navbar: React.FC = () => {
	const buttonClasses =
		"w-full py-[10px] bg-transparent flex justify-center items-center transition-all duration-100 ease-in-out border-l-[2px] border-transparent stroke-nav_icon_color hover:border-blue-600 hover:stroke-blue-600";
	const iconsClasses =
		"w-6 h-6 stroke-inherit hover:stroke-width-[2px] transition-all duration-100 ease-in-out";

	return (
		<nav className="h-full w-[100px] py-[2rem] flex flex-col items-center gap-[3rem] border-r-[2px] border-border_color">
			<div className="flex justify-center align-center mb-[1rem">
				<img
					className="w-12 h-12 rounded-full"
					src="https://i.pravatar.cc/300"
					alt="user-avatar"
				/>
			</div>
			<div className="flex flex-col items-center justify-between w-full h-full">
				<div className="w-full flex justify-center item-center flex-col gap-[1.5rem]">
					<button
						className={buttonClasses}
						aria-label="boards icon"
					>
						<svg
							className={iconsClasses}
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
							/>
						</svg>
					</button>
					<button
						className={buttonClasses}
						aria-label="label icon"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className={iconsClasses}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 6h.008v.008H6V6z"
							/>
						</svg>
					</button>
				</div>
				<div className="w-full flex justify-center items-center">
					<button
						className={buttonClasses}
						aria-label="boards icon"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							className={iconsClasses}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
