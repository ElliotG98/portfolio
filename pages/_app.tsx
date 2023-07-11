import type { AppProps } from 'next/app';
import '@styles/globals.css';
import Layout from '@components/layout/Layout';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Head>
                <meta
                    content="width=device-width, initial-scale=1"
                    name="viewport"
                />
            </Head>
            <Component {...pageProps} />
        </Layout>
    );
}
