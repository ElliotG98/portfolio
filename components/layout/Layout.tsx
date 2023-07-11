import SectionContainer from '../SectionContainer';
import Footer from './Footer';
import Link from 'next/link';
import { ReactNode } from 'react';
import { metaData, headerNavLinks } from '@data/index';

type LayoutProps = { children?: ReactNode };

const Layout = ({ children }: LayoutProps) => {
    return (
        <SectionContainer>
            <div className="flex h-screen flex-col justify-between">
                <header className="flex items-center justify-between py-10">
                    <div>
                        <Link href="/" aria-label={metaData.headerTitle}>
                            <div className="flex items-center justify-between">
                                <div className="hidden h-6 text-2xl font-semibold sm:block">
                                    {metaData.headerTitle}
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="flex items-center text-base leading-5">
                        <div className="hidden sm:block">
                            {headerNavLinks.map((link) => (
                                <Link
                                    key={link.title}
                                    href={link.href}
                                    className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </header>
                <main className="mb-auto">{children}</main>
                <Footer />
            </div>
        </SectionContainer>
    );
};

export default Layout;
