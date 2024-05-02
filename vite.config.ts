import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { nodeExternals } from "rollup-plugin-node-externals";
import { defineConfig, loadEnv } from "vite";
import dts from "vite-plugin-dts";

const rootDir = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(rootDir, "./src");
const distDir = resolve(rootDir, "./dist");
const typesDir = resolve(distDir, "./typings");

export default ({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return defineConfig({
    root: srcDir,
    plugins: [
      dts({
        outDir: typesDir,
      }),
      nodeExternals(),
    ],
    resolve: {
      alias: {
        "@": srcDir,
      },
    },
    build: {
      outDir: distDir,
      emptyOutDir: true,
      reportCompressedSize: true,
      lib: {
        entry: {
          index: resolve(srcDir, "./main.ts"),
        },
        formats: ["es", "cjs"],
      },
    },
  });
};
