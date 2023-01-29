import React from "react";
import { LabelPropsType } from "../libs/types/Label";

const Label: React.FC<LabelPropsType> = (props) => {
	const { label } = props;
	return (
		<div
			key={`label-${label.id}`}
			className="flex justify-center items-center bg-amber-300 w-max p-[2px_8px] rounded-full text-[10px] font-mono"
		>
			{label.title}
		</div>
	);
};

export default Label;
