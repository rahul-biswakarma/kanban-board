import React, { useContext } from "react";

import { UserContext } from "../libs/context";

type NotificationPropsType = {
	isNotificationHidden: boolean;
	setIsNotificationHidden: React.Dispatch<React.SetStateAction<boolean>>;
};

const Notification: React.FC<NotificationPropsType> = (props) => {
	const { isNotificationHidden, setIsNotificationHidden } = props;
	const { notifications } = useContext(UserContext);

	return (
		<>
			{!isNotificationHidden ? (
				<div className="absolute top-[100px] right-10 flex flex-col p-[2rem] shadow-md shadow-slate-200 z-50 bg-white border-[2px] border-border_color">
					<h2 className="text-lg font-[600] text-text_1 w-full text-center pb-[1rem] ">
						Notification
					</h2>

					{notifications.length > 0 &&
						notifications.map((notification: any, index: number) => {
							return (
								<div
									className="p-[0.5rem_1rem] rounded"
									key={`notification-${index}`}
									onClick={() => {}}
								>
									<p
										className={`${
											!notification.seen ? "text-black" : "text-text_2"
										}`}
									>
										- {notification.message}
									</p>
								</div>
							);
						})}

					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						onClick={() => setIsNotificationHidden(!isNotificationHidden)}
						className="absolute top-[5px] right-[5px] w-6 h-6 stroke-black hover:stroke-red-500 transition-all duration-50 cursor-pointer hover:rotate-90"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default Notification;
