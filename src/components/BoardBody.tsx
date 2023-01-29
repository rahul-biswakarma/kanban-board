import React, { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import { database } from "../libs/firebase";

import { UserContext } from "../libs/context";
import BoardColumn from "./BoardColumn";

import { BoardBodyPropsType } from "../libs/types/BoardBody";

const BoardBody: React.FC<BoardBodyPropsType> = (props) => {
	const { boards, setBoards, boardNo, currentColumnNo } =
		useContext(UserContext);

	function getColumnIndex(columnId: string, board: any) {
		let columns = board.columns;
		console.log(columns, board);
		for (let i = 0; i < columns.length; i++) {
			if (columns[i].id === columnId) {
				return i;
			}
		}
		return -1;
	}

	return (
		<DragDropContext
			onDragEnd={(result) => {
				if (!result.destination) return;
				if (
					result.source.droppableId === result.destination.droppableId &&
					result.source.index === result.destination.index
				)
					return;
				if (boardNo !== null) {
					let sourceColumnIndex = getColumnIndex(
						result.source.droppableId,
						boards[boardNo]
					);
					let destinationColumnIndex = getColumnIndex(
						result.destination.droppableId,
						boards[boardNo]
					);

					let sourceColumn = boards[boardNo].columns[sourceColumnIndex];
					let destinationColumn =
						boards[boardNo].columns[destinationColumnIndex];
					let sourceTasks = [...sourceColumn.tasks];
					let destinationTasks: any = [];
					if (destinationColumn.tasks)
						destinationTasks = [...destinationColumn.tasks];
					else destinationTasks = [];

					let [removed] = sourceTasks.splice(result.source.index, 1);
					destinationTasks.splice(result.destination.index, 0, removed);
					sourceColumn.tasks = sourceTasks;
					destinationColumn.tasks = destinationTasks;
					boards[boardNo].columns[sourceColumnIndex] = sourceColumn;
					boards[boardNo].columns[destinationColumnIndex] = destinationColumn;
					setBoards([...boards]);
					// Update Database
					if (boards.length > 0 && boardNo !== null) {
						var boardRef = database
							.ref("boards")
							.orderByChild("id")
							.equalTo(boards[boardNo].id);

						boardRef.once("value").then((snapshot) => {
							if (snapshot.exists()) {
								const boardKey = Object.keys(snapshot.val())[0];
								console.log(boardKey);
								let currentBoard = database.ref(`boards/${boardKey}`);
								currentBoard.update(boards[boardNo]);
							}
						});
					}
				}
			}}
		>
			<main className="relative bg-bg_2 w-full flex gap-[2rem] px-[2rem]">
				{props.columns.map((column, index) => {
					return (
						<BoardColumn
							key={`column-${column.id}`}
							column={column}
							columnNo={index}
						/>
					);
				})}
			</main>
		</DragDropContext>
	);
};

export default BoardBody;
