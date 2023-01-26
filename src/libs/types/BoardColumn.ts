import { TaskType } from "./Task";

// BoardColumn Type
export type BoardColumnType = {
	id: string;
	title: string;
	wipLimit: number;
	color: string;
	tasks: TaskType[] | null;
};

// BoardColumn Props Type
export type BoardColumnPropsType = {
	column: BoardColumnType;
};
