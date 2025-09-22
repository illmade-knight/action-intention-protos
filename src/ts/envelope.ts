import {create} from "@bufbuild/protobuf";
import {SecureEnvelopePb, SecureEnvelopePbSchema} from "../proto/secure-envelope_pb.js";

export interface SecureEnvelope {
    senderId: URN
    recipientId: URN
    messageId: string
    encryptedSymmetricKey: Uint8Array
    encryptedData: Uint8Array
    signature: Uint8Array
}

export function secureEnvelopeToProto(envelope: SecureEnvelope): SecureEnvelopePb {
    return create(SecureEnvelopePbSchema, {
        senderId: envelope.senderId.toString(),
        recipientId: envelope.recipientId.toString(),
        messageId: envelope.messageId,
        encryptedSymmetricKey: envelope.encryptedSymmetricKey,
        encryptedData: envelope.encryptedData,
        signature: envelope.signature,
    });
}

function base64ToBytes(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

export function secureEnvelopeFromProto(protoEnvelope: SecureEnvelopePb): SecureEnvelope {
    return {
        senderId: URN.parse(protoEnvelope.senderId),
        recipientId: URN.parse(protoEnvelope.recipientId),
        messageId: protoEnvelope.messageId,
        // Convert Base64 strings to Uint8Array here
        encryptedSymmetricKey: base64ToBytes(protoEnvelope.encryptedSymmetricKey as unknown as string),
        encryptedData: base64ToBytes(protoEnvelope.encryptedData as unknown as string),
        signature: protoEnvelope.signature, // Assuming signature is already a byte array
    };
}

/**
 * Represents a parsed, validated Uniform Resource Name (URN).
 * Instances should always be created via the static `create` or `parse` methods.
 */
export class URN {
    private static readonly SCHEME = 'urn';
    private static readonly NAMESPACE = 'sm'; // Secure Messaging
    private static readonly DELIMITER = ':';

    // --- Public, readonly properties ---
    public readonly namespace: string;
    public readonly entityType: string;
    public readonly entityId: string;
    /**
     * Creates a new URN with the 'sm' namespace.
     * @param entityType The type of the entity (e.g., "user").
     * @param entityId The unique identifier for the entity.
     * @throws {Error} if entityType or entityId are empty.
     */
    public static create(entityType: string, entityId: string): URN {
        if (!entityType) {
            throw new Error('Invalid URN format: entityType cannot be empty');
        }
        if (!entityId) {
            throw new Error('Invalid URN format: entityId cannot be empty');
        }
        return new URN(URN.NAMESPACE, entityType, entityId);
    }

    /**
     * Parses a raw string into a structured URN, validating its format.
     * @param s The URN string to parse (e.g., "urn:sm:user:alice").
     * @throws {Error} if the string format is invalid.
     */
    public static parse(s: string): URN {
        const parts = s.split(URN.DELIMITER);
        if (parts.length !== 4) {
            throw new Error(`Invalid URN format: expected 4 parts, but got ${parts.length}`);
        }
        if (parts[0] !== URN.SCHEME) {
            throw new Error(`Invalid URN format: invalid scheme '${parts[0]}', expected '${URN.SCHEME}'`);
        }
        // Delegate final validation to the constructor via create()
        return URN.create(parts[2], parts[3]);
    }

    private constructor(namespace: string, entityType: string, entityId: string) {
        this.namespace = namespace;
        this.entityType = entityType;
        this.entityId = entityId;
    }

    /**
     * Reassembles the URN into its canonical string representation.
     */
    public toString(): string {
        return [URN.SCHEME, this.namespace, this.entityType, this.entityId].join(URN.DELIMITER);
    }

    /**
     * Provides the value to be used by JSON.stringify.
     */
    public toJSON(): string {
        return this.toString();
    }
}