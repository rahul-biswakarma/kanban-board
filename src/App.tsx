import React from "react";

// Components
import Board from "./components/Board";
import SideNav from "./components/SideNav";

// Types
import { BoardType, BoardPropsType } from "./libs/types/Board";

const App: React.FC = () => {
	let board: BoardType = {
		id: "1",
		title: "Kanban Project",
		description:
			"Simple kanban with multi-user support, along with tagging system.",
		starred: true,
		members: [
			"https://i.pravatar.cc/150?img=1",
			"https://i.pravatar.cc/150?img=2",
			"https://i.pravatar.cc/150?img=3",
			"https://i.pravatar.cc/150?img=4",
			"https://i.pravatar.cc/150?img=5",
			"https://i.pravatar.cc/150?img=6",
			"https://i.pravatar.cc/150?img=7",
		],
		columns: [
			{
				id: "1",
				title: "Column 1",
				wipLimit: 5,
				tasks: [
					{
						id: "1",
						title: "Task 1",
						description: "Task 1 Description",
						author: "https://i.pravatar.cc/150?img=1",
						editors: null,
						currentColumn: 1,
						creationDate: new Date(),
						dueDate: new Date(),
						subTasks: null,
						color: "#000000",
						labels: null,
					},
				],
			},
		],
	};
	return (
		<div className="w-full h-[100vh] overflow-hidden flex">
			<SideNav />
			<Board board={board} />
		</div>
	);
};

export default App;
