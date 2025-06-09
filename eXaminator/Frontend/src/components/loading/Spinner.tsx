interface ISpinnerProps {
	customClass: string;
}

function Spinner({ customClass = "size-32" }: ISpinnerProps) {
	return <div className={`spinner ${customClass}`} />;
}

export default Spinner;
