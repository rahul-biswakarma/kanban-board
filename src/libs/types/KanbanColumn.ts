import { KanbanTaskType } from "./KanbanTask";

// KanbanColumn Type
export type KanbanColumnType = {
	id: string;
	title: string;
	wipLimit: number;
	tasks: KanbanTaskType[];
};

// KanbanColumn Props Type
export type KanbanColumnPropsType = {
	column: KanbanColumnType;
};
