import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: "**/*.Jsx",
});
const config = {
  apiUrl: process.env.REACT_APP_API_URL || "http://localhost:3000",
};
