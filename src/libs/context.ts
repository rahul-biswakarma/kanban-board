import { createContext } from "react";

export const UserContext = createContext<{
	user: any;
	setUser: React.Dispatch<React.SetStateAction<any>>;
}>({ user: null, setUser: () => {} });
