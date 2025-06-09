import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { postQuestionSet, putQuestionSet } from "~api/questions";
import Dialog, { UseDialog } from "~components/dialog/Dialog";
import Button from "~components/form/Button";
import TextField from "~components/form/TextField";
import { QuestionSet } from "~root/types/api-types";
import { QueryKeys } from "~root/util/QueryKeys";

interface IQuestionSetFormProps {
	current?: QuestionSet;
	dialog: UseDialog;
}

function QuestionSetForm({ dialog, current }: IQuestionSetFormProps) {
	const [name, setName] = useState(current?.name ?? "");
	const verb = current?.id ? "Edytuj" : "Utwórz";
	const [error, setError] = useState<string | undefined>(undefined);
	const { enqueueSnackbar } = useSnackbar();
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: () => (current?.id ? putQuestionSet(name, current.id) : postQuestionSet(name)),
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.QuestionSets] });
			dialog.closeDialog();
			setName(response?.name ?? "");
			setError(undefined);
			enqueueSnackbar("Utworzono zestaw pytań", { variant: "success" });
		},
		onError: () => {
			dialog.closeDialog();
			setName(current?.name ?? "");
			setError(undefined);
			enqueueSnackbar(`Wystąpił błąd`, { variant: "error" });
		},
	});

	const onNameChange = (name: string) => setName(name);
	const onBlur = () => setError(undefined);
	const onSubmit = () => {
		if (name.trim() === "") {
			setError("Nazwa nie może być pusta");
			return;
		}
		mutate();
	};
	return (
		<Dialog title={`${verb} zestaw pytań`} onClose={dialog.closeDialog} isOpen={dialog.isOpen}>
			<TextField
				label="Nazwa zestawu"
				onBlur={onBlur}
				disabled={isPending}
				error={!!error}
				helperText={error}
				value={name}
				onChange={(e) => onNameChange(e.target.value)}
			/>
			<Button success disabled={isPending} onClick={onSubmit}>
				{verb}
			</Button>
		</Dialog>
	);
}

export default QuestionSetForm;
