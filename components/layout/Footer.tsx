import Link from 'next/link';
import { metaData } from '@data/index';
import SocialIcon from '@components/socialIcons';

export default function Footer() {
    return (
        <footer>
            <div className="mt-16 flex flex-col items-center">
                <div className="mb-3 flex space-x-4">
                    <SocialIcon
                        kind="mail"
                        href={`mailto:${metaData.email}`}
                        alt="Send me an email"
                    />
                    <SocialIcon
                        kind="github"
                        href={metaData.github}
                        alt="Look at my code"
                    />
                </div>
                <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <div>{metaData.author}</div>
                    <div>{` • `}</div>
                    <div>{`© ${new Date().getFullYear()}`}</div>
                    <div>{` • `}</div>
                    <Link href="/">{metaData.title}</Link>
                </div>
            </div>
        </footer>
    );
}
