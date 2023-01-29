import React from "react";
import { DragDropContext } from "react-beautiful-dnd";

import BoardColumn from "./BoardColumn";

import { BoardBodyPropsType } from "../libs/types/BoardBody";

const BoardBody: React.FC<BoardBodyPropsType> = (props) => {
	return (
		<DragDropContext onDragEnd={() => {}}>
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
