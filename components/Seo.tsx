import Head from 'next/head';
import { useRouter } from 'next/router';
import metaData from '@data/metaData';

type CommonSeoProps = {
    title: string;
    description: string;
};

const CommonSeo = ({ title, description }: CommonSeoProps) => {
    const router = useRouter();
    return (
        <Head>
            <title>{title}</title>
            <meta name="robots" content="follow, index" />
            <meta name="description" content={description} />
            <meta
                property="og:url"
                content={`${metaData.siteUrl}${router.asPath}`}
            />
            <meta property="og:type" content={'website'} />
            <meta property="og:site_name" content={metaData.title} />
            <meta property="og:description" content={description} />
            <meta property="og:title" content={title} />
        </Head>
    );
};

type PageSeoProps = {
    title: string;
    description: string;
};

export const PageSeo = ({ title, description }: PageSeoProps) => {
    return <CommonSeo title={title} description={description} />;
};

export const TagSEO = ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => {
    const router = useRouter();
    return (
        <>
            <CommonSeo title={title} description={description} />
            <Head>
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title={`${description} - RSS feed`}
                    href={`${metaData.siteUrl}${router.asPath}/feed.xml`}
                />
            </Head>
        </>
    );
};

export const BlogSEO = ({
    authorDetails,
    title,
    summary,
    date,
    lastmod,
    url,
}: {
    authorDetails: any;
    title: string;
    summary: string;
    date: string;
    lastmod: string;
    url: string;
}) => {
    const publishedAt = new Date(date).toISOString();
    const modifiedAt = new Date(lastmod || date).toISOString();

    let authorList;
    if (authorDetails) {
        authorList = authorDetails.map((author: any) => {
            return {
                '@type': 'Person',
                name: author.name,
            };
        });
    } else {
        authorList = {
            '@type': 'Person',
            name: metaData.author,
        };
    }

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
        headline: title,
        datePublished: publishedAt,
        dateModified: modifiedAt,
        author: authorList,
        publisher: {
            '@type': 'Organization',
            name: metaData.author,
            // logo: {
            //     '@type': 'ImageObject',
            //     url: `${metaData.siteUrl}${metaData.siteLogo}`,
            // },
        },
        description: summary,
    };

    return (
        <>
            <CommonSeo title={title} description={summary} />
            <Head>
                {date && (
                    <meta
                        property="article:published_time"
                        content={publishedAt}
                    />
                )}
                {lastmod && (
                    <meta
                        property="article:modified_time"
                        content={modifiedAt}
                    />
                )}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData, null, 2),
                    }}
                />
            </Head>
        </>
    );
};
