import React, { useState } from "react";

// Components
import Board from "./components/Board";
import SideNav from "./components/SideNav";

// Types
import {
	BoardType,
	BoardPropsType,
	BoardListsPropsType,
} from "./libs/types/Board";

const App: React.FC = () => {
	const [boardNo, setBoardNo] = useState<number>(0);
	const [toggleBoardForm, setToggleBoardForm] = useState<boolean>(false);

	let boards: BoardListsPropsType = [
		{
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
					title: "Todo",
					wipLimit: 5,
					color: "#f00",
					tasks: [
						{
							id: "1",
							title: "Task 1",
							description: "Task 1 Description",
							author: "https://i.pravatar.cc/150?img=1",
							editors: [
								"https://i.pravatar.cc/150?img=2",
								"https://i.pravatar.cc/150?img=3",
								"https://i.pravatar.cc/150?img=4",
							],
							currentColumn: 1,
							creationDate: new Date("2021-08-01"),
							dueDate: new Date("2021-08-01"),
							subTasks: [
								{ id: "1", title: "Subtask 1", completed: false },
								{ id: "2", title: "Subtask 2", completed: false },
							],
							color: "#ffe43d",
							labels: [
								{ name: "Label 1", color: "#dc9cf0" },
								{ name: "Label 1", color: "#a6f09c" },
								{ name: "Label 1", color: "#f0e19c" },
							],
						},
						{
							id: "1",
							title: "Task 1",
							description: "Task 1 Description",
							author: "https://i.pravatar.cc/150?img=1",
							editors: [
								"https://i.pravatar.cc/150?img=2",
								"https://i.pravatar.cc/150?img=3",
								"https://i.pravatar.cc/150?img=4",
							],
							currentColumn: 1,
							creationDate: new Date("2021-08-01"),
							dueDate: new Date("2021-08-01"),
							subTasks: [
								{ id: "1", title: "Subtask 1", completed: false },
								{ id: "1", title: "Subtask 2", completed: false },
							],
							color: "#ffe43d",
							labels: [{ name: "Label 1", color: "#f00" }],
						},
						{
							id: "1",
							title: "Task 1",
							description: "Task 1 Description",
							author: "https://i.pravatar.cc/150?img=1",
							editors: [
								"https://i.pravatar.cc/150?img=2",
								"https://i.pravatar.cc/150?img=3",
								"https://i.pravatar.cc/150?img=4",
							],
							currentColumn: 1,
							creationDate: new Date("2021-08-01"),
							dueDate: new Date("2021-08-01"),
							subTasks: [
								{ id: "1", title: "Subtask 1", completed: false },
								{ id: "1", title: "Subtask 2", completed: false },
							],
							color: "#ffe43d",
							labels: [{ name: "Label 1", color: "#f00" }],
						},
						{
							id: "1",
							title: "Task 1",
							description: "Task 1 Description",
							author: "https://i.pravatar.cc/150?img=1",
							editors: [
								"https://i.pravatar.cc/150?img=2",
								"https://i.pravatar.cc/150?img=3",
								"https://i.pravatar.cc/150?img=4",
								"https://i.pravatar.cc/150?img=4",
							],
							currentColumn: 1,
							creationDate: new Date("2021-08-01"),
							dueDate: new Date("2021-08-01"),
							subTasks: [
								{ id: "1", title: "Subtask 1", completed: false },
								{ id: "1", title: "Subtask 2", completed: false },
							],
							color: "#ffe43d",
							labels: [{ name: "Label 1", color: "#f00" }],
						},
					],
				},
				{
					id: "2",
					title: "In Progress",
					wipLimit: 0,
					color: "#0f0",
					tasks: [
						{
							id: "1",
							title: "Task 1",
							description: null,
							author: "https://i.pravatar.cc/150?img=1",
							editors: null,
							currentColumn: 2,
							creationDate: new Date(),
							dueDate: new Date(),
							subTasks: null,
							color: "#000000",
							labels: null,
						},
					],
				},
			],
		},
	];
	return (
		<div className="w-full min-h-[100vh] h-full flex">
			<SideNav
				boards={boards}
				toggleBoardForm={toggleBoardForm}
				setBoardNo={setBoardNo}
				setToggleBoardForm={setToggleBoardForm}
			/>
			<Board board={boards[boardNo]} />
		</div>
	);
};

export default App;
