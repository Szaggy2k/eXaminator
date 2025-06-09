import { useId, useState } from "react";

interface ITextFieldProps {
	label: string;
	helperText?: string;
	error?: boolean;
	disabled?: boolean;
	type?: React.HTMLInputTypeAttribute;
	name?: string;
	value?: string;
	defaultValue?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const getInputColor = (disabled: boolean = false, error: boolean = false) => {
	if (disabled) return "text-neutral-500 border-neutral-700";
	if (error) return "text-red-500 border-red-500 focus:text-white";
	return "text-white border-neutral-500";
};

const getLabelColor = (disabled: boolean = false, error: boolean = false) => {
	if (disabled) return "peer-placeholder-shown:text-neutral-500 text-neutral-500";
	if (error) return "peer-placeholder-shown:text-red-500 text-red-500";
	return "peer-placeholder-shown:text-neutral-300 text-neutral-300";
};
function TextField({
	label,
	helperText,
	error,
	disabled,
	type = "text",
	name,
	value: controlledValue,
	defaultValue,
	onChange,
	onFocus,
	onBlur,
}: ITextFieldProps) {
	const [uncontrolledValue, setUncontrolledValue] = useState<string>("");
	const isControlled = controlledValue !== undefined;
	const inputValue = isControlled ? controlledValue : uncontrolledValue;

	const id = useId();

	const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		onFocus?.(e);
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		onBlur?.(e);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (!isControlled) {
			setUncontrolledValue(e.target.value);
		}
		onChange?.(e);
	};

	const inputColor = getInputColor(disabled, error);

	const labelColor = getLabelColor(disabled, error);

	return (
		<div className="relative my-1">
			{type === "textarea" ? (
				<textarea
					id={id}
					name={name}
					value={inputValue}
					rows={3}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					disabled={disabled}
					aria-disabled={disabled}
					aria-invalid={error}
					aria-describedby={helperText ? `${id}-helper-text` : undefined}
					className={`block peer px-2.5 pb-2.5 pt-4 appearance-none w-full text-sm bg-transparent rounded-lg border-1 focus:border-blue-500 focus:ring-0 focus:outline-none ${inputColor}`}
					placeholder={defaultValue ?? ""}></textarea>
			) : (
				<input
					id={id}
					type={type}
					name={name}
					value={inputValue}
					min={1}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					disabled={disabled}
					aria-disabled={disabled}
					aria-invalid={error}
					aria-describedby={helperText ? `${id}-helper-text` : undefined}
					className={`block peer px-2.5 pb-2.5 pt-4 appearance-none w-full text-sm bg-transparent rounded-lg border-1 focus:border-blue-500 focus:ring-0 focus:outline-none ${inputColor}`}
					placeholder={defaultValue ?? ""}
				/>
			)}
			<label
				htmlFor={id}
				className={`absolute text-sm duration-200 ease-out transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-900 px-2 peer-focus:px-2 peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 ${labelColor}`}>
				{label}
			</label>
			{helperText && (
				<p id={`${id}-helper-text`} className={`mt-1 ml-1 text-sm ${labelColor}`}>
					{helperText}
				</p>
			)}
		</div>
	);
}

export default TextField;
