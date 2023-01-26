import React from "react";

import BoardColumn from "./BoardColumn";

import { BoardBodyPropsType } from "../libs/types/BoardBody";

const BoardBody: React.FC<BoardBodyPropsType> = (props) => {
	return (
		<main className="relative bg-bg_2 w-full h-full flex gap-[2rem] px-[2rem]">
			{props.columns.map((column) => (
				<BoardColumn
					key={column.id}
					column={column}
				/>
			))}
		</main>
	);
};

export default BoardBody;
