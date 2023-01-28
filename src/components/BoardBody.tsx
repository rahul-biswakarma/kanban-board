import React from "react";
import { DragDropContext } from "react-beautiful-dnd";

import BoardColumn from "./BoardColumn";

import { BoardBodyPropsType } from "../libs/types/BoardBody";

const BoardBody: React.FC<BoardBodyPropsType> = (props) => {
	return (
		<DragDropContext onDragEnd={() => {}}>
			<main className="relative bg-bg_2 w-full flex gap-[2rem] px-[2rem]">
				{props.columns.map((column) => {
					return (
						<BoardColumn
							key={column.id}
							column={column}
						/>
					);
				})}
			</main>
		</DragDropContext>
	);
};

export default BoardBody;
