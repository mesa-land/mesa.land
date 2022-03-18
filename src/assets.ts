import { Babel } from "./deps.ts";

import { isDev } from "./config.ts";

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
