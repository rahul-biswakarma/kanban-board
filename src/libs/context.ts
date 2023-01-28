import { createContext } from "react";

export const UserContext = createContext<{
	boards: any;
	boardNo: number | null;
	user: any;
	userKey: string | null;
	notifications: any;
	memberImages: any;
	currentColumnNo: number;
	setCurrentColumnNo: React.Dispatch<React.SetStateAction<number>>;
	setUser: React.Dispatch<React.SetStateAction<any>>;
}>({
	boards: null,
	boardNo: 0,
	user: null,
	setUser: () => {},
	userKey: "",
	notifications: [],
	currentColumnNo: 0,
	setCurrentColumnNo: () => {},
	memberImages: [],
});
