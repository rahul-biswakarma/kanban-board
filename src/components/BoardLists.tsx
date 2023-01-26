import React from "react";

import { BoardListPropsType } from "../libs/types/BoardList";

const BoardLists: React.FC<BoardListPropsType> = (props) => {
	const { boards, setBoardNo } = props;
	return (
		<section className="sticky top-0 py-[2rem] px-[1rem] border-l-[2px] border-border_color flex flex-col gap-[3rem] min-w-[250px]">
			<h1 className="font-[500]">Boards</h1>
			<div className="flex flex-col gap-[0.5rem]">
				{boards.map((board, index) => {
					return (
						<div
							onClick={() => setBoardNo(index)}
							className="flex justify-between rounded-md p-[0.3rem] stroke-text_2 text-text_2 hover:text-text_1 hover:stroke-text_1 cursor-pointer"
						>
							<div
								className=""
								key={board.id}
							>
								{board.title}{" "}
							</div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 stroke-inherit"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
								/>
							</svg>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default BoardLists;
