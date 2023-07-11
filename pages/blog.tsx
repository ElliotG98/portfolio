import metaData from '@data/metaData';
import { PageSeo } from '@components/Seo';

export default function Blog() {
    return (
        <>
            <PageSeo
                title={`Blog - ${metaData.author}`}
                description={metaData.description}
            />

            <h1>Coming soon...</h1>
        </>
    );
}
