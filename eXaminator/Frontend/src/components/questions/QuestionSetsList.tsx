import Button from "~components/form/Button";
import { useNavigationStore } from "~root/store/zustand/useNavigationStore";
import { QuestionSet } from "~root/types/api-types";
import QuestionSetListItem from "./QuestionSetsListItem";
import QuestionSetForm from "./QuestionSetForm";
import { useDialog } from "~components/dialog/Dialog";

interface IQuestionSetsListProps {
	questionSets: QuestionSet[];
}

function QuestionSetsList({ questionSets }: IQuestionSetsListProps) {
	const { setActiveScreen } = useNavigationStore();
	const dialog = useDialog();

	return (
		<div className="flex flex-col h-full w-full text-white items-center">
			<h2 className="text-2xl sm:text-4xl font-semibold">Zestawy pytań</h2>
			<div className="mt-2 w-[90%]">
				<Button onClick={dialog.openDialog}>Utwórz zestaw pytań</Button>
				<QuestionSetForm dialog={dialog} />
			</div>
			<div className="h-[90%] overflow-y-auto w-[90%] flex flex-col items-center">
				{questionSets.map((qs) => (
					<QuestionSetListItem key={qs.id} questionSet={qs} />
				))}
			</div>
			<div className="flex w-[90%] mt-3">
				<Button onClick={() => setActiveScreen("menu")}>Powrót</Button>
			</div>
		</div>
	);
}

export default QuestionSetsList;
