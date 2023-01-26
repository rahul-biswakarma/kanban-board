import { LabelType } from "./Label";
import { TodoTaskType } from "./TodoTask";

// KanbanTask Type
export type TaskType = {
	id: string;
	title: string;
	description: string | null;
	labels: LabelType[] | null;
	currentColumn: number;
	creationDate: Date;
	dueDate: Date | null;
	subTasks: TodoTaskType[] | null;
	author: string;
	editors: string[] | null;
	color: string | null;
};

// KanbanTask Props Type
export type TaskPropsType = {
	task: TaskType;
};
