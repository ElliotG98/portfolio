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
