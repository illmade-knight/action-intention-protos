# **Action/Intention Protobuf Schemas**

This repository is the **single source of truth** for the Protobuf data schemas used across the Action/Intention microservices ecosystem. It automatically generates and publishes versioned client libraries for Go and TypeScript.

## **Core Technologies**

* **Protobuf**: The Interface Definition Language (IDL) for our data structures.
* **Buf**: Used for linting, breaking change detection, and code generation.
* **TypeScript & Go**: The target languages for our generated clients.
* **GitHub Actions**: Powers the CI/CD and release automation.
* **Semantic Release**: Automates versioning and package publishing based on commit messages.

---

## **How It Works: The Release Pipeline**

The repository uses a dual-workflow system to publish packages for npm and Go.

1. **NPM (TypeScript) Release**:
    * A push to the main branch triggers the Release and Publish npm Package workflow.
    * semantic-release analyzes the commit messages to determine the next version number.
    * It runs buf generate to build the latest TypeScript files.
    * It publishes the generated package to the npm registry.
    * Finally, it creates a versioned Git tag (e.g., v1.0.6) and a GitHub Release.
2. **Go Module Release**:
    * The creation of a new Git tag (e.g., v1.0.6) by the npm workflow triggers the Publish Go Module workflow.
    * This workflow checks out the code *at that specific tag* and a separate Go module repository.
    * It generates the Go code and pushes it to the dedicated Go repository, making the new version available.

---

## **Versioning and Releasing**

Releases are **fully automated**. You do not need to manually set version numbers or create tags. To control the version, you must use the **Conventional Commits** specification in your commit messages.

| Commit Type | Version Bump | Example Commit Message |
| :---- | :---- | :---- |
| fix: | **Patch** (e.g., 1.0.5 → 1.0.6) | fix: correct signature validation logic in envelope |
| feat: | **Minor** (e.g., 1.0.5 → 1.1.0) | feat: add profile picture URL to user model |
| ... BREAKING CHANGE: | **Major** (e.g., 1.0.5 → 2.0.0) | refactor\!: rename sender\_id to sender\_urn |

### **Example: Bumping to Version 1.0.6**

The current version is 1.0.5. To trigger a patch release that creates version 1.0.6 for both the npm and Go packages, you would make a commit with the fix: prefix.

Bash

````bash
\# After staging your changes to the .proto files...  
git commit \-m "fix: add missing validation for recipient\_id in SecureEnvelope"

\# Now, push to the main branch  
git push origin main
````

This will automatically trigger the entire release pipeline.

---

## **Local Development**

1. Clone the repository.
2. Install dependencies: npm install
3. Make any desired changes to the .proto files.
4. To generate the code locally and see your changes, run:  
   Bash  
   npm run generate

---

## **Consuming the Packages**

### **TypeScript (from npm)**

Bash
````bash
npm install @illmade-knight/action-intention-protos
````

TypeScript
````typescript
import { ContactPb, SecureEnvelopePb } from '@illmade-knight/action-intention-protos';
````

### **Go**


````bash
go get github.com/illmade-knight/go-action-intention-protos/gen/go/sm/v1
````

````go
import (  
  sm\_v1 "github.com/illmade-knight/go-action-intention-protos/gen/go/sm/v1"  
)  
````

