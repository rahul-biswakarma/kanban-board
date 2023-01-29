import React, { useContext } from "react";

import { UserContext } from "../libs/context";

import TaskForm from "./TaskForm";
import BoardBody from "./BoardBody";
import BoardHeader from "./BoardHeader";

import { BoardPropsType } from "../libs/types/Board";

const Board: React.FC<BoardPropsType> = (props) => {
	const { board } = props;
	const { toggleTaskForm } = useContext(UserContext);
	return (
		<div className="relative w-full">
			<BoardHeader
				title={board.title}
				description={board.description}
				starred={board.starred}
				members={board.members}
			/>
			<BoardBody columns={board.columns} />
			<div className={`${toggleTaskForm ? "flex" : "hidden"}`}>
				<TaskForm />
			</div>
		</div>
	);
};

export default Board;
