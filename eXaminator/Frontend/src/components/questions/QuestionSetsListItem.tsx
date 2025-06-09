import AcceptCancelDialog from "~components/dialog/AcceptCancelDialog";
import { useDialog } from "~components/dialog/Dialog";
import Button from "~components/form/Button";
import useQuestionSetSize from "~hooks/useQuestionSetSize";
import { QuestionSet } from "~root/types/api-types";
import QuestionSetForm from "./QuestionSetForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuestionSet } from "~api/questions";
import { useSnackbar } from "notistack";
import { QueryKeys } from "~root/util/QueryKeys";
import { useNavigationStore } from "~root/store/zustand/useNavigationStore";

function QuestionSetListItem({ questionSet }: { questionSet: QuestionSet }) {
	const { size } = useQuestionSetSize(questionSet.id);
	const editDialog = useDialog();
	const deleteDialog = useDialog("Usuń zestaw");
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const { setCurrentQuestionSet } = useNavigationStore();

	const { mutate, isPending } = useMutation({
		mutationFn: () => deleteQuestionSet(questionSet.id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.QuestionSets] });
			deleteDialog.closeDialog();
			enqueueSnackbar("Usunięto zestaw", { variant: "success" });
		},
		onError: (error) => {
			console.error(error);
			deleteDialog.closeDialog();
			enqueueSnackbar("Wystąpił błąd", { variant: "error" });
		},
	});

	return (
		<div className="border-b-1 mt-4 pr-3 border-white w-full flex justify-between items-center">
			<h3 className="text-lg sm:text-2xl">
				{questionSet.name} ({size})
			</h3>
			<div className="flex gap-4">
				<Button onClick={() => setCurrentQuestionSet(questionSet)} noBorder>
					Przeglądaj
				</Button>
				<Button onClick={editDialog.openDialog} noBorder>
					Edytuj
				</Button>
				<QuestionSetForm dialog={editDialog} current={questionSet} />
				<Button disabled={isPending} onClick={deleteDialog.openDialog} noBorder>
					Usuń
				</Button>
				<AcceptCancelDialog
					crucial
					acceptText="Usuń"
					onAccept={() => mutate()}
					text="Czy na pewno chcesz usunąć ten zestaw?"
					dialog={deleteDialog}
				/>
			</div>
		</div>
	);
}

export default QuestionSetListItem;
