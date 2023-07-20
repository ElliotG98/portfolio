import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import Image from './image';
import Link from 'next/link';
import Pre from './pre';
import PostLayout from './PostLayout';

const LAYOUTS = {
    post: PostLayout,
};

interface MDXWrapperProps {
    components: any;
    frontMatter: any;
    authorDetails: any;
    next?: any;
    prev?: any;
    children: any;
    layout: keyof typeof LAYOUTS;
    [key: string]: any;
}

interface MDXLayoutRendererProps {
    layout: keyof typeof LAYOUTS;
    mdxSource: string;
    [key: string]: any;
}

const wrapper = ({ layout, ...rest }: MDXWrapperProps) => {
    const LayoutComponent = LAYOUTS[layout];
    return <LayoutComponent {...rest} />;
};

export const MDXComponents = {
    Image,
    a: Link as any,
    pre: Pre,
    wrapper,
};

export const MDXLayoutRenderer = ({
    layout,
    mdxSource,
    ...rest
}: MDXLayoutRendererProps) => {
    const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);
    return <MDXLayout layout={layout} components={MDXComponents} {...rest} />;
};
