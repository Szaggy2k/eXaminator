import Orb from "./Orb";
import shaggy from "~assets/shaggy.gif";

interface IOrbContainerProps {
	orbs: string[];
}

function OrbContainer({ orbs }: IOrbContainerProps) {
	return (
		<div className="w-64 h-64 md:w-100 md:h-100 relative a-rotate-c">
			{orbs.map((icon, index) => (
				<Orb key={icon} icon={icon} rotation={(360 / orbs.length) * index} />
			))}
			<div className="absolute w-32 h-32 md:w-48 md:h-48 a-rotate-cc rounded-full bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
				<img className="w-full, h-full rounded-full p-1" alt="shaggy" src={shaggy} />
			</div>
		</div>
	);
}

export default OrbContainer;
