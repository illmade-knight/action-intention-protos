import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        // This tells Vitest that the project root is one level up from this
        // config file. This helps it correctly resolve paths.
        root: '.',

        // THE FIX: The include pattern must use the correct relative path
        // from this config file's location (./npm) to the test file.
        include: ['../gen/ts/real/structure.test.ts'],
    },
});
