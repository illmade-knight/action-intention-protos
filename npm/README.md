# **Action/Intention Protobuf Models (TypeScript)**

This package contains the auto-generated TypeScript models for the Action/Intention microservices ecosystem. The data contracts are defined using Protocol Buffers, and the code in this package is generated from those definitions.

**This is a generated package. Do not edit the files directly.** Changes should be made in the action-intention-protos source repository.

## **Installation**

npm install @your-npm-username/action-intention-protos

## **Usage**

You can import any of the shared data models directly from the package root.

import {  
AuthenticatedUser,  
AddressBookContact,  
SecureEnvelope  
} from '@your-npm-username/action-intention-protos';

// Example usage:  
const user: AuthenticatedUser \= {  
id: 'user-123',  
alias: 'Test User',  
email: 'test@example.com'  
};  
