import { useId } from "react";
import ChevronDownIcon from "~components/icons/ChevronDownIcon";

interface ISelectProps {
	options: { value: string; label: string }[];
	value: string;
	label: string;
	onChange: (value: string) => void;
	disabled?: boolean;
}

function Select({ options, value, label, onChange, disabled }: ISelectProps) {
	const id = useId();

	return (
		<div className="relative min-w-14 flex items-center">
			<label htmlFor={id} className="">
				{label}:
				<div className="relative">
					<select
						id={id}
						value={value}
						disabled={disabled}
						aria-disabled={disabled}
						onChange={(e) => onChange(e.target.value)}
						className="appearance-none py-1 px-3 pr-8 w-full rounded-md border border-neutral-500 bg-none text-white focus:outline-none focus:ring-1 disabled:text-neutral-600 disabled:border-neutral-600  focus:ring-blue-500 focus:border-blue-500">
						{options.map((o) => (
							<option key={o.value} className="bg-neutral-900" value={o.value}>
								{o.label}
							</option>
						))}
					</select>
					<div className={`pointer-events-none absolute inset-y-0 right-3 flex items-center ${disabled ? "text-neutral-600" : "text-white"}`}>
						<ChevronDownIcon />
					</div>
				</div>
			</label>
		</div>
	);
}

export default Select;
