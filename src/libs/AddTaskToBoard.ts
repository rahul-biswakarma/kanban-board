export function AddTaskToBoard(
	boards: any,
	boardNo: number | null,
	columnNo: number,
	task: any
) {
	if (boardNo !== null) {
		const newBoards = [...boards];
		const newBoard = newBoards[boardNo];
		let newTasks: any;

		if (newBoard.columns[columnNo].tasks)
			newTasks = [...newBoard.columns[columnNo].tasks, task];
		else newTasks = [task];

		newBoard.columns[columnNo].tasks = newTasks;
		newBoards[boardNo] = newBoard;
		return { newBoard, newBoards };
	}
}
