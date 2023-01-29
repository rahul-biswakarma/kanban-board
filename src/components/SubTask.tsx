import React from "react";
import { TodoTaskPropsType } from "../libs/types/TodoTask";

const SubTask: React.FC<TodoTaskPropsType> = (props) => {
	const { todos } = props;
	return (
		<div>
			{todos &&
				todos.map((todo) => {
					return (
						<div
							key={`subtask-${todo.id}`}
							className="flex items-center gap-[0.5rem]"
						>
							{todo.checked ? (
								<input
									type="checkbox"
									checked
								/>
							) : (
								<input type="checkbox" />
							)}
							<p className="text-sm text-text_2">{todo.title}</p>
						</div>
					);
				})}
		</div>
	);
};

export default SubTask;
