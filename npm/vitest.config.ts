import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        // This tells Vitest that the project root is one level up from this
        // config file. This helps it correctly resolve paths.
        root: '.',

        include: ['../gen/ts/**/*.test.ts'],

        deps: {
            // Force Vitest to handle the Protobuf runtime dependencies
            // as inline modules to prevent common module loading failures.
            inline: [
                /@bufbuild\/protobuf/
            ],
            // Ensures correct handling of default exports
            interopDefault: true,
        },
    },
});
