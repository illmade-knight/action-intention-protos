import {URN} from "./urn";
import {create} from "@bufbuild/protobuf";
import {SecureEnvelopePb, SecureEnvelopePbSchema} from "../proto/secure-envelope_pb";

export interface SecureEnvelope {
    senderId: URN
    recipientId: URN
    messageId: string
    encryptedSymmetricKey: Uint8Array
    encryptedData: Uint8Array
    signature: Uint8Array
}

export namespace S {
    function toProto(envelope: SecureEnvelope): SecureEnvelopePb {
        return create(SecureEnvelopePbSchema, {
            senderId: envelope.senderId.toString(),
            recipientId: envelope.recipientId.toString(),
            messageId: envelope.messageId,
            encryptedSymmetricKey: envelope.encryptedSymmetricKey,
            encryptedData: envelope.encryptedData,
            signature: envelope.signature,
        });
    }

    function fromProto(protoEnvelope: SecureEnvelopePb): SecureEnvelope {
        return {
            senderId: URN.parse(protoEnvelope.senderId),
            recipientId: URN.parse(protoEnvelope.recipientId),
            messageId: protoEnvelope.messageId,
            encryptedSymmetricKey: protoEnvelope.encryptedSymmetricKey,
            encryptedData: protoEnvelope.encryptedData,
            signature: protoEnvelope.signature,
        };
    }
}
