import fs from 'fs';
import { bundleMDX } from 'mdx-bundler';
import rehypeHighlight from 'rehype-highlight'; // Highlighting to code
import remarkGfm from 'remark-gfm'; // Tables, footnotes, strikethrough, task lists, literal URLs.

export async function getMdxData(mdxFilePath: string) {
  const fileContent = fs.readFileSync(mdxFilePath, 'utf-8');

  return await bundleMDX({
    source: fileContent,
    mdxOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeHighlight];

      return options;
    },
  });
}
