import "~styles/tailwind.css";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import IndexPage from "~pages/IndexPage";

function App() {
	return (
		<StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path="*" element={<IndexPage />}></Route>
				</Routes>
			</BrowserRouter>
		</StrictMode>
	);
}

export default App;
