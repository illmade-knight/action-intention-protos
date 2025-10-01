import {create} from "@bufbuild/protobuf";
import {ContactPb, ContactPbSchema} from "./user_pb.js";

export interface Contact {
    id: string
    alias: string
    email: string
}

export function contactToProto(contact: Contact): ContactPb {
    return create(ContactPbSchema, {
        id: contact.id,
        alias: contact.alias,
        email: contact.email,
    });
}

export function contactFromProto(protoContact: ContactPb): Contact {
    return {
        id: protoContact.id,
        alias: protoContact.alias,
        email: protoContact.email,
    };
}
