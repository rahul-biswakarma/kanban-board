import React, { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import { UserContext } from "../libs/context";
import BoardColumn from "./BoardColumn";

import { BoardBodyPropsType } from "../libs/types/BoardBody";

const BoardBody: React.FC<BoardBodyPropsType> = (props) => {
	const { boards, setBoards, currentColumnNo } = useContext(UserContext);

	function getColumnIndex(columnId: string, board: any) {
		let columns = board.columns;
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
				let sourceColumnIndex = getColumnIndex(
					result.source.droppableId,
					boards[currentColumnNo]
				);
				let destinationColumnIndex = getColumnIndex(
					result.destination.droppableId,
					boards[currentColumnNo]
				);
				let sourceColumn = boards[currentColumnNo].columns[sourceColumnIndex];
				let destinationColumn =
					boards[currentColumnNo].columns[destinationColumnIndex];
				let sourceTasks = [...sourceColumn.tasks];
				let destinationTasks: any = [];
				if (destinationColumn.tasks)
					destinationTasks = [...destinationColumn.tasks];
				else destinationTasks = [];

				let [removed] = sourceTasks.splice(result.source.index, 1);
				destinationTasks.splice(result.destination.index, 0, removed);
				sourceColumn.tasks = sourceTasks;
				destinationColumn.tasks = destinationTasks;
				boards[currentColumnNo].columns[sourceColumnIndex] = sourceColumn;
				boards[currentColumnNo].columns[destinationColumnIndex] =
					destinationColumn;
				setBoards([...boards]);
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
