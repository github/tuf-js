import util from 'util';
import { isStringRecord } from '../utils/guard';
import * as signer from '../utils/signer';
import { JSONObject, JSONValue } from '../utils/type';
import { Signable } from './base';

export interface KeyOptions {
  keyID: string;
  keyType: string;
  scheme: string;
  keyVal: Record<string, string>;
  unrecognizedFields?: Record<string, JSONValue>;
}

export class Key {
  readonly keyID: string;
  readonly keyType: string;
  readonly scheme: string;
  readonly keyVal: Record<string, string>;
  readonly unrecognizedFields?: Record<string, JSONValue>;

  constructor(options: KeyOptions) {
    const { keyID, keyType, scheme, keyVal, unrecognizedFields } = options;

    this.keyID = keyID;
    this.keyType = keyType;
    this.scheme = scheme;
    this.keyVal = keyVal;
    this.unrecognizedFields = unrecognizedFields || {};
  }

  // Verifies the that the metadata.signatures contains a signature made with
  // this key and is correctly signed.
  public verifySignature(metadata: Signable) {
    const signature = metadata?.signatures?.[this.keyID]?.sig;
    if (!signature) throw new Error('No signature for key found in metadata');

    const publicKey = this.keyVal?.public;
    if (!publicKey) throw new Error('No spublic key found');

    const signedData = metadata?.signed.toJSON();
    if (!signedData) throw new Error('No signed data found in metadata');

    try {
      // TODO: implmeent verifysignature func
      const verifySignature = signer.verifySignature(
        this.keyType,
        signedData,
        signature,
        publicKey
      );
      if (!verifySignature) {
        throw new Error('Failed to verify signature');
      }
    } catch (error) {
      throw new Error('Failed to verify signature');
    }
  }

  public equals(other: Key): boolean {
    if (!(other instanceof Key)) {
      return false;
    }

    return (
      this.keyID === other.keyID &&
      this.keyType === other.keyType &&
      this.scheme === other.scheme &&
      util.isDeepStrictEqual(this.keyVal, other.keyVal) &&
      util.isDeepStrictEqual(this.unrecognizedFields, other.unrecognizedFields)
    );
  }

  public toJSON(): JSONObject {
    return {
      keytype: this.keyType,
      scheme: this.scheme,
      keyval: this.keyVal,
      ...this.unrecognizedFields,
    };
  }

  public static fromJSON(keyID: string, data: JSONObject): Key {
    const { keytype, scheme, keyval, ...rest } = data;

    if (typeof keytype !== 'string') {
      throw new TypeError('keytype must be a string');
    }

    if (typeof scheme !== 'string') {
      throw new TypeError('scheme must be a string');
    }

    if (!isStringRecord(keyval)) {
      throw new TypeError('keyval must be a string record');
    }

    return new Key({
      keyID,
      keyType: keytype,
      scheme,
      keyVal: keyval,
      unrecognizedFields: rest,
    });
  }
}
