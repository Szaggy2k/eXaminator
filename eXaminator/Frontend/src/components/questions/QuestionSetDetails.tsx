import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getQuestionSet } from "~api/questions";
import Button from "~components/form/Button";
import LoadingWrapper from "~components/loading/LoadingWrapper";
import { useNavigationStore } from "~root/store/zustand/useNavigationStore";
import { QueryKeys } from "~root/util/QueryKeys";
import QuestionCard from "./QuestionCard";
import useQuestionSetSize from "~hooks/useQuestionSetSize";
import Select from "~components/form/Select";
import { useEffect, useMemo, useState } from "react";
import Dialog, { useDialog } from "~components/dialog/Dialog";
import QuestionForm from "./QuestionForm";
import ChevronLeftIcon from "~components/icons/ChevronLeftIcon";
import ChevronRightIcon from "~components/icons/ChevronRightIcon";

interface IQuestionSetDetails {
	questionSetId: number;
}

function QuestionSetDetails({ questionSetId }: IQuestionSetDetails) {
	const { setCurrentQuestionSet } = useNavigationStore();
	const queryClient = useQueryClient();
	const questionSetSize = useQuestionSetSize(questionSetId);
	const addQuestionDialog = useDialog("Dodaj pytanie");

	const pageSizeOptions = [
		// { value: "3", label: "3" },
		// { value: "6", label: "6" },
		// { value: "12", label: "12" },
		{ value: "Wszystkie", label: "Wszystkie" },
	];

	const [pageSize, setPageSize] = useState(pageSizeOptions[0].value);
	const allQuestions = pageSize === "Wszystkie";
	const pagesOptions = useMemo(() => {
		const size = questionSetSize?.size ?? 0;
		let pages = Math.ceil(size / parseInt(pageSize));
		pages = pages === 0 || allQuestions ? 1 : pages;
		return Array.from({ length: pages }, (_, i) => ({ value: (i + 1).toString(), label: (i + 1).toString() }));
	}, [pageSize, questionSetSize.size]);

	const [page, setPage] = useState(pagesOptions[0]?.value);

	const onPageSizeChange = (value: string) => {
		setPageSize(value);
		setPage("1");
	};

	const nextPage = () => setPage(`${parseInt(page) + 1}`);
	const previousPage = () => setPage(`${parseInt(page) - 1}`);

	const { data, isPending, isError } = useQuery({
		queryKey: [QueryKeys.QuestionSets, questionSetId],
		queryFn: () => getQuestionSet(questionSetId, 1, 5000),
	});

	useEffect(() => {
		queryClient.invalidateQueries({ queryKey: [QueryKeys.QuestionSets, questionSetId] });
	}, [page, pageSize]);

	return (
		<LoadingWrapper isLoading={isPending} isError={isError}>
			<div className="flex flex-col size-full text-white items-center">
				<h2 className="text-2xl sm:text-4xl font-semibold mb-6">
					{data?.name} ({questionSetSize.size}) - szczegóły
				</h2>
				<div className="flex w-[90%] justify-between items-center">
					<div>
						<Select disabled value={pageSize} label="Rozmiar" onChange={(value) => onPageSizeChange(value)} options={pageSizeOptions}></Select>
					</div>
					{!allQuestions && (
						<div className="flex">
							<div className="self-end">
								<Button onClick={previousPage} disabled={pagesOptions.length <= 1 || parseInt(page) <= 1}>
									<ChevronLeftIcon />
								</Button>
							</div>
							<Select
								value={page}
								label="Strona"
								disabled={pagesOptions.length <= 1}
								onChange={(value) => setPage(value)}
								options={pagesOptions}
							/>
							<div className="self-end">
								<Button onClick={nextPage} disabled={pagesOptions.length <= 1 || parseInt(page) >= pagesOptions.length}>
									<ChevronRightIcon />
								</Button>
							</div>
						</div>
					)}
					<div>
						<Button onClick={addQuestionDialog.openDialog}>Dodaj nowe pytanie</Button>
						<Dialog isOpen={addQuestionDialog.isOpen} onClose={addQuestionDialog.closeDialog} title={addQuestionDialog.title}>
							<QuestionForm questionSetId={questionSetId} closeDialog={addQuestionDialog.closeDialog} />
						</Dialog>
					</div>
				</div>
				<div className="h-[87%] overflow-y-auto w-[90%] pr-2 mt-2 flex flex-col items-center">
					{(data?.questions ?? []).length <= 0 ? (
						<div className="h-full flex justify-center items-center">
							<h3 className="text-2xl sm:text-4xl font-bold">Zestaw jest pusty</h3>
						</div>
					) : (
						<div className="w-full h-full flex flex-wrap gap-4 justify-around">
							{data?.questions.map((q) => <QuestionCard key={q.id} question={q} />)}
						</div>
					)}
				</div>
				<div className="flex w-[90%] mt-3">
					<Button onClick={() => setCurrentQuestionSet(undefined)}>Powrót</Button>
				</div>
			</div>
		</LoadingWrapper>
	);
}

export default QuestionSetDetails;
