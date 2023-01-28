import { BoardListsType } from "./Board";

export type SignupPropsType = {
	userKey: string | null;
	setUserKey: (userKey: string | null) => void;
	setBoards: (value: BoardListsType) => void;
	setUserSignedIn: (userSignedIn: boolean) => void;
	setUser: (user: any) => void;
};
