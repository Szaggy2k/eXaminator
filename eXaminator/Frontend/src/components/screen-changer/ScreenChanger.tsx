import React from "react";
import { ReactElement } from "react";
import Screen, { IScreenProps, ScreenAvailableNames } from "~components/screen-changer/Screen";

interface IScreenChangerProps {
	activeScreen: ScreenAvailableNames;
	children: ReactElement<typeof Screen> | ReactElement<typeof Screen>[];
}

function ScreenChanger({ children, activeScreen }: IScreenChangerProps) {
	return (
		<div className="size-full relative overflow-hidden">
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					const screenChild = child as unknown as ReactElement<IScreenProps>;
					return React.cloneElement(screenChild, { ...screenChild.props, activeScreen, key: screenChild.key || screenChild.props.name });
				}
				return child;
			})}
		</div>
	);
}

export default ScreenChanger;
