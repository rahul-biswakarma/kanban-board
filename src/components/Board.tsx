import React from "react";

import BoardBody from "./BoardBody";
import BoardHeader from "./BoardHeader";
import { BoardPropsType } from "../libs/types/Board";

const Board: React.FC<BoardPropsType> = (props) => {
	const { board } = props;
	return (
		<div className="relative w-full">
			<BoardHeader
				title={board.title}
				description={board.description}
				starred={board.starred}
				members={board.members}
			/>
			<BoardBody columns={board.columns} />
		</div>
	);
};

export default Board;