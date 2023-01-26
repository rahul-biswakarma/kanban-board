// TodoTask Type
export type TodoTaskType = {
	id: string;
	title: string;
	completed: boolean;
};

// TodoTask Props Type
export type TodoTaskPropsType = {
	todos: TodoTaskType[];
};
