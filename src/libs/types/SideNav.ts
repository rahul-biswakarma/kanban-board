import { BoardType } from "./Board";

export interface SideNavProps {
	boards: BoardType[];
	toggleBoardForm: boolean;
	setBoardNo: (boardNo: number) => void;
	setToggleBoardForm: (toggleBoard: boolean) => void;
}
