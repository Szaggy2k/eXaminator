import Button from "~components/form/Button";
import { useNavigationStore } from "~root/store/zustand/useNavigationStore";
import QuestionSetForm from "./QuestionSetForm";
import { useDialog } from "~components/dialog/Dialog";

function NoQuestionSets() {
	const { setActiveScreen } = useNavigationStore();
	const dialog = useDialog();

	return (
		<div className="flex gap-4 flex-col">
			<h2 className="text-white text-2xl sm:text-4xl">Nie znaleziono zestawu pytań</h2>
			<Button onClick={dialog.openDialog}>Utwórz zestaw pytań</Button>
			<QuestionSetForm dialog={dialog} />
			<Button onClick={() => setActiveScreen("menu")}>Powrót</Button>
		</div>
	);
}

export default NoQuestionSets;
