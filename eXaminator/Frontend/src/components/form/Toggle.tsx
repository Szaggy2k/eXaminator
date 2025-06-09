import React, { useId, useState } from "react";

interface IToggleProps {
	label: string;
	checked?: boolean;
	onChange?: (checked: boolean) => void;
}

const Toggle = ({ label, checked = false, onChange }: IToggleProps) => {
	const id = useId();

	const [isChecked, setIsChecked] = useState(checked);
	const toggleOnChange = () => {
		setIsChecked(!isChecked);
		onChange?.(checked);
	};

	return (
		<label htmlFor={id} className="flex flex-col cursor-pointer space-x-4">
			<span className="text-white">{label}</span>
			<div className="relative">
				<input id={id} type="checkbox" defaultChecked={isChecked} onChange={toggleOnChange} className="sr-only" />
				<div className={`w-10 h-6 rounded-full shadow-inner transition-colors ${isChecked ? "bg-green-500" : "bg-neutral-600"}`} />
				<div
					className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform transform ${
						isChecked ? "translate-x-4" : ""
					}`}
				/>
			</div>
		</label>
	);
};

export default Toggle;
