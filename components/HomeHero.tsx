import styles from '@styles/home.module.css';
import Link from 'next/link';

const HomeHero = () => {
    return (
        <div
            className={`flex flex-col items-center my-6 xl:flex-row gap-x-12 xl:mb-12 ${styles.homeHero}`}
        >
            <div className="pt-6">
                <h1 className="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                    Hi, I’m Elliot Glaze
                </h1>
                <h2 className="text-lg prose text-gray-600 dark:text-gray-400">
                    Welcome to my portfolio. I’m a software engineer and In my
                    free time, I like developing{' '}
                    <Link href="/projects">side projects</Link> and{' '}
                    <Link href="/blog">blogging</Link> about them. Have a good
                    read!
                </h2>
            </div>
        </div>
    );
};

export default HomeHero;
