import { BoardColumnType } from "./BoardColumn";

// Board Type
export interface BoardType {
	id: string;
	title: string;
	description: string;
	columns: BoardColumnType[];
	members: string[];
	starred: boolean;
}

// Board Props Type
export type BoardPropsType = {
	board: BoardType;
};

export type BoardListsType = BoardType[];
