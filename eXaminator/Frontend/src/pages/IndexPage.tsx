import Button from "~components/form/Button";
import Particles from "~components/external/Particles";
import MainMenu from "~components/main-menu/MainMenu";
import Screen, { ScreenDirection } from "~components/screen-changer/Screen";
import ScreenChanger from "~components/screen-changer/ScreenChanger";
import { useNavigationStore } from "~root/store/zustand/useNavigationStore";
import Version from "~components/version/Version";
import LocalStorageManager, { LocalStorageKeys } from "~root/util/LocalStorageManager";
import { useEffect, useState } from "react";
import QuestionsMenu from "~components/questions/Questions";

function IndexPage() {
	const { activeScreen, localStorageChanged, setActiveScreen } = useNavigationStore();
	const [particlesEnabled, setParticlesEnabled] = useState(LocalStorageManager.getItem<boolean>(LocalStorageKeys.ParticlesEnabled) ?? true);

	useEffect(() => {
		setParticlesEnabled(LocalStorageManager.getItem<boolean>(LocalStorageKeys.ParticlesEnabled) ?? true);
	}, [localStorageChanged]);

	const placeholder = (
		<div className="size-full flex justify-center items-center">
			<div className="h-[80%] w-[300px] sm:w-[600px] flex flex-col gap-4 justify-center items-center">
				<h2 className="text-white text-4xl text-center">Niedostępne w tej wersji</h2>
				<Button disabled={activeScreen === "menu"} onClick={() => setActiveScreen("menu")}>
					POWRÓT
				</Button>
			</div>
		</div>
	);
	return (
		<div
			style={{ fontFamily: "Roboto" }}
			className="size-full font-extralight bg-gradient-to-b from-25% to-100% to-black from-[#252525] relative">
			{particlesEnabled && (
				<Particles
					particleColors={["#fff"]}
					particleCount={250}
					particleSpread={8}
					speed={0.1}
					particleBaseSize={75}
					alphaParticles={true}
					disableRotation={false}
				/>
			)}
			<div className="absolute top-0 left-0 size-full z-10 flex flex-col">
				<div className="h-2/20 flex justify-center items-center">
					<h1 className="text-white font-regular text-5xl sm:text-8xl">
						E<span className="text-red-800 font-bold">X</span>AMINATOR
					</h1>
				</div>
				<div className="h-17/20">
					<ScreenChanger activeScreen={activeScreen}>
						<Screen name="menu" direction={ScreenDirection.Top}>
							<MainMenu />
						</Screen>
						<Screen name="exam" direction={ScreenDirection.Bottom}>
							{placeholder}
						</Screen>
						<Screen name="questions" direction={ScreenDirection.Right}>
							<QuestionsMenu />
						</Screen>
						<Screen name="archive" direction={ScreenDirection.Left}>
							{placeholder}
						</Screen>
					</ScreenChanger>
				</div>
				<footer className="h-1/20 relative flex justify-between items-center">
					<span className="text-white text-center h-6 absolute left-[50%] translate-x-[-50%]">
						<a className="hover:underline" target="_blank" rel="noreferrer" href="https://github.com/Szaggy2k">
							Szaggy
						</a>
						@2025
					</span>
					<Version />
				</footer>
			</div>
		</div>
	);
}

export default IndexPage;
