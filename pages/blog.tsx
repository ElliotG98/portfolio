import metaData from '@data/metaData';
import { PageSeo } from '@components/Seo';
import List from '@components/List';
import { getAllFiles } from '@utils/mdx';

export const POSTS_PER_PAGE = 5;

export interface BlogProps {
    props: {
        posts: any[];
        initialDisplayPosts: any[];
        pagination: any;
    };
}

export async function getStaticProps(): Promise<BlogProps> {
    const posts = await getAllFiles('blog');
    const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
    const pagination = {
        currentPage: 1,
        totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    };

    return { props: { initialDisplayPosts, posts, pagination } };
}

export default function Blog({
    posts,
    initialDisplayPosts,
    pagination,
}: BlogProps['props']) {
    return (
        <>
            <PageSeo
                title={`Blog - ${metaData.author}`}
                description={metaData.description}
            />

            <List
                posts={posts}
                initialDisplayPosts={initialDisplayPosts}
                pagination={pagination}
                title="All Posts"
            />
        </>
    );
}
