import { default as Babel } from "https://esm.sh/@babel/standalone@7.17.6";

import { isDev } from "./src/config.ts";

export interface Metadata {
  dependencies?: string[];
}

export const transform = async (
  filepath: string,
): Promise<{ code: string; metadata: Metadata }> => {
  const source = await Deno.readTextFile(filepath);
  const { code, metadata = {} } = Babel.transform(source, {
    presets: [
      "typescript",
    ],
    plugins: [],
    babelrc: false,
    envName: isDev() ? "development" : "production",
    minified: !isDev,
    filename: filepath,
  });

  const withComments = `// @ts-nocheck\n${code}`;

  return { code: withComments, metadata };
};

const start = Date.now();
const scriptPath = "./src/client/events.ts";
const { code } = await transform(scriptPath);
await Deno.writeTextFile("./public/scripts/events.js", code);
const ms = Date.now() - start;
console.log(`>>> babel complete in ${ms}ms`);
