import PageTitle from '@components/blog/PageTitle';
import { MDXLayoutRenderer } from '@components/blog/MDXComponent';
import { formatSlug, getAllFiles, getFileBySlug, getFiles } from '@utils/mdx';

const DEFAULT_LAYOUT = 'PostLayout';

export async function getStaticPaths() {
    const posts = getFiles('blog');
    return {
        paths: posts.map((p) => ({
            params: {
                slug: formatSlug(p).split('/'),
            },
        })),
        fallback: false,
    };
}

export async function getStaticProps({ params }: any) {
    const allPosts = await getAllFiles('blog');
    const postIndex = allPosts.findIndex(
        (post) => formatSlug(post.slug) === params.slug.join('/'),
    );
    const prev = allPosts[postIndex + 1] || null;
    const next = allPosts[postIndex - 1] || null;
    const post = await getFileBySlug('blog', params.slug.join('/'));
    const authorList = ['default'];
    const authorPromise = authorList.map(async (author) => {
        const authorResults = await getFileBySlug('authors', author);
        return authorResults.frontMatter;
    });
    const authorDetails = await Promise.all(authorPromise);

    return { props: { post, authorDetails, prev, next } };
}

export default function Blog({
    post,
    authorDetails,
    prev,
    next,
}: {
    post: any;
    authorDetails: any;
    prev: any;
    next: any;
}) {
    const { mdxSource, frontMatter } = post;

    return (
        <>
            {frontMatter.draft !== true ? (
                <MDXLayoutRenderer
                    layout="post"
                    mdxSource={mdxSource}
                    frontMatter={frontMatter}
                    authorDetails={authorDetails}
                    prev={prev}
                    next={next}
                />
            ) : (
                <div className="mt-24 text-center">
                    <PageTitle>
                        Under Construction{' '}
                        <span role="img" aria-label="roadwork sign">
                            🚧
                        </span>
                    </PageTitle>
                </div>
            )}
        </>
    );
}
