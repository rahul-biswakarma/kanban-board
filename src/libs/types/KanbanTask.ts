import { LabelType } from "./Label";
import { TodoTaskType } from "./TodoTask";

// KanbanTask Type
export type KanbanTaskType = {
	id: string;
	title: string;
	description: string;
	members: string[];
	labels: LabelType[];
	currentColumn: number;
	creationDate: Date;
	dueDate: Date;
	subTasks: TodoTaskType[];
	author: string;
	editors: string[];
	color: string;
};

// KanbanTask Props Type
export type KanbanTaskPropsType = {
	task: KanbanTaskType;
};
