import * as React from 'react';
import { getMDXComponent } from 'mdx-bundler/client';

interface MDXMarkdownPropTypes {
  code: string;
}

export default function MDXMarkdown(props: MDXMarkdownPropTypes) {
  const { code } = props;

  // it's generally a good idea to memoize this function call to
  // avoid re-creating the component every render.
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  return (
    <article className="prose mx-auto dark:prose-invert">
      <Component />
    </article>
  );
}
