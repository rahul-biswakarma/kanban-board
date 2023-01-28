import { createContext } from "react";

export const UserContext = createContext<{
	user: any;
	userKey: string | null;
	notifications: any;
	setUser: React.Dispatch<React.SetStateAction<any>>;
}>({ user: null, setUser: () => {}, userKey: "", notifications: [] });
