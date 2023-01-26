import React from "react";

import KanbanTask from "./Task";
import { BoardColumnPropsType } from "../libs/types/BoardColumn";

const KanbanColumn: React.FC<BoardColumnPropsType> = (props) => {
	const { column } = props;

	const iconsClasses =
		"h-6 stroke-inherit hover:stroke-width-[2px] transition-all duration-100 ease-in-out stroke-nav_icon_color";

	return (
		<section className="relative w-full flex-[1_1_max(300px_1fr)] max-w-[350px] flex flex-col gap-[0.5rem]">
			<div className="sticky top-[100px] bg-bg_2 pt-[2rem]">
				<header className="flex justify-between items-center">
					<h2 className="flex gap-[10px] items-center">
						<span
							style={{ background: column.color ? column.color : "#aaa" }}
							className={`w-[10px] h-[10px] rounded-full`}
						></span>
						{column.title}
					</h2>
					{column.tasks && column.wipLimit > 0 && (
						<span>
							{column.tasks && column.wipLimit > 0 && column.wipLimit
								? column.tasks.length
								: 0}
							/{column.wipLimit}
						</span>
					)}
				</header>
				<div className="flex justify-center items-center w-full py-[0.5rem] bg-white rounded-md shadow-sm border-[1px] border-border_color shadow-slate-200">
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
							d="M12 6v12m6-6H6"
						/>
					</svg>
				</div>
			</div>
			<div className="flex flex-col gap-[0.5rem]">
				{column.tasks
					? column.tasks.map((task) => (
							<KanbanTask
								key={task.id}
								task={task}
							/>
					  ))
					: null}
			</div>
		</section>
	);
};
export default KanbanColumn;
