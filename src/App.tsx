import React, { useState, useEffect, useContext } from "react";
import { auth } from "./libs/firebase";
import firebase from "firebase/compat/app";

import { UserContext } from "./libs/context";

// Components
import Board from "./components/Board";
import SideNav from "./components/SideNav";
import BoardForm from "./components/BoardForm";

// Types
import { BoardListsType } from "./libs/types/Board";
import Signup from "./components/Signup";

const App: React.FC = () => {
	const [user, setUser] = useState<any>(null);
	const [boardNo, setBoardNo] = useState<number>(0);
	const [boards, setBoards] = useState<BoardListsType>([]);
	const [userSignedIn, setUserSignedIn] = useState<boolean>(false);
	const [toggleBoardForm, setToggleBoardForm] = useState<boolean>(false);

	useEffect(() => {
		if (firebase.auth().currentUser) {
			setUserSignedIn(true);
		}
	}, []);

	return (
		<>
			<UserContext.Provider value={{ user, setUser }}>
				{userSignedIn ? (
					<div className="w-full min-h-[100vh] h-full flex bg-bg_2">
						<SideNav
							user={user}
							boards={boards}
							toggleBoardForm={toggleBoardForm}
							setBoardNo={setBoardNo}
							setToggleBoardForm={setToggleBoardForm}
						/>
						{boards.length > 0 && <Board board={boards[boardNo]} />}
						{toggleBoardForm && (
							<BoardForm
								boards={boards}
								setBoards={setBoards}
								setToggleBoardForm={setToggleBoardForm}
							/>
						)}
					</div>
				) : (
					<Signup
						setUser={setUser}
						setUserSignedIn={setUserSignedIn}
					/>
				)}
			</UserContext.Provider>
		</>
	);
};

export default App;
