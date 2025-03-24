import react from "@vitejs/plugin-react";
import { telefunc } from "telefunc/vite";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import vikeNode from "vike-node/plugin";

export default defineConfig({
  plugins: [
    vike({}),
    react({}),
    telefunc({
      log: {
        shieldErrors: true,
      },
    }),
    vikeNode({
      entry: "server/index.ts",
      standalone: true,
    }),
  ],
  build: {
    target: "es2022",
  },

  resolve: {
    alias: {
      "@": new URL("./", import.meta.url).pathname,
    },
  },
});
