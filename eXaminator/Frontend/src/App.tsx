import "~styles/tailwind.css";
import IndexPage from "~pages/IndexPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<SnackbarProvider maxSnack={1} preventDuplicate={true} anchorOrigin={{ horizontal: "right", vertical: "top" }} autoHideDuration={2000}>
				<IndexPage />
			</SnackbarProvider>
		</QueryClientProvider>
	);
}

export default App;
