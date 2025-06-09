import { useQuery } from "@tanstack/react-query";
import { getVersion } from "~api/axiosClient";
import LoadingBar from "~components/loading/LoadingBar";
import LoadingWrapper from "~components/loading/LoadingWrapper";
import { QueryKeys } from "~root/util/QueryKeys";

function Version() {
	const { data, isPending, isError } = useQuery<string>({ queryKey: [QueryKeys.Version], queryFn: getVersion });

	return (
		<div className="justify-end self-center ml-auto mr-3">
			<LoadingWrapper
				isLoading={isPending}
				isError={isError}
				loadingElement={<LoadingBar />}
				errorELement={<span className="text-red-600 font-bold">Błąd połączenia</span>}>
				<span className="text-neutral-500">v{data}</span>
			</LoadingWrapper>
		</div>
	);
}

export default Version;
