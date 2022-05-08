import * as React from 'react';
import { ComponentMap, getMDXComponent } from 'mdx-bundler/client';

import CustomLink from './Link';

const MDXComponents: ComponentMap = {
  a: CustomLink,
};

interface MDXMarkdownPropTypes {
  code: string;
}

export default function MDXComponent(props: MDXMarkdownPropTypes) {
  const { code } = props;

  // it's generally a good idea to memoize this function call to
  // avoid re-creating the component every render.
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  return (
    <article className="prose mx-auto dark:prose-invert">
      <Component components={MDXComponents} />
    </article>
  );
}
