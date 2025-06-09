import { PropsWithChildren } from "react";

export enum ScreenDirection {
	Top = 0,
	Bottom = 1,
	Left = 2,
	Right = 3,
}

export type ScreenAvailableNames = "menu" | "exam" | "questions" | "archive";

export interface IScreenProps {
	name: ScreenAvailableNames;
	activeScreen?: ScreenAvailableNames;
	direction: ScreenDirection;
}

const getAnimationClasses = (direction: ScreenDirection) => {
	switch (direction) {
		case ScreenDirection.Top:
			return ["-translate-y-full opacity-0 pointer-events-none", "translate-y-0 opacity-100"];
		case ScreenDirection.Bottom:
			return ["translate-y-full opacity-0 pointer-events-none", "translate-y-0 opacity-100"];
		case ScreenDirection.Left:
			return ["-translate-x-full opacity-0 pointer-events-none", "translate-x-0 opacity-100"];
		case ScreenDirection.Right:
			return ["translate-x-full opacity-0 pointer-events-none", "translate-x-0 opacity-100"];
		default:
			return ["opacity-0 pointer-events-none", "opacity-100"];
	}
};

function Screen(props: PropsWithChildren<IScreenProps>): React.ReactElement {
	const { children, name, activeScreen, direction } = props;
	const [inactiveClass, activeClass] = getAnimationClasses(direction);
	const isActive = name == activeScreen;

	return (
		<div
			tabIndex={isActive ? 0 : -1}
			aria-hidden={!isActive}
			className={`size-full absolute transition-all duration-1000 ease-in-out ${isActive ? activeClass : inactiveClass}`}>
			{children}
		</div>
	);
}

export default Screen;
