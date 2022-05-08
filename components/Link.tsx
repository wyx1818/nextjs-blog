import Link from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

export default function CustomLink(
  props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
) {
  const { href, ...rest } = props;

  const isInternalLink = href?.startsWith('/');
  const isAnchorLink = href?.startsWith('#');

  if (isInternalLink) {
    return (
      <Link href={href!}>
        <a {...rest}></a>
      </Link>
    );
  }

  if (isAnchorLink) {
    return <a href={href} {...rest}></a>;
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
}
