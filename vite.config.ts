import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node"
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vercelPreset } from '@vercel/remix/vite';

installGlobals();

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), remix({ presets: [vercelPreset()] })],
});
