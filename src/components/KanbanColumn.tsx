import React from "react";

import KanbanTask from "./KanbanTask";
import { KanbanColumnPropsType } from "../libs/types/KanbanColumn";

const KanbanColumn: React.FC<KanbanColumnPropsType> = (props) => {
	const { column } = props;
	return (
		<section>
			<header>
				<h2>{column.title}</h2>
				<span>
					{column.tasks.length}/{column.wipLimit}o7
				</span>
			</header>
			<div>
				{column.tasks.map((task) => (
					<KanbanTask task={task} />
				))}
			</div>
		</section>
	);
};
export default KanbanColumn;
