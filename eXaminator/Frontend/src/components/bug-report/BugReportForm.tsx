import { useState } from "react";
import Button from "~components/form/Button";
import TextField from "~components/form/TextField";
import amounts from "~assets/amounts.webp";

function BugReportForm() {
	const [wasSent, setWasSent] = useState(false);

	return wasSent ? (
		<div className="size-70 sm:size-full">
			<img className="size-full" src={amounts} alt="No fucks given" />
		</div>
	) : (
		<div>
			<TextField label="Tytuł" />
			<TextField label="Treść błędu" type="textarea" />
			<Button success onClick={() => setWasSent(true)}>
				Wyślij
			</Button>
		</div>
	);
}

export default BugReportForm;
