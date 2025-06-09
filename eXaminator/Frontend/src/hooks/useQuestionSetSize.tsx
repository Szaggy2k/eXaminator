import { useQuery } from "@tanstack/react-query";
import { getQuestionSetSize } from "~api/questions";
import { QueryKeys } from "~root/util/QueryKeys";

function useQuestionSetSize(id: number) {
	const { data, isPending, isError } = useQuery<number>({
		queryKey: [QueryKeys.QuestionSets, "size", id],
		queryFn: () => getQuestionSetSize(id),
	});

	return { size: data, isLoading: isPending, isError };
}

export default useQuestionSetSize;
