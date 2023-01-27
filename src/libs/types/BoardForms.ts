import { BoardListsType } from "./Board";

export type BoardFormPropsType = {
	boards: BoardListsType;
	setBoards: (value: BoardListsType) => void;
	setToggleBoardForm: (value: boolean) => void;
};
