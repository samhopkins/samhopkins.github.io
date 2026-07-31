import { existsSync } from "node:fs";
import { copyFile, mkdir, writeFile } from "node:fs/promises";

await mkdir("dist/server", { recursive: true });
await mkdir("dist/.openai", { recursive: true });
const hostingConfig = existsSync(".openai/hosting.json")
  ? ".openai/hosting.json"
  : "../.openai/hosting.json";
await copyFile(hostingConfig, "dist/.openai/hosting.json");
await writeFile(
  "dist/server/index.js",
  `export default {
  async fetch(request, environment) {
    return environment.ASSETS.fetch(request);
  }
};
`
);
