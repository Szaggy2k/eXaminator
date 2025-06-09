import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { postQuestion, putQuestion, putQuestionSet } from "~api/questions";
import Button from "~components/form/Button";
import TextField from "~components/form/TextField";
import Toggle from "~components/form/Toggle";
import CloseIcon from "~components/icons/CloseIcon";
import PlusIcon from "~components/icons/PlusIcon";
import { Question, QuestionAnswer } from "~root/types/api-types";
import { QueryKeys } from "~root/util/QueryKeys";

interface IQuestionFormProps {
	questionSetId: number;
	question?: Question;
	closeDialog?: () => void;
}

function QuestionForm({ questionSetId, question, closeDialog }: IQuestionFormProps) {
	const { enqueueSnackbar } = useSnackbar();
	const [text, setText] = useState(question?.text ?? "");
	const [textError, setTextError] = useState<string | undefined>(undefined);
	const [points, setPoints] = useState(`${question?.points ?? 1}`);
	const [pointsError, setPointsError] = useState<string | undefined>(undefined);
	console.log(question);
	const [answers, setAnswers] = useState<QuestionAnswer[]>(
		question?.answers ?? [
			{
				id: 1,
				text: "",
				isCorrect: true,
			},
			{
				id: 2,
				text: "",
				isCorrect: false,
			},
		],
	);

	useEffect(() => {
		if (answers.length === 0) {
			setAnswers(
				question?.answers ?? [
					{
						id: 1,
						text: "",
						isCorrect: true,
					},
					{
						id: 2,
						text: "",
						isCorrect: false,
					},
				],
			);
		}
	}, [answers]);

	const [answersError, setAnswersError] = useState<string | undefined>(undefined);

	const addAnswer = () => {
		const array: QuestionAnswer[] = JSON.parse(JSON.stringify(answers));
		array.push({ id: Date.now(), text: "", isCorrect: false });
		setAnswers(array);
	};

	const removeAnswer = (index: number) => {
		const array: QuestionAnswer[] = JSON.parse(JSON.stringify(answers));
		array.splice(index, 1);
		setAnswers(array);
	};

	const toggleAnswer = (index: number) => {
		const array: QuestionAnswer[] = JSON.parse(JSON.stringify(answers));
		array[index].isCorrect = !array[index].isCorrect;
		setAnswers(array);
		setAnswersError(undefined);
	};

	const changeText = (index: number, value: string) => {
		const array: QuestionAnswer[] = JSON.parse(JSON.stringify(answers));
		array[index].text = value;
		setAnswers(array);
		setAnswersError(undefined);
	};

	const resetForm = () => {
		setText(question?.text ?? "");
		setPoints(`${question?.points ?? 1}`);
		setAnswers([]);
		setTextError(undefined);
		setPointsError(undefined);
		setAnswersError(undefined);
	};

	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: (data: Question) => (data?.id ? putQuestion(data) : postQuestion(data)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.QuestionSets, questionSetId] });
			queryClient.invalidateQueries({ queryKey: [QueryKeys.QuestionSets, "size", questionSetId] });

			closeDialog?.();
			resetForm();
			enqueueSnackbar("Zapisano pytanie", { variant: "success" });
		},
		onError: () => {
			closeDialog?.();
			enqueueSnackbar("Wystąpił błąd", { variant: "error" });
		},
	});

	const submit = () => {
		if (text.trim() === "") {
			setTextError("Treść nie może być pusta");
			return;
		}
		if (parseInt(points) <= 0) {
			setPointsError("Punkty nie mogą być mniejsze od 0");
			return;
		}
		if (answers.every((a) => !a.isCorrect)) {
			setAnswersError("Przynajmniej jedna odpowiedź musi być poprawna");
			return;
		}
		if (answers.some((a) => a.text.trim() === "")) {
			setAnswersError("Odpowiedź nie może być pusta");
			return;
		}
		const result: Question = {
			id: question?.id ?? 0,
			questionSetId,
			text,
			points: parseInt(points),
			answers,
		};

		mutate(result);
	};
	return (
		<div className="size-full flex flex-col">
			<TextField
				error={!!textError}
				helperText={textError}
				onBlur={() => setTextError(undefined)}
				value={text}
				onChange={(e) => setText(e.target.value)}
				label="Treść pytania"
			/>
			<TextField
				error={!!pointsError}
				helperText={pointsError}
				onBlur={() => setPointsError(undefined)}
				value={points}
				onChange={(e) => setPoints(e.target.value)}
				label="Ilość punktów"
				type="number"
			/>
			<div className="border-b-1 border-neutral-700 my-1"></div>
			{answers.map((a, index) => (
				<div key={a.id} className="w-full my-2 justify-between items-center flex">
					<div className="w-[30%] flex">
						<Toggle onChange={() => toggleAnswer(index)} label="Poprawna?" checked={a.isCorrect} />
					</div>
					<div className="w-full mx-3">
						<TextField value={answers[index].text} onChange={(e) => changeText(index, e.target.value)} label={`Odpowiedź ${index + 1}`} />
					</div>
					<div>
						<Button onClick={() => removeAnswer(index)} noBorder error disabled={answers.length <= 2}>
							<CloseIcon />
						</Button>
					</div>
				</div>
			))}
			{answersError && <span className="text-red-500 my-2">{answersError}</span>}
			<Button onClick={addAnswer}>
				<PlusIcon />
			</Button>
			<div className="border-b-1 border-neutral-700 my-2"></div>
			<Button disabled={isPending} onClick={submit} success>
				Zapisz
			</Button>
		</div>
	);
}

export default QuestionForm;
