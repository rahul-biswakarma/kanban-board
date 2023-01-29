import React, { useState, useContext } from "react";

import Notification from "./Notification";

import { UserContext } from "../libs/context";
import { BoardHeaderPropsType } from "../libs/types/BoardHeader";

const BoardHeader: React.FC<BoardHeaderPropsType> = (props) => {
	const { title, description, members, starred } = props;

	const { userKey, memberImages } = useContext(UserContext);

	const [isHeaderHidden, setisHeaderHidden] = useState(true);
	const [isNotificationHidden, setIsNotificationHidden] = useState(true);

	const sectionClasses =
		"flex justify-between gap-[1rem] transition-all duration-100 ease-in-out";
	const buttonsClasses =
		"p-[1rem_3rem] text-center border-b-[3px] border-transparent hover:border-blue-500 cursor-pointer transition-all duration-100 ease-in-out";
	const iconsClasses =
		"h-6 stroke-inherit hover:stroke-width-[2px] transition-all duration-100 ease-in-out stroke-nav_icon_color transition-all duration-100 ease-in-out";

	return (
		<header className="w-full sticky top-0 left-[0px] flex flex-col gap-[1rem] border-b-[2px] border-border_color bg-white z-50">
			<section
				style={{ paddingBottom: !isHeaderHidden ? "0px" : "2rem" }}
				className={`${sectionClasses} p-[2rem_3rem]`}
			>
				<div className="flex flex-col gap-[1rem] w-full">
					<h1 className="text-4xl font-bold">{title}</h1>
					{!isHeaderHidden && <p className="text-text_2">{description}</p>}
				</div>
				<div className="flex flex-col items-end gap-[2rem] w-max">
					<div className="flex gap-[1.5rem]">
						{/* <svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							className={`${iconsClasses} ${
								starred ? "fill-amber-300 stroke-amber-300" : "fill-transparent"
							}`}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
							/>
						</svg> */}
						{/* Notification Icon */}
						<div className="relative">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								className={`${iconsClasses} relative`}
								onClick={() => setIsNotificationHidden(!isNotificationHidden)}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
								/>
							</svg>
							{Notification.length > 0 && (
								<div className="w-2 h-2 bg-rose-400 absolute bottom-[-1px] left-[-3px] rounded-full"></div>
							)}
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							className={iconsClasses}
							onClick={() => setisHeaderHidden(!isHeaderHidden)}
							style={{
								transform: isHeaderHidden ? "rotate(0deg)" : "rotate(180deg)",
							}}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4.5 15.75l7.5-7.5 7.5 7.5"
							/>
						</svg>

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
								d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
							/>
						</svg>
					</div>
				</div>
			</section>
			{!isHeaderHidden && (
				<section className={`${sectionClasses} items-end pr-[3rem]`}>
					<div className="flex gap-[1rem]">
						<div className={`${buttonsClasses} border-blue-500`}>Board</div>
						<div className={buttonsClasses}>Members</div>
					</div>
					<div className="flex justify-end py-[1rem] min-w-[2.5rem]">
						{memberImages.map((member: any, index: number) => {
							if (index < 5) {
								return (
									<img
										key={`header-user-${index}`}
										className="ml-[-1rem] w-[2.5rem] h-[2.5rem] rounded-full object-cover border-[5px] border-white"
										src={member.photoURL}
										alt={`${member.email}-${index}`}
									/>
								);
							} else if (index === 5) {
								return (
									<div
										key={`header-user-${index}`}
										className="ml-[-1rem] flex items-center justify-center w-[2.5rem] h-[2.5rem] rounded-full bg-amber-300 text-white font-bold border-[5px] border-white"
									>
										+{members.length - 5}
									</div>
								);
							}
						})}
					</div>
				</section>
			)}
			{userKey != "" && (
				<Notification
					isNotificationHidden={isNotificationHidden}
					setIsNotificationHidden={setIsNotificationHidden}
				/>
			)}
		</header>
	);
};

export default BoardHeader;
