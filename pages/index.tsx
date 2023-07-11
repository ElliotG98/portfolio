import HomeHero from '@components/HomeHero';
import { PageSeo } from '@components/Seo';
import metaData from '@data/metaData';
import '@styles/home.module.css';

export default function Home() {
    return (
        <>
            <PageSeo
                title={metaData.title}
                description={metaData.description}
            />

            <HomeHero />
        </>
    );
}
