import {telefunc} from "telefunc/vite";
import ssr from "vike/plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import {fileURLToPath} from "node:url";
import commonjs from "vite-plugin-commonjs";

export default defineConfig({
  plugins: [react({}), ssr({}), telefunc(), commonjs()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./', import.meta.url))
      },
    ]
  }
});