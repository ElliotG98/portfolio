import { PageSeo } from '@components/Seo';
import metaData from '@data/metaData';
import { getAllFiles } from '@utils/mdx';
import List from '@components/List';
import { POSTS_PER_PAGE, BlogProps } from '../../blog';

export async function getStaticPaths() {
    const totalPosts = await getAllFiles('blog');
    const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE);
    const paths = Array.from({ length: totalPages }, (_, i) => ({
        params: { page: (i + 1).toString() },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps(context: any) {
    const {
        params: { page },
    } = context;
    const posts = await getAllFiles('blog');
    const pageNumber = parseInt(page);
    const initialDisplayPosts = posts.slice(
        POSTS_PER_PAGE * (pageNumber - 1),
        POSTS_PER_PAGE * pageNumber,
    );
    const pagination = {
        currentPage: pageNumber,
        totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    };

    return {
        props: {
            posts,
            initialDisplayPosts,
            pagination,
        },
    };
}

const PostPage = ({
    posts,
    initialDisplayPosts,
    pagination,
}: BlogProps['props']) => {
    return (
        <>
            <PageSeo
                title={metaData.title}
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
};

export default PostPage;
