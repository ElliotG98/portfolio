import Image from 'next/image';
import Mail from './mail.svg';
import Github from './github.svg';

// Icons taken from: https://simpleicons.org/

const components = {
    mail: Mail,
    github: Github,
};

type IconKind = keyof typeof components;

type SocialIconProps = {
    kind: IconKind;
    href: string;
    alt?: string;
};

const SocialIcon = ({ kind, href, alt = '' }: SocialIconProps) => {
    if (
        !href ||
        (kind === 'mail' &&
            !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))
    ) {
        return null;
    }

    const SocialSvg = components[kind];

    return (
        <a
            className="text-sm text-gray-500 transition hover:text-gray-600"
            target="_blank"
            rel="noopener noreferrer"
            href={href}
        >
            <span className="sr-only">{kind}</span>
            <Image
                priority
                src={SocialSvg}
                alt={alt}
                height={24}
                width={24}
            ></Image>
        </a>
    );
};

export default SocialIcon;
