import dockerIcon from "~assets/docker.svg";
import eslintIcon from "~assets/eslint.svg";
import prettierIcon from "~assets/prettier.svg";
import reactRouterIcon from "~assets/react-router.svg";
import reactIcon from "~assets/react.svg";
import tailwindIcon from "~assets/tailwind.svg";
import typescriptIcon from "~assets/typescript.svg";
import viteIcon from "~assets/vite.svg";
import OrbContainer from "~components/OrbContainer";

function IndexPage() {
	return (
		<div className="w-full h-full bg-radial from-25% to-100% to-black from-[#2a3051] flex flex-col justify-center items-center gap-10">
			<header>
				<a
					target="_blank"
					rel="noreferrer"
					href="https://github.com/Szaggy2k/szaggy-react-template"
					className="font-bold text-white text-2xl md:text-4xl h-12 hover:underline">
					szaggy-react-template
				</a>
			</header>
			<main>
				<OrbContainer orbs={[dockerIcon, eslintIcon, prettierIcon, reactIcon, reactRouterIcon, tailwindIcon, typescriptIcon, viteIcon]} />
			</main>
			<footer className="h-12">
				<span className="text-white">
					<a className="hover:underline" target="_blank" rel="noreferrer" href="https://github.com/Szaggy2k">
						Szaggy
					</a>
					@2025
				</span>
			</footer>
		</div>
	);
}

export default IndexPage;
