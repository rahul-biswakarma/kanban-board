import { BoardType } from "./Board";

export type BoardListPropsType = {
	boards: BoardType[];
	setBoardNo: (boardNo: number) => void;
};
