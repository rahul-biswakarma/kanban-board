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
	const [boardIds, setBoardIds] = useState<any>([]);
	const [boards, setBoards] = useState<BoardListsType>([]);
	const [userKey, setUserKey] = useState<string | null>("");
	const [memberImages, setMemberImages] = useState<any>([]);
	const [notifications, setNotifications] = useState<any>([]);
	const [userSignedIn, setUserSignedIn] = useState<boolean>(false);
	const [currentColumnNo, setCurrentColumnNo] = useState<number>(0);
	const [toggleTaskForm, setToggleTaskForm] = useState<boolean>(false);
	const [toggleBoardForm, setToggleBoardForm] = useState<boolean>(false);

	// useEffect(() => {
	// 	if (firebase.auth().currentUser) {
	// 		setUserSignedIn(true);
	// 	}
	// }, []);

	useEffect(() => {
		if (userKey !== "") {
			let currentUserRef = database.ref(`users/${userKey}`);
			currentUserRef.on("value", (snapshot) => {
				if (snapshot.exists()) {
					let userData = snapshot.val();
					setBoardIds(userData.boards);
					setNotifications(userData.notifications);
				}
			});
		}
	}, [userKey]);

	useEffect(() => {
		if (boardIds.length > 0) {
			const promises = boardIds.map((id: any) => {
				const ref = database.ref(`boards/${id}`);
				ref.on("value", (snapshot) => {
					if (snapshot.exists()) {
						const { id } = snapshot.val();
						setBoards((prevBoards) => {
							const updatedBoard = snapshot.val();
							const index = prevBoards.findIndex((board) => board.id === id);
							return [
								...prevBoards.slice(0, index),
								updatedBoard,
								...prevBoards.slice(index + 1),
							];
						});
					}
				});
				return () => ref.off("value");
			});
			return () => {
				promises.forEach((promise: any) => promise());
			};
		}
	}, [boardIds]);

	return (
		<>
			<UserContext.Provider
				value={{
					boards,
					setBoards,
					boardNo,
					user,
					setUser,
					userKey,
					notifications,
					memberImages,
					currentColumnNo,
					toggleTaskForm,
					setToggleTaskForm,
					setCurrentColumnNo,
				}}
			>
				{userSignedIn ? (
					<div className="w-full min-h-[100vh] h-full flex bg-bg_2">
						<SideNav
							user={user}
							boards={boards}
							toggleBoardForm={toggleBoardForm}
							setBoardNo={setBoardNo}
							setToggleBoardForm={setToggleBoardForm}
						/>
						{boards.length > 0 ? (
							<Board board={boards[boardNo]} />
						) : (
							<div className="flex justify-center items-center w-full h-[90vh]">
								<div className="lds-ring">
									<div></div>
									<div></div>
									<div></div>
									<div></div>
								</div>
							</div>
						)}
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
