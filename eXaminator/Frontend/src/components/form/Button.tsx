import { PropsWithChildren } from "react";

interface IButtonProps {
	disabled?: boolean;
	noBorder?: boolean;
	title?: string;
	error?: boolean;
	success?: boolean;
	submit?: boolean;
	onClick?: () => void;
}

const getButtonColor = (error?: boolean, success?: boolean) => {
	if (error) return "text-red-500 border-red-700 hover:text-red-300 hover:border-red-300";
	if (success) return "text-green-500 border-green-700 hover:text-green-300 hover:border-green-300";
	return "text-neutral-300 border-neutral-500 hover:text-white hover:border-white";
};

function Button({ children, onClick, error, noBorder, disabled, title, success, submit }: PropsWithChildren<IButtonProps>) {
	const color = getButtonColor(error, success);

	return (
		<button
			title={title}
			aria-disabled={disabled}
			disabled={disabled}
			onClick={onClick}
			{...(submit && { type: "submit" })}
			className={`flex cursor-pointer justify-center bg-none p-1 sm:p-2 font-regular text-md sm:text-lg rounded-md w-full ${color} disabled:text-neutral-600 disabled:border-neutral-600 ${!noBorder && "border-1"}`}>
			{children}
		</button>
	);
}

export default Button;
