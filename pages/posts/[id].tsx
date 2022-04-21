import * as path from 'path';
import * as React from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getMDXComponent } from 'mdx-bundler/client';

import { getMdxData } from 'utils/mdxBundler';
import { getPostPaths } from 'utils/posts';

interface PostPropTypes {
  code: string;
  frontmatter: {
    title: string;
    description: string;
  };
}

export default function Post(props: PostPropTypes) {
  const { code, frontmatter } = props;
  // it's generally a good idea to memoize this function call to
  // avoid re-creating the component every render.
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/dark.min.css" />
        <title>zuiyu | {frontmatter.title}</title>
      </Head>

      <main className="p-2">
        <article className="prose mx-auto">
          <Component />
        </article>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params!;

  const fullPath = path.join(process.cwd(), 'content', 'posts', `${id}.mdx`);
  const { code, frontmatter } = await getMdxData(fullPath);

  return {
    props: {
      code,
      frontmatter,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostPaths();

  return {
    paths,
    fallback: false,
  };
};