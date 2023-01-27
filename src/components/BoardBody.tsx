import React from "react";
import { DragDropContext } from "react-beautiful-dnd";

import BoardColumn from "./BoardColumn";

import { BoardBodyPropsType } from "../libs/types/BoardBody";

const BoardBody: React.FC<BoardBodyPropsType> = (props) => {
	return (
		<main className="relative bg-bg_2 w-full flex gap-[2rem] px-[2rem]">
			<DragDropContext onDragEnd={() => {}}>
				{props.columns.map((column) => (
					<BoardColumn
						key={column.id}
						column={column}
					/>
				))}
			</DragDropContext>
		</main>
	);
};

export default BoardBody;
