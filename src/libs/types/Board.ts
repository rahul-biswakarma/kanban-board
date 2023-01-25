import { BoardColumnType } from "./BoardColumn";

// Board Type
export type BoardType = {
	id: string;
	title: string;
	description: string;
	columns: BoardColumnType[];
	members: string[];
	starred: boolean;
};

// Board Props Type
export type BoardPropsType = {
	board: BoardType;
};
