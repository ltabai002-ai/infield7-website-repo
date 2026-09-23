import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: { port: 8080 },
  ssr: { noExternal: true },
  plugins: [tsconfigPaths(), tailwindcss(), tanstackStart(), react()],
});
