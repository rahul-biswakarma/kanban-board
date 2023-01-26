import React from "react";
import { LabelPropsType } from "../libs/types/Label";

const Label: React.FC<LabelPropsType> = (props) => {
	const { label } = props;
	return (
		<div
			style={{ background: label.color }}
			className="flex justify-center items-center w-max p-[2px_8px] rounded-full text-[10px] font-mono"
		>
			{label.name}
		</div>
	);
};

export default Label;
