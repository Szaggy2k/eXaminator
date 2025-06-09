import Dialog, { useDialog } from "~components/dialog/Dialog";
import Button from "~components/form/Button";
import CheckIcon from "~components/icons/CheckIcon";
import CloseIcon from "~components/icons/CloseIcon";
import { Question } from "~root/types/api-types";
import QuestionForm from "./QuestionForm";
import AcceptCancelDialog from "~components/dialog/AcceptCancelDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { deleteQuestion } from "~api/questions";
import { QueryKeys } from "~root/util/QueryKeys";

interface IQuestionCardProps {
	question: Question;
}

function QuestionCard({ question }: IQuestionCardProps) {
	const editDialog = useDialog("Edytuj pytanie");
	const deleteDialog = useDialog("Usuń pytanie");

	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

	const { mutate, isPending } = useMutation({
		mutationFn: () => deleteQuestion(question.id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.QuestionSets, "size", question.questionSetId] });
			queryClient.invalidateQueries({ queryKey: [QueryKeys.QuestionSets, question.questionSetId] });
			deleteDialog.closeDialog();
			enqueueSnackbar("Usunięto pytanie", { variant: "success" });
		},
		onError: (error) => {
			console.error(error);
			deleteDialog.closeDialog();
			enqueueSnackbar("Wystąpił błąd", { variant: "error" });
		},
	});

	return (
		<div className="border-1 rounded-md w-64 h-48 border-neutral-300 flex flex-col">
			<div className="border-white border-b-1 p-2">
				<h2 className="text-xl font-bold break-words">{question.text}</h2>
			</div>
			<div className="p-2 flex flex-col">
				{question.answers.map((a) => (
					<div key={a.id} className="flex items-center justify-between">
						<div className="w-52">
							<span className=" break-words">{a.text}</span>
						</div>
						{a.isCorrect ? (
							<div className="w-6 text-green-500">
								<CheckIcon />
							</div>
						) : (
							<div className="w-6 text-red-500">
								<CloseIcon />
							</div>
						)}
					</div>
				))}
			</div>
			<div className="flex self-end mt-auto">
				<Button onClick={editDialog.openDialog} noBorder>
					Edytuj
				</Button>
				<Dialog title={editDialog.title} isOpen={editDialog.isOpen} onClose={editDialog.closeDialog}>
					<QuestionForm questionSetId={question.questionSetId} question={question} closeDialog={editDialog.closeDialog} />
				</Dialog>
				<Button onClick={deleteDialog.openDialog} noBorder>
					Usuń
				</Button>
				<AcceptCancelDialog
					dialog={deleteDialog}
					disabled={isPending}
					crucial
					acceptText="Usuń"
					text="Czy na pewno chcesz usunąć te pytanie?"
					onAccept={mutate}
				/>
			</div>
		</div>
	);
}

export default QuestionCard;
