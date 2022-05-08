import * as path from 'path';
import * as React from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';

import { getMdxData, MDXDate } from 'utils/mdxBundler';
import { getPostPaths } from 'utils/posts';
import MDXComponent from '@/components/MDXComponent';

export default function Post(props: MDXDate) {
  const { code, frontmatter } = props;

  return (
    <>
      <Head>
        <title>zuiyu | {frontmatter.title}</title>
      </Head>

      <main className="px-4 sm:px-0 dark:bg-slate-900">
        <MDXComponent code={code} />
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
