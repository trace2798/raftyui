/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
import { join } from "path";

export default defineConfig({
  cacheDir: "../../../node_modules/.vite/components-button",
  plugins: [
    dts({
      entryRoot: "src",
      tsConfigFilePath: join(__dirname, "tsconfig.lib.json"),
      skipDiagnostics: true,
    }),
    react(),
    viteTsConfigPaths({
      root: "../../../",
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../../',
  //    }),
  //  ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    target: "esnext",
    minify: "terser",
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: "src/index.ts",
      name: "button",
      fileName: "index",
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [
        "react",
        "class-variance-authority",
        "@rafty/spinner",
        "@rafty/utils",
      ],
    },
  },
});
