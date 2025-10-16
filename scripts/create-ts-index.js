// scripts/create-ts-index.js
// This script generates a barrel file (index.ts) that exports all non-test .ts files
// from the generated 'gen/ts' directory.

import { promises as fs } from 'fs';
import path from 'path';

const rootDir = path.join(process.cwd(), 'gen', 'ts');
const outputFile = path.join(rootDir, 'index.ts');

/**
 * Recursively finds all TypeScript files in a directory, excluding test files.
 * @param {string} dir - The directory to search.
 * @returns {Promise<string[]>} A list of file paths.
 */
async function findTsFiles(dir) {
    let files = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files = files.concat(await findTsFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.ts') && !entry.name.endsWith('.test.ts')) {
            // ✅ KEY FIX: This condition ensures test files are never included.
            files.push(fullPath);
        }
    }
    return files;
}

async function main() {
    try {
        console.log(`Starting to scan for .ts files in ${rootDir}...`);
        const allFiles = await findTsFiles(rootDir);

        const exports = allFiles
            .filter(file => file !== outputFile) // Don't let the index file export itself.
            .map(file => {
                // Create a relative path from the root directory (gen/ts).
                const relativePath = path.relative(rootDir, file)
                    // For ESM compatibility, import paths must use forward slashes.
                    .replace(/\\/g, '/')
                    // Per your buf.gen.yaml, TypeScript output will have a .js extension.
                    .replace(/\.ts$/, '.js');
                return `export * from './${relativePath}';`;
            });

        const content = `// This is an auto-generated file. Do not edit.\n\n${exports.join('\n')}\n`;

        await fs.writeFile(outputFile, content);
        console.log(`✅ Successfully created index.ts with ${exports.length} exports.`);

    } catch (error) {
        console.error('❌ Failed to create index.ts:', error);
        process.exit(1);
    }
}

main();