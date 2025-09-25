import { describe, it, expect } from 'vitest';

// This test is designed to run *after* the build and packaging script is complete.
// Its purpose is to verify that the final, flattened directory structure is correct
// and that the "real" idiomatic TS files can successfully import the generated proto files.

// 1. Import a "real" TS entity.
import { URN, mirrorTest } from './envelope.js';

// 2. Import a generated proto directly to be certain the pathing works.
// we keep this here because it fails directly if the import path is corrupted
import { SecureEnvelopePb } from './secure-envelope_pb.js';

describe('Package Structure Verification Test', () => {

    it('should successfully import modules from the final flattened structure', () => {
        // This test's primary purpose is to ensure that the module imports above
        // do not crash the test runner. If this code executes, it means:
        // 1. This test file and `envelope.ts` were correctly copied to `gen/ts/real`.
        // 2. The `secure-envelope_pb.ts` file was correctly generated and moved
        //    to the flattened `gen/ts/proto` directory.
        // 3. The relative import path '../proto/secure-envelope_pb.js' works as expected.

        // Trivial assertions to confirm the imports are not undefined.
        expect(URN).toBeDefined();
        const env = mirrorTest()
        expect(env).toBeDefined();

        console.log('✅ [Verification Test] Package structure is valid. Imports resolved successfully.');
    });

});

