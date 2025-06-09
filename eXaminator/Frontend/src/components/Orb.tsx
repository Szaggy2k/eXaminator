interface IOrbProps {
	icon: string;
	rotation: number;
}

function Orb({ rotation, icon }: IOrbProps) {
	return (
		<div className="w-16 h-80 md:h-100 absolute top-[50%] left-[50%]" style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}>
			<div className="w-16 h-16 bg-white rounded-full p-1 a-rotate-cc">
				<img alt="icon" src={icon} className="w-full h-full rounded-full" style={{ transform: `rotate(-${rotation}deg)` }} />
			</div>
		</div>
	);
}

export default Orb;
