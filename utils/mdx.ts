import { bundleMDX } from 'mdx-bundler';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';
import getAllFilesRecursively from './file';

import remarkGfm from 'remark-gfm';
import remarkFootnotes from 'remark-footnotes';
import remarkMath from 'remark-math';
import remarkExtractFrontmatter from './remark-extract-frontmatter';
import remarkCodeTitles from './remark-code-title';
import remarkTocHeadings from './remark-toc-headings';
import remarkImgToJsx from './remark-img-to-jsx';

import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypeCitation from 'rehype-citation';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypePresetMinify from 'rehype-preset-minify';

const root = process.cwd();

function getFilePath(folder: string, fileName: string): string {
    return path.join(root, 'data', folder, fileName);
}

export function getFiles(type: string): string[] {
    const prefixPaths = path.join(root, 'data', type);
    const files = getAllFilesRecursively(prefixPaths);
    return files.map((file: any) =>
        file.slice(prefixPaths.length + 1).replace(/\\/g, '/'),
    );
}

export function formatSlug(slug: string): string {
    return slug.replace(/\.(mdx|md)/, '');
}

export function dateSortDesc(a: string, b: string): number {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
}

export async function getFileBySlug(type: string, slug: string) {
    const mdxPath = getFilePath(type, `${slug}.mdx`);
    const mdPath = getFilePath(type, `${slug}.md`);
    const sourcePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
    const source = fs.readFileSync(sourcePath, 'utf8');

    process.env.ESBUILD_BINARY_PATH = path.join(
        root,
        'node_modules',
        'esbuild',
        process.platform === 'win32' ? 'esbuild.exe' : 'bin/esbuild',
    );

    let toc: any[] = [];

    const { code, frontmatter } = await bundleMDX({
        source,
        cwd: path.join(root, 'components'),
        mdxOptions(options: any) {
            options.remarkPlugins = [
                ...(options.remarkPlugins ?? []),
                remarkExtractFrontmatter,
                [remarkTocHeadings, { exportRef: toc }],
                remarkGfm,
                remarkCodeTitles,
                [remarkFootnotes, { inlineNotes: true }],
                remarkMath,
                remarkImgToJsx,
            ];
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? []),
                rehypeSlug,
                rehypeAutolinkHeadings,
                rehypeKatex,
                [rehypeCitation, { path: path.join(root, 'data') }],
                [rehypePrismPlus, { ignoreMissing: true }],
                rehypePresetMinify,
            ];
            return options;
        },
        esbuildOptions: (options: any) => {
            options.loader = {
                ...options.loader,
                '.js': 'jsx',
            };
            return options;
        },
    });

    return {
        mdxSource: code,
        toc,
        frontMatter: {
            readingTime: readingTime(code),
            slug: slug || null,
            fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
            ...frontmatter,
            date: frontmatter.date
                ? new Date(frontmatter.date).toISOString()
                : null,
        },
    };
}

export async function getAllFiles(folder: string) {
    const prefixPaths = getFilePath(folder, '');

    const files = getAllFilesRecursively(prefixPaths);
    const allFrontMatter: any[] = [];

    files.forEach((file: any) => {
        const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/');
        if (!['.md', '.mdx'].includes(path.extname(fileName))) return;
        const source = fs.readFileSync(file, 'utf8');
        const { data: frontmatter } = matter(source);
        if (frontmatter.draft !== true) {
            allFrontMatter.push({
                ...frontmatter,
                slug: formatSlug(fileName),
                date: frontmatter.date
                    ? new Date(frontmatter.date).toISOString()
                    : null,
            });
        }
    });

    return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date));
}
