import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), tsConfigPaths()],
	build: {
		outDir: "../wwwroot",
		emptyOutDir: true
	},
	server: {
		port: 5173,
		strictPort: true
	}
});
