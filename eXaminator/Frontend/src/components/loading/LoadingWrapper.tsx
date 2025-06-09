import { PropsWithChildren } from "react";
import Spinner from "./Spinner";
import Button from "~components/form/Button";
import { useNavigationStore } from "~root/store/zustand/useNavigationStore";

interface ILoadingWrapperProps {
	isLoading?: boolean;
	isError?: boolean;
	loadingElement?: React.ReactElement;
	errorELement?: React.ReactElement;
}

function LoadingWrapper({ isLoading, isError, loadingElement, errorELement, children }: PropsWithChildren<ILoadingWrapperProps>) {
	const { setActiveScreen } = useNavigationStore();

	const defaultLoadingElement = loadingElement ?? (
		<div className="h-48 w-full overflow-hidden flex justify-center items-center">
			<Spinner customClass="size-48" />
		</div>
	);
	const defaultErrorELement = errorELement ?? (
		<div>
			<h2 className="text-red-500 font-bold text-2xl sm:text-4xl mb-4">Błąd pobierania danych</h2>
			<Button onClick={() => setActiveScreen("menu")}>Powrót</Button>
		</div>
	);

	return <>{isLoading ? defaultLoadingElement : isError ? defaultErrorELement : children}</>;
}

export default LoadingWrapper;
