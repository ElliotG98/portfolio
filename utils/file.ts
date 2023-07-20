import fs from 'fs';
import path from 'path';

const getAllFilesRecursively = (folder: string): string[] => {
    const entries = fs
        .readdirSync(folder)
        .map((entry) => path.join(folder, entry));

    const files = entries.filter((entry) => fs.statSync(entry).isFile());
    const directories = entries.filter((entry) => !fs.statSync(entry).isFile());

    return [
        ...files,
        ...directories.flatMap((dir) => getAllFilesRecursively(dir)),
    ];
};

export default getAllFilesRecursively;
