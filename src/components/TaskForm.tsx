import { v4 as uuidv4 } from "uuid";
import React, { useContext, useState, useRef, useEffect } from "react";

import { database } from "../libs/firebase";

import { UserContext } from "../libs/context";
import { AddTaskToBoard } from "../libs/AddTaskToBoard";

const TaskForm = () => {
	const {
		boards,
		setBoards,
		boardNo,
		currentColumnNo,
		setToggleTaskForm,
		taskEditing,
		taskEditValues,
		setTaskEditing,
	} = useContext(UserContext);

	// State
	const [checkList, setCheckList] = useState<any>([]);
	const [formActiveSection, setFormActiveSection] = useState(0);

	// Form Sections
	const formSections = ["Members", "Description", "Label", "Checklist"];

	// Refs
	const FORM_SECTION_0_REF = useRef<HTMLDivElement>(null);
	const FORM_SECTION_1_REF = useRef<HTMLTextAreaElement>(null);
	const FORM_SECTION_2_REF = useRef<HTMLDivElement>(null);
	const FORM_SECTION_3_REF = useRef<HTMLDivElement>(null);
	const CHECKLIST_INPUT_REF = useRef<HTMLInputElement>(null);
	const TITLE_INPUT_REF = useRef<HTMLInputElement>(null);
	const CURRENT_COLUMN_REF = useRef<HTMLSelectElement>(null);
	const LABEL_INPUT_REF = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (taskEditing) {
			TITLE_INPUT_REF.current &&
				(TITLE_INPUT_REF.current.value = taskEditValues.title);
			FORM_SECTION_1_REF.current &&
				(FORM_SECTION_1_REF.current.value = taskEditValues.description);
			LABEL_INPUT_REF.current &&
				(LABEL_INPUT_REF.current.value = taskEditValues.labels);
			setCheckList(taskEditValues.checklist);
		}
	});

	useEffect(() => {
		FORM_SECTION_0_REF.current &&
			FORM_SECTION_0_REF.current.classList.add("hidden");
		FORM_SECTION_1_REF.current &&
			FORM_SECTION_1_REF.current.classList.add("hidden");
		FORM_SECTION_2_REF.current &&
			FORM_SECTION_2_REF.current.classList.add("hidden");
		FORM_SECTION_3_REF.current &&
			FORM_SECTION_3_REF.current.classList.add("hidden");

		switch (formActiveSection) {
			case 0:
				FORM_SECTION_0_REF.current &&
					FORM_SECTION_0_REF.current.classList.remove("hidden");
				break;
			case 1:
				FORM_SECTION_1_REF.current &&
					FORM_SECTION_1_REF.current.classList.remove("hidden");
				break;
			case 2:
				FORM_SECTION_2_REF.current &&
					FORM_SECTION_2_REF.current.classList.remove("hidden");
				break;
			case 3:
				FORM_SECTION_3_REF.current &&
					FORM_SECTION_3_REF.current.classList.remove("hidden");
				break;
			default:
				break;
		}
	}, [formActiveSection]);

	// Handlers
	const handleAddChecklist = () => {
		setCheckList([
			...checkList,
			{
				id: uuidv4(),
				title: CHECKLIST_INPUT_REF.current && CHECKLIST_INPUT_REF.current.value,
				checked: false,
			},
		]);
		if (CHECKLIST_INPUT_REF.current) CHECKLIST_INPUT_REF.current.value = "";
	};

	const handleDeleteCheckList = (index: number) => {
		setCheckList((prev: any) => {
			return prev.filter((item: any, i: number) => i !== index);
		});
	};

	const getCheckedValues = (container: any) => {
		let checkedValues: any = [];
		let inputs = container.querySelectorAll("input[type='checkbox']:checked");
		inputs.forEach((input: any) => {
			checkedValues.push(input.value);
		});
		return checkedValues;
	};

	const handleTaskSubmit = (e: any) => {
		e.preventDefault();
		if (taskEditing && boardNo !== null) {
			let tempBoards = [...boards];
			let tempBoard = tempBoards[boardNo];
			let tempColumn = tempBoard.columns[taskEditValues.columnIndex];
			let tempTasks = tempColumn.tasks;
			let lablesArray = LABEL_INPUT_REF.current
				? LABEL_INPUT_REF.current.value.trim().split(",")
				: [];
			let finalLabelsArray = [];
			lablesArray.map((label: any) => {
				finalLabelsArray.push({
					id: uuidv4(),
					title: label,
				});
			});
			tempTasks.map((task: any) => {
				if (task.id === taskEditValues.id) {
					return Object.assign(task, {
						title: TITLE_INPUT_REF.current ? TITLE_INPUT_REF.current.value : "",
						description: FORM_SECTION_1_REF.current
							? FORM_SECTION_1_REF.current.value
							: "",
						labels: lablesArray,
						checklist: checkList,
					});
				}
				return task;
			});

			tempColumn.tasks = tempTasks;
			tempBoard.columns[taskEditValues.columnIndex] = tempColumn;
			tempBoards[boardNo] = tempBoard;

			setBoards(tempBoards);
			setToggleTaskForm(false);

			if (boardNo !== null) {
				const boardRef = database.ref(`boards`);
				let boardId = boards[boardNo].id;
				const specificBoardRef = boardRef.orderByChild("id").equalTo(boardId);
				specificBoardRef.once("value").then((snapshot) => {
					if (snapshot.exists()) {
						let key = Object.keys(snapshot.val())[0];
						boardRef.child(key).update(tempBoards[boardNo]);
					}
				});
			}
			return;
		}
		let tempLabelArray =
			LABEL_INPUT_REF.current &&
			LABEL_INPUT_REF.current.value.trim().split(" ");
		let finalLabelArray: any = [];
		if (LABEL_INPUT_REF.current && LABEL_INPUT_REF.current.value !== "")
			tempLabelArray?.map((label: string) => {
				let labelObj = {
					id: uuidv4(),
					title: label,
				};
				finalLabelArray.push(labelObj);
			});

		let task = {
			id: uuidv4(),
			title: TITLE_INPUT_REF.current ? TITLE_INPUT_REF.current.value : "",
			description: FORM_SECTION_1_REF.current
				? FORM_SECTION_1_REF.current.value
				: "",
			members: getCheckedValues(
				document.querySelector("#members-list-container")
			),
			labels: finalLabelArray,
			checklist: checkList,
			columnNo: CURRENT_COLUMN_REF.current
				? parseInt(CURRENT_COLUMN_REF.current.value)
				: "",
		};
		let updated = AddTaskToBoard(boards, boardNo, currentColumnNo, task);
		setBoards(updated?.newBoards);
		setToggleTaskForm(false);

		if (boardNo !== null) {
			const boardRef = database.ref(`boards`);
			let boardId = boards[boardNo].id;
			const specificBoardRef = boardRef.orderByChild("id").equalTo(boardId);
			specificBoardRef.once("value").then((snapshot) => {
				if (snapshot.exists()) {
					let key = Object.keys(snapshot.val())[0];
					boardRef.child(key).update(updated?.newBoard);
				}
			});
		}
	};

	function closeTaskForm() {
		TITLE_INPUT_REF.current && (TITLE_INPUT_REF.current.value = "");
		FORM_SECTION_1_REF.current && (FORM_SECTION_1_REF.current.value = "");
		LABEL_INPUT_REF.current && (LABEL_INPUT_REF.current.value = "");
		setCheckList([]);

		setTaskEditing(false);
		setToggleTaskForm(false);
	}

	return (
		<div className="fixed top-0 left-0 w-full h-full backdrop-blur-md bg-black/30 flex justify-center items-center z-50 ">
			<div className="relative w-full max-w-[50rem]  p-[2rem] min-h-[60vh] bg-white rounded-lg shadow-lg flex flex-col  items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					onClick={() => closeTaskForm()}
					className="w-6 h-6 absolute top-[1rem] left-[1rem] cursor-pointer stroke-black hover:stroke-rose-500 transition-all duration-150 hover:rotate-90"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
				<h1 className="mt-[-1rem] text-3xl font-[700] text-right w-full uppercase opacity-10">
					Add new Ticket
				</h1>
				<form
					onSubmit={(e) => handleTaskSubmit(e)}
					className="mt-[2rem] w-full flex gap-[1rem] flex-col"
				>
					<div className="flex flex-wrap justify-between items-center">
						<div className="flex gap-[1rem] items-center mt-[1rem]">
							<input
								ref={TITLE_INPUT_REF}
								type="text"
								name="title"
								id="titleInput"
								className="border-b-[2px] border-border_color p-[0.5rem]"
								placeholder="Title"
								required
							/>
						</div>
						{/* Select Column */}
						{/* <div className="flex gap-[1rem] items-center">
							<label
								htmlFor="currentColumn"
								className="font-bold"
							>
								Select Column
							</label>
							<select
								ref={CURRENT_COLUMN_REF}
								name="currentColumn"
								defaultValue={currentColumnNo}
								id="currentColumn"
								className="border-[2px] border-border_color rounded-md p-[0.5rem] "
							>
								{boardNo !== null &&
									boards[boardNo].columns.map((column: any, index: number) => {
										return (
											<option
												key={`${column.title}-${index}`}
												value={index}
											>
												{column.title}
											</option>
										);
									})}
							</select>
						</div> */}
					</div>

					<div className="flex justify-between gap-[0.5rem] border-[2px] border-border_color p-[0.5rem] mt-[1rem] rounded">
						{formSections.map((section, index) => {
							return (
								<span
									key={uuidv4()}
									onClick={() => setFormActiveSection(index)}
									className={`font-bold text-center text-text_2 hover:text-text_1 cursor-pointer w-full hover:bg-bg_2 py-[0.5rem] rounded ${
										formActiveSection === index ? "text-text_1 bg-bg_2" : ""
									}`}
								>
									{section}
								</span>
							);
						})}
					</div>
					<div className="flex gap-[1rem] items-center mt-[1rem]">
						<textarea
							ref={FORM_SECTION_1_REF}
							name="description"
							id="descriptionInput"
							rows={3}
							className="border-b-[2px] border-border_color p-[0.5rem] w-full h-max"
							placeholder="Description"
						/>
						<div
							ref={FORM_SECTION_0_REF}
							className="flex gap-[1rem] items-center"
						>
							<label className="font-bold">Select Members</label>
							<div
								id="members-list-container"
								className="flex flex-col gap-[0.5rem] max-h-[300px] border-[2px] border-border_color p-[1rem] overflow-y-auto"
							>
								{boardNo !== null &&
									boards[boardNo].members.map((member: any, index: number) => {
										return (
											<div
												key={uuidv4()}
												className="flex gap-[10px]"
											>
												<input
													type="checkbox"
													id={`task-form-member-${index}`}
													name={`task-form-member-${index}`}
													value={index}
												/>
												<label htmlFor={`task-form-member-${index}`}>
													{member}
												</label>
											</div>
										);
									})}
							</div>
						</div>
						<div
							className="flex items-center justify-center w-full"
							ref={FORM_SECTION_2_REF}
						>
							<div>
								<label className="font-bold w-full">Enter Labels</label>
								<input
									ref={LABEL_INPUT_REF}
									type="text"
									className="border-[2px] border-border_color p-[0.5rem] w-full"
									id="labelInput"
								/>
							</div>
						</div>
						<div ref={FORM_SECTION_3_REF}>
							<div className="w-full flex flex-col gap-[0.5rem]">
								<h2 className="font-semibold">Add CheckLists</h2>
								<div className="flex gap-[2rem] items-center">
									<input
										ref={CHECKLIST_INPUT_REF}
										className="border-[2px] border-border_color p-[0.5rem] w-full"
										type="text"
										placeholder="Task"
									/>
									<div
										onClick={() => handleAddChecklist()}
										className="mt-[0.5rem] p-[0.5rem] cursor-pointer border-[2px] border-border_2 rounded-sm"
									>
										Add
									</div>
								</div>
							</div>
							<div className="py-[1rem] flex flex-col gap-[0.5rem]">
								{checkList.map((list: any, index: number) => (
									<div
										key={`checklist-${index}`}
										className="flex min-w-[200px] gap-[1rem] justify-between w-full"
									>
										{list.title}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											onClick={() => handleDeleteCheckList(index)}
											className="w-6 h-6 cursor-pointer stroke-black hover:stroke-rose-500 transition-all duration-150"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
											/>
										</svg>
									</div>
								))}
							</div>
						</div>
					</div>
					<button
						type="submit"
						className="mt-[2rem] bg-blue-500 p-[0.5rem_2rem] rounded w-max"
					>
						Next
					</button>
				</form>
			</div>
		</div>
	);
};

export default TaskForm;
