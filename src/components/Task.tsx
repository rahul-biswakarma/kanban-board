// Kanban Task Component
import React from "react";

import Label from "./Label";
import SubTask from "./SubTask";

import { TaskPropsType } from "../libs/types/Task";

const KanbanTask: React.FC<TaskPropsType> = (props) => {
	const { task } = props;
	return (
		<div className="flex flex-col bg-white p-[1rem] rounded-md shadow-sm border-[1px] border-border_color shadow-slate-200">
			<div className="flex flex-wrap gap-[0.5rem]">
				{task.labels &&
					task.labels.map((label) => {
						return (
							<Label
								key={`label-${task.id}`}
								label={label}
							/>
						);
					})}
			</div>
			<h2 className="font-bold pt-[1rem] text-text_1">{task.title}</h2>
			<p className="text-text_2">{task.description}</p>
			{/* SubTasks */}
			<div className="my-[0.5rem] mt-[1rem]">
				{task.subTasks && task.subTasks.length > 0 ? (
					<SubTask todos={task.subTasks} />
				) : (
					<div className="flex text-text_2 text-sm items-center py-[0.5rem]">
						+ Subtasks
					</div>
				)}
			</div>
			<hr className="border-t-[2px] border-border_color my-[0.5rem]" />
			<div className="flex flex-wrap pl-[1rem]">
				<img
					key={`author-${task.author}`}
					className="ml-[-1rem] w-[2.5rem] h-[2.5rem] rounded-full object-cover border-[5px] border-white"
					src={task.author}
					alt={`author-${task.author}`}
				/>
				{task.editors &&
					task.editors.map((editor: string, index: number) => {
						if (index < 3) {
							return (
								<img
									key={`task-user-${index}`}
									className="ml-[-1rem] w-[2.5rem] h-[2.5rem] rounded-full object-cover border-[5px] border-white"
									src={editor}
									alt={`user-${index}`}
								/>
							);
						} else if (index === 3) {
							return (
								<div
									key={`task-user-${index}`}
									className="ml-[-1rem] flex items-center justify-center w-[2.5rem] h-[2.5rem] rounded-full bg-amber-300 text-white font-bold border-[5px] border-white"
								>
									+{task.editors && task.editors.length - 3}
								</div>
							);
						}
					})}
			</div>
		</div>
	);
};

export default KanbanTask;
