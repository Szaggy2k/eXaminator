import { useQuery } from "@tanstack/react-query";
import { getQuestionSets } from "~api/questions";
import LoadingWrapper from "~components/loading/LoadingWrapper";
import { QuestionSet } from "~root/types/api-types";
import { QueryKeys } from "~root/util/QueryKeys";
import NoQuestionSets from "./NoQuestionSets";
import QuestionSetsList from "./QuestionSetsList";
import { useNavigationStore } from "~root/store/zustand/useNavigationStore";
import QuestionSetDetails from "./QuestionSetDetails";

function QuestionsMenu() {
	const { data, isPending, isError } = useQuery<QuestionSet[]>({ queryKey: [QueryKeys.QuestionSets], queryFn: getQuestionSets });
	const { currentQuestionSet } = useNavigationStore();
	return (
		<div className="size-full flex flex-col justify-center items-center">
			<LoadingWrapper isLoading={isPending} isError={isError}>
				{data?.length ? (
					currentQuestionSet ? (
						<QuestionSetDetails questionSetId={currentQuestionSet.id} />
					) : (
						<QuestionSetsList questionSets={data} />
					)
				) : (
					<NoQuestionSets />
				)}
			</LoadingWrapper>
		</div>
	);
}

export default QuestionsMenu;
