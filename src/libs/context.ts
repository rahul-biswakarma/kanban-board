import { createContext } from "react";

export const UserContext = createContext<{
	boards: any;
	setBoards: React.Dispatch<React.SetStateAction<any>>;
	boardNo: number | null;
	user: any;
	userKey: string | null;
	notifications: any;
	memberImages: any;
	currentColumnNo: number;
	toggleTaskForm: boolean;
	taskEditValues: any;
	setTaskEditValues: React.Dispatch<React.SetStateAction<any>>;
	taskEditing: boolean;
	setTaskEditing: React.Dispatch<React.SetStateAction<boolean>>;
	setToggleTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
	setCurrentColumnNo: React.Dispatch<React.SetStateAction<number>>;
	setUser: React.Dispatch<React.SetStateAction<any>>;
}>({
	boards: null,
	setBoards: () => {},
	boardNo: 0,
	user: null,
	setUser: () => {},
	userKey: "",
	notifications: [],
	currentColumnNo: 0,
	setCurrentColumnNo: () => {},
	memberImages: [],
	taskEditValues: null,
	setTaskEditValues: () => {},
	taskEditing: false,
	setTaskEditing: () => {},
	toggleTaskForm: false,
	setToggleTaskForm: () => {},
});
