import { BoardType } from "./Board";

export type BoardListPropsType = {
	boards: BoardType[];
	toggleBoardForm: boolean;
	setBoardNo: (boardNo: number) => void;
	setToggleBoardForm: (toggleBoard: boolean) => void;
};
