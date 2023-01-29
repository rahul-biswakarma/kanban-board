// Kanban Task Component
import React from "react";
import { Draggable } from "react-beautiful-dnd";

import Label from "./Label";
import SubTask from "./SubTask";

import { TaskPropsType } from "../libs/types/Task";

const KanbanTask: React.FC<TaskPropsType> = (props) => {
	const { task, index } = props;
	return (
		<Draggable
			draggableId={task.id}
			index={index}
		>
			{(provided) => (
				<div
					id={task.id}
					className="flex flex-col bg-white p-[1rem] rounded-md shadow-sm border-[1px] border-border_color shadow-slate-200 overflow-hidden"
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<div className="flex flex-wrap gap-[0.5rem]">
						{task.labels &&
							task.labels.length > 0 &&
							task.labels.map((label) => {
								return (
									<Label
										key={label.id}
										label={label}
									/>
								);
							})}
					</div>
					<h2 className="font-bold pt-[1rem] text-text_1">{task.title}</h2>
					<p className="text-text_2">{task.description}</p>
					{/* SubTasks */}
					<div className="my-[0.5rem] mt-[1rem]">
						{task.checklist && task.checklist.length > 0 ? (
							<SubTask todos={task.checklist} />
						) : (
							<div></div>
						)}
					</div>
					<hr className="border-t-[2px] border-border_color my-[0.5rem]" />
					<div className="flex justify-between flex-wrap">
						<div className="w-max flex">
							{/* <img
								key={`author-${task.author}`}
								className="ml-[-1rem] w-[2.5rem] h-[2.5rem] rounded-full object-cover border-[5px] border-white"
								src={task.author}
								alt={`author-${task.author}`}
							/>
							{task.editors?.map((editor: string, index: number) => {
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
							})} */}
							Due Date
						</div>
						<div className="flex justify-end items-center gap-[10px]">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								className=" h-5 stroke-text_2 hover:stroke-rose-500"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
								/>
							</svg>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								className=" h-6 stroke-text_2 hover:stroke-black"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
								/>
							</svg>
						</div>
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default KanbanTask;
