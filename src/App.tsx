import React, { useState } from "react";

// Components
import Board from "./components/Board";
import SideNav from "./components/SideNav";
import BoardForm from "./components/BoardForm";

// Types
import { BoardListsType } from "./libs/types/Board";

const App: React.FC = () => {
	const [boardNo, setBoardNo] = useState<number>(0);
	const [boards, setBoards] = useState<BoardListsType>([]);
	const [toggleBoardForm, setToggleBoardForm] = useState<boolean>(false);

	// let boards: BoardListsPropsType = [
	// 	{
	// 		id: "b1",
	// 		title: "Kanban Project",
	// 		description:
	// 			"Simple kanban with multi-user support, along with tagging system.",
	// 		starred: true,
	// 		members: [
	// 			"https://i.pravatar.cc/150?img=1",
	// 			"https://i.pravatar.cc/150?img=2",
	// 			"https://i.pravatar.cc/150?img=3",
	// 			"https://i.pravatar.cc/150?img=4",
	// 			"https://i.pravatar.cc/150?img=5",
	// 			"https://i.pravatar.cc/150?img=6",
	// 			"https://i.pravatar.cc/150?img=7",
	// 		],
	// 		columns: [
	// 			{
	// 				id: "c1",
	// 				title: "Todo",
	// 				wipLimit: 5,
	// 				color: "#f00",
	// 				tasks: [
	// 					{
	// 						id: "b1c1t1",
	// 						title: "Task 1",
	// 						description: "Task 1 Description",
	// 						author: "https://i.pravatar.cc/150?img=1",
	// 						editors: [
	// 							"https://i.pravatar.cc/150?img=2",
	// 							"https://i.pravatar.cc/150?img=3",
	// 							"https://i.pravatar.cc/150?img=4",
	// 						],
	// 						currentColumn: 1,
	// 						creationDate: new Date("2021-08-01"),
	// 						dueDate: new Date("2021-08-01"),
	// 						subTasks: [
	// 							{ id: "1", title: "Subtask 1", completed: false },
	// 							{ id: "2", title: "Subtask 2", completed: false },
	// 						],
	// 						color: "#ffe43d",
	// 						labels: [
	// 							{ name: "Label 1", color: "#dc9cf0" },
	// 							{ name: "Label 1", color: "#a6f09c" },
	// 							{ name: "Label 1", color: "#f0e19c" },
	// 						],
	// 					},
	// 					{
	// 						id: "b1c1t2",
	// 						title: "Task 1",
	// 						description: "Task 1 Description",
	// 						author: "https://i.pravatar.cc/150?img=1",
	// 						editors: [
	// 							"https://i.pravatar.cc/150?img=2",
	// 							"https://i.pravatar.cc/150?img=3",
	// 							"https://i.pravatar.cc/150?img=4",
	// 						],
	// 						currentColumn: 1,
	// 						creationDate: new Date("2021-08-01"),
	// 						dueDate: new Date("2021-08-01"),
	// 						subTasks: [
	// 							{ id: "1", title: "Subtask 1", completed: false },
	// 							{ id: "1", title: "Subtask 2", completed: false },
	// 						],
	// 						color: "#ffe43d",
	// 						labels: [{ name: "Label 1", color: "#f00" }],
	// 					},
	// 					{
	// 						id: "b1c1t3",
	// 						title: "Task 1",
	// 						description: "Task 1 Description",
	// 						author: "https://i.pravatar.cc/150?img=1",
	// 						editors: [
	// 							"https://i.pravatar.cc/150?img=2",
	// 							"https://i.pravatar.cc/150?img=3",
	// 							"https://i.pravatar.cc/150?img=4",
	// 						],
	// 						currentColumn: 1,
	// 						creationDate: new Date("2021-08-01"),
	// 						dueDate: new Date("2021-08-01"),
	// 						subTasks: [
	// 							{ id: "1", title: "Subtask 1", completed: false },
	// 							{ id: "1", title: "Subtask 2", completed: false },
	// 						],
	// 						color: "#ffe43d",
	// 						labels: [{ name: "Label 1", color: "#f00" }],
	// 					},
	// 					{
	// 						id: "b1c1t4",
	// 						title: "Task 1",
	// 						description: "Task 1 Description",
	// 						author: "https://i.pravatar.cc/150?img=1",
	// 						editors: [
	// 							"https://i.pravatar.cc/150?img=2",
	// 							"https://i.pravatar.cc/150?img=3",
	// 							"https://i.pravatar.cc/150?img=4",
	// 							"https://i.pravatar.cc/150?img=4",
	// 						],
	// 						currentColumn: 1,
	// 						creationDate: new Date("2021-08-01"),
	// 						dueDate: new Date("2021-08-01"),
	// 						subTasks: [
	// 							{ id: "1", title: "Subtask 1", completed: false },
	// 							{ id: "1", title: "Subtask 2", completed: false },
	// 						],
	// 						color: "#ffe43d",
	// 						labels: [{ name: "Label 1", color: "#f00" }],
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: "c2",
	// 				title: "In Progress",
	// 				wipLimit: 0,
	// 				color: "#0f0",
	// 				tasks: [
	// 					{
	// 						id: "b1c2t1",
	// 						title: "Task 1",
	// 						description: null,
	// 						author: "https://i.pravatar.cc/150?img=1",
	// 						editors: null,
	// 						currentColumn: 2,
	// 						creationDate: new Date(),
	// 						dueDate: new Date(),
	// 						subTasks: null,
	// 						color: "#000000",
	// 						labels: null,
	// 					},
	// 				],
	// 			},
	// 		],
	// 	},
	// 	{
	// 		id: "b2",
	// 		title: "Hello Project",
	// 		description:
	// 			"Simple kanban with multi-user support, along with tagging system.",
	// 		starred: true,
	// 		members: [
	// 			"https://i.pravatar.cc/150?img=1",
	// 			"https://i.pravatar.cc/150?img=2",
	// 			"https://i.pravatar.cc/150?img=3",
	// 			"https://i.pravatar.cc/150?img=4",
	// 			"https://i.pravatar.cc/150?img=5",
	// 			"https://i.pravatar.cc/150?img=6",
	// 			"https://i.pravatar.cc/150?img=7",
	// 		],
	// 		columns: [
	// 			{
	// 				id: "b2c1",
	// 				title: "Todo",
	// 				wipLimit: 5,
	// 				color: "#f00",
	// 				tasks: [
	// 					{
	// 						id: "b2c1t1",
	// 						title: "Task 1",
	// 						description: "Task 1 Description",
	// 						author: "https://i.pravatar.cc/150?img=1",
	// 						editors: ["https://i.pravatar.cc/150?img=2"],
	// 						currentColumn: 1,
	// 						creationDate: new Date("2021-08-01"),
	// 						dueDate: new Date("2021-08-01"),
	// 						subTasks: [{ id: "1", title: "Subtask 1", completed: false }],
	// 						color: "#ffe43d",
	// 						labels: [
	// 							{ name: "Label 1", color: "#dc9cf0" },
	// 							{ name: "Label 1", color: "#a6f09c" },
	// 							{ name: "Label 1", color: "#f0e19c" },
	// 						],
	// 					},
	// 					{
	// 						id: "b2c1t2",
	// 						title: "Task 2",
	// 						description: "Task 2 Description",
	// 						author: "https://i.pravatar.cc/150?img=1",
	// 						editors: [
	// 							"https://i.pravatar.cc/150?img=2",
	// 							"https://i.pravatar.cc/150?img=3",
	// 						],
	// 						currentColumn: 1,
	// 						creationDate: new Date("2021-08-01"),
	// 						dueDate: new Date("2021-08-01"),
	// 						subTasks: [
	// 							{ id: "b2c1t2s1", title: "Subtask 1", completed: false },
	// 							{ id: "b2c1t2s2", title: "Subtask 2", completed: false },
	// 						],
	// 						color: "#ffe43d",
	// 						labels: [{ name: "Label 1", color: "#f00" }],
	// 					},
	// 					{
	// 						id: "b2c1t3",
	// 						title: "Task 4",
	// 						description: "Task 4 Description",
	// 						author: "https://i.pravatar.cc/150?img=1",
	// 						editors: [
	// 							"https://i.pravatar.cc/150?img=2",
	// 							"https://i.pravatar.cc/150?img=3",
	// 							"https://i.pravatar.cc/150?img=4",
	// 						],
	// 						currentColumn: 1,
	// 						creationDate: new Date("2021-08-01"),
	// 						dueDate: new Date("2021-08-01"),
	// 						subTasks: [
	// 							{ id: "b2c1t3s1", title: "Subtask 1", completed: false },
	// 							{ id: "b2c1t3s2", title: "Subtask 2", completed: false },
	// 						],
	// 						color: "#ffe43d",
	// 						labels: [{ name: "Label 1", color: "#f00" }],
	// 					},
	// 					{
	// 						id: "b2c1t4",
	// 						title: "Task 1",
	// 						description: "Task 1 Description",
	// 						author: "https://i.pravatar.cc/150?img=1",
	// 						editors: [
	// 							"https://i.pravatar.cc/150?img=2",
	// 							"https://i.pravatar.cc/150?img=3",
	// 							"https://i.pravatar.cc/150?img=4",
	// 							"https://i.pravatar.cc/150?img=4",
	// 						],
	// 						currentColumn: 1,
	// 						creationDate: new Date("2021-08-01"),
	// 						dueDate: new Date("2021-08-01"),
	// 						subTasks: [
	// 							{ id: "b2c1t4s1", title: "Subtask 1", completed: false },
	// 						],
	// 						color: "#ffe43d",
	// 						labels: [{ name: "Label 1", color: "#f00" }],
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: "2",
	// 				title: "In Progress",
	// 				wipLimit: 0,
	// 				color: "#0f0",
	// 				tasks: [
	// 					{
	// 						id: "1",
	// 						title: "Task 1",
	// 						description: null,
	// 						author: "https://i.pravatar.cc/150?img=1",
	// 						editors: null,
	// 						currentColumn: 2,
	// 						creationDate: new Date(),
	// 						dueDate: new Date(),
	// 						subTasks: null,
	// 						color: "#000000",
	// 						labels: null,
	// 					},
	// 				],
	// 			},
	// 		],
	// 	},
	// ];
	return (
		<div className="w-full min-h-[100vh] h-full flex bg-bg_2">
			<SideNav
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
	);
};

export default App;
