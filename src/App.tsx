import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";

// Context
import { UserContext } from "./libs/context";

import { database } from "./libs/firebase";

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
	const [userKey, setUserKey] = useState<string | null>("");
	const [userSignedIn, setUserSignedIn] = useState<boolean>(false);
	const [toggleBoardForm, setToggleBoardForm] = useState<boolean>(false);

	useEffect(() => {
		if (firebase.auth().currentUser) {
			setUserSignedIn(true);
		}
	}, []);

	useEffect(() => {
		if (userKey !== "") {
			let currentUserRef = database.ref(`users/${userKey}`);
			console.log("currentUserRef: ", userKey);

			let boardsId: any = [];
			currentUserRef
				.once("value")
				.then(function (snapshot) {
					if (snapshot.exists()) {
						let userData = snapshot.val();
						boardsId = userData.boards;
					}
				})
				.then(() => {
					let boards: any = [];
					if (boardsId) {
						const promises = boardsId.map((boardId: string) =>
							database.ref(`boards/${boardId}`).once("value")
						);

						Promise.all(promises).then((snapshots) => {
							snapshots.forEach((snapshot) => {
								if (snapshot.exists()) {
									let board = snapshot.val();
									boards.push(board);
								}
							});
							setBoards(boards);
						});
					}
				});
		}
	}, [userKey]);

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
						userKey={userKey}
						setUserKey={setUserKey}
						setUser={setUser}
						setBoards={setBoards}
						setUserSignedIn={setUserSignedIn}
					/>
				)}
			</UserContext.Provider>
		</>
	);
};

export default App;
