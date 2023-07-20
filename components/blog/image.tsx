import NextImage from 'next/image';
import { ImageProps } from 'next/image';

const Image = ({ src, width, height, alt, ...rest }: ImageProps) => (
    <NextImage src={src} width={width} height={height} alt={alt} {...rest} />
);

export default Image;
