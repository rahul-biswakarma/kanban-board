import React from "react";

import KanbanTask from "./Task";
import { BoardColumnPropsType } from "../libs/types/BoardColumn";

const KanbanColumn: React.FC<BoardColumnPropsType> = (props) => {
	const { column } = props;
	return (
		<section>
			<header>
				<h2>{column.title}</h2>
				<span>
					{column.tasks ? column.tasks.length : 0}/{column.wipLimit}o7
				</span>
			</header>
			<div>
				{column.tasks
					? column.tasks.map((task) => <KanbanTask task={task} />)
					: null}
			</div>
		</section>
	);
};
export default KanbanColumn;
