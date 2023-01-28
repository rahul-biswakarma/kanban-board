import React, { useRef, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { BoardType } from "../libs/types/Board";

import { database } from "../libs/firebase";
import { UserContext } from "../libs/context";

import { BoardColumnType } from "../libs/types/BoardColumn";
import { BoardFormPropsType } from "../libs/types/BoardForms";

const BoardForm: React.FC<BoardFormPropsType> = (props) => {
	const { boards, setBoards, setToggleBoardForm } = props;

	const { user, setUser } = useContext(UserContext);

	// States
	const [boardForm, setBoardForm] = useState<BoardType>({
		id: uuidv4(),
		title: "",
		description: "",
		starred: false,
		members: [],
		columns: [],
	});
	const [members, setMembers] = useState<string[]>([]);

	// Input Refs
	const boardNameInputRef = useRef<HTMLInputElement>(null);
	const boardDescInputRef = useRef<HTMLInputElement>(null);
	const boardNameLabelRef = useRef<HTMLLabelElement>(null);
	const form2Container = useRef<HTMLDivElement>(null);
	const ColumnInputLabelRef = useRef<HTMLLabelElement>(null);
	const MemberInputLabelRef = useRef<HTMLLabelElement>(null);

	// Form Refs
	const boardForm1Ref = useRef<HTMLFormElement>(null);
	const boardForm2Ref = useRef<HTMLFormElement>(null);
	const boardForm3Ref = useRef<HTMLFormElement>(null);

	// Defautl Values
	let defaultColumns = [
		{
			id: 0,
			title: "Todo",
			wipLimit: 0,
		},
		{
			id: 1,
			title: "In-Progress",
			wipLimit: 5,
		},
		{
			id: 2,
			title: "Done",
			wipLimit: 0,
		},
	];
	const inputClass =
		"w-full max-w-[300px] h-[2.5rem] border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 p-[0.5rem]";

	// Functions
	function handleBoardForm1(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		let boardName = boardNameInputRef.current?.value;
		let boardDesc = boardDescInputRef.current?.value;

		if (boardName === "" || boardName === null) {
			if (boardNameLabelRef.current)
				boardNameLabelRef.current.style.visibility = "visible";
		} else {
			setBoardForm({
				...boardForm,
				title: boardName!,
				description: boardDesc!,
			});
			if (boardForm1Ref.current) boardForm1Ref.current.style.display = "none";
			if (boardForm2Ref.current) boardForm2Ref.current.style.display = "flex";
		}
	}

	function handleForm2Prev() {
		if (boardForm2Ref.current) boardForm2Ref.current.style.display = "none";
		if (boardForm1Ref.current) boardForm1Ref.current.style.display = "flex";
	}

	function handleBoardForm2(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		let columnsContainer = document.querySelectorAll(".column-input-container");
		let columns: BoardColumnType[] = [];
		let emptyValue = false;

		columnsContainer.forEach((column) => {
			let title = (
				column.querySelector("input[type='text']") as HTMLInputElement
			)?.value;
			let wipLimit = (
				column.querySelector("input[type='number']") as HTMLInputElement
			)?.value;
			if (title === "") emptyValue = true;
			columns.push({
				id: uuidv4(),
				title: title,
				color: "#ffffff",
				wipLimit: parseInt(wipLimit),
				tasks: [],
			});
		});
		if (!emptyValue) {
			setBoardForm({
				...boardForm,
				columns: columns,
			});
			if (boardForm2Ref.current) boardForm2Ref.current.style.display = "none";
			if (boardForm3Ref.current) boardForm3Ref.current.style.display = "flex";
		} else {
			if (ColumnInputLabelRef.current)
				ColumnInputLabelRef.current.style.visibility = "visible";
		}
	}

	let columnIndex = 3;
	function addColumnInput() {
		let columnInput = `
			<div id="columnInput${columnIndex}" class="column-input-container flex gap-[2rem] items-center">
			<input
				class="w-full max-w-[300px] h-[2.5rem] border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 p-[0.5rem]"
				type="text"=
				placeholder="Column Title"
			/>
			<input
				class="w-full h-[2.5rem] border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 p-[0.5rem] max-w-[90px]"
				type="number"
				min="0"
				value="0"
			/>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width={1.5}
				onclick="document.getElementById('columnInput${columnIndex}').remove()"
				class="w-6 h-6 cursor-pointer stroke-black hover:stroke-rose-500 transition-all duration-150"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
				/>
			</svg>
		</div>`;
		if (form2Container.current)
			form2Container.current.insertAdjacentHTML("beforeend", columnInput);
		columnIndex += 1;
	}

	function handleForm3Prev() {
		if (boardForm3Ref.current) boardForm3Ref.current.style.display = "none";
		if (boardForm2Ref.current) boardForm2Ref.current.style.display = "flex";
	}

	// Final Form Handler
	let memberIndex = 0;
	function handleBoardForm3(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		let memberInputs = members;
		memberInputs.push(user.email);
		setMembers(memberInputs);

		let localBoardForm = boardForm;
		localBoardForm.members = members;

		setBoardForm(localBoardForm);

		setBoards([...boards, boardForm]);
		setToggleBoardForm(false);
		database.ref("boards").push(localBoardForm);
	}

	function addMemberInputs() {
		let email = (document.getElementById("member-email") as HTMLInputElement)
			.value;
		if (
			email !== "" &&
			email !== user.email &&
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
		) {
			let memberInputs = members;
			memberInputs.push(email);
			setMembers(memberInputs);
			(document.getElementById("member-email") as HTMLInputElement).value = "";
		} else {
			if (MemberInputLabelRef.current)
				MemberInputLabelRef.current.style.visibility = "visible";
		}
	}

	function deleteMemberInput(index: number) {
		let memberInputs = [...members];
		memberInputs.splice(index, 1);
		setMembers(memberInputs);
	}

	return (
		<div className="fixed top-0 left-0 w-full h-full backdrop-blur-md bg-black/30 flex justify-center items-center z-50 ">
			<div className="w-full max-w-[50rem]  p-[2rem] min-h-[60vh] bg-white rounded-lg shadow-lg flex flex-col  items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					onClick={() => setToggleBoardForm(false)}
					className="w-6 h-6 absolute top-[1rem] right-[1rem] cursor-pointer stroke-black hover:stroke-rose-500 transition-all duration-150 hover:rotate-90"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
				<h1 className="text-2xl font-bold">Create a new board</h1>

				{/* Form 1 */}
				<form
					ref={boardForm1Ref}
					className="w-full flex flex-col justify-center items-start py-[3rem]"
					onSubmit={handleBoardForm1}
				>
					<div className="w-full flex flex-col gap-[0.5rem]">
						<h2 className="mb-[1rem] font-semibold">Board Details</h2>
						<span className="flex flex-col">
							<input
								ref={boardNameInputRef}
								type="text"
								name="boardName"
								id="boardName"
								placeholder="Board Name"
								onFocus={() => {
									if (boardNameLabelRef.current)
										boardNameLabelRef.current.style.visibility = "hidden";
								}}
								className={inputClass}
							/>
							<label
								ref={boardNameLabelRef}
								htmlFor="boardName"
								className="invisible text-sm text-rose-400"
							>
								* Please enter valid Board name
							</label>
						</span>

						<input
							ref={boardDescInputRef}
							type="text"
							name="boardDesc"
							id="boardDesc"
							placeholder="Board Description"
							className="w-full max-w-[300px] h-[2.5rem] border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 p-[0.5rem]"
						/>
					</div>
					<button
						type="submit"
						className="p-[0.5rem_1.5rem] mt-[2rem] bg-bg_2 border-2 border-border_2 hover:bg-blue-400 hover:border-blue-400 rounded-sm"
					>
						Next
					</button>
				</form>

				{/* Form 2 */}
				<form
					onSubmit={handleBoardForm2}
					ref={boardForm2Ref}
					className="w-full hidden flex-col justify-center items-start py-[3rem]"
				>
					<div
						ref={form2Container}
						className="w-full flex flex-col gap-[0.5rem]"
					>
						<h2 className="font-semibold">Board Columns Details</h2>
						<label
							ref={ColumnInputLabelRef}
							className="invisible text-sm text-rose-400"
						>
							* Please enter valid column name
						</label>
						{defaultColumns.map((column, index) => (
							<div
								key={`columnInput${index}`}
								id={`columnInput${index}`}
								className="column-input-container flex gap-[2rem] items-center"
							>
								<input
									className={inputClass}
									type="text"
									id={`col-${index}-title`}
									defaultValue={`${column.title}`}
									placeholder="Column Title"
								/>
								<input
									className={`${inputClass} max-w-[90px]`}
									type="number"
									id={`col-${index}-wip`}
									defaultValue={0}
									min={0}
								/>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									onClick={() => {
										if (index === 0) return;

										const columnInput = document.getElementById(
											`columnInput${index}`
										);
										if (columnInput) columnInput.remove();
									}}
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
					<div
						className="mt-[0.5rem] p-[0.5rem] cursor-pointer border-[2px] border-border_2 rounded-sm"
						onClick={() => addColumnInput()}
					>
						+ Add Column
					</div>
					<div className="flex w-full justify-between">
						<div
							onClick={() => handleForm2Prev()}
							className="p-[0.5rem_1.5rem] mt-[2rem] bg-bg_2 border-2 border-border_2 hover:bg-blue-400 hover:border-blue-400 rounded-sm"
						>
							Prevoius
						</div>
						<button
							type="submit"
							className="p-[0.5rem_1.5rem] mt-[2rem] bg-bg_2 border-2 border-border_2 hover:bg-blue-400 hover:border-blue-400 rounded-sm"
						>
							Next
						</button>
					</div>
				</form>

				{/* Form 3 */}
				<form
					onSubmit={handleBoardForm3}
					ref={boardForm3Ref}
					className="w-full hidden flex-col justify-center items-start py-[3rem]"
				>
					<div className="w-full flex flex-col gap-[0.5rem]">
						<h2 className="font-semibold">Add Members Details</h2>
						<label
							ref={MemberInputLabelRef}
							className="invisible text-sm text-rose-400"
						>
							* Please enter valid email address
						</label>
						<div
							id={`memberInput${memberIndex}`}
							className="flex gap-[2rem] items-center"
						>
							<input
								className={inputClass}
								type="email"
								id={`member-email`}
								placeholder="Email"
								onFocus={() => {
									if (MemberInputLabelRef.current)
										MemberInputLabelRef.current.style.visibility = "hidden";
								}}
							/>
							<div
								onClick={() => addMemberInputs()}
								className="mt-[0.5rem] p-[0.5rem] cursor-pointer border-[2px] border-border_2 rounded-sm"
							>
								Invite User
							</div>
						</div>
					</div>
					<div className="py-[1rem] flex flex-col gap-[0.5rem]">
						{members.map((member, index) => (
							<div
								key={`member-email-${index}`}
								className="flex justify-between w-full"
							>
								{member}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									onClick={() => deleteMemberInput(index)}
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
					<div className="flex w-full justify-between">
						<div
							onClick={() => handleForm3Prev()}
							className="p-[0.5rem_1.5rem] mt-[2rem] bg-bg_2 border-2 border-border_2 hover:bg-blue-400 hover:border-blue-400 rounded-sm"
						>
							Prevoius
						</div>
						<button
							type="submit"
							className="p-[0.5rem_1.5rem] mt-[2rem] bg-bg_2 border-2 border-border_2 hover:bg-blue-400 hover:border-blue-400 rounded-sm"
						>
							Next
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default BoardForm;
