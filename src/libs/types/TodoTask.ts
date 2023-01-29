// TodoTask Type
export type TodoTaskType = {
	id: string;
	title: string;
	checked: boolean;
};

// TodoTask Props Type
export type TodoTaskPropsType = {
	todos: TodoTaskType[];
};
