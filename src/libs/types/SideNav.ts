import { BoardType } from "./Board";

export interface SideNavProps {
	boards: BoardType[];
	setBoardNo: (boardNo: number) => void;
}
