import util from 'util';
import { isDefined } from '../utils/guard';
import { ValueError } from './error';
import { Signature } from './signature';
import { JSONObject, JSONValue } from './types';

const SPECIFICATION_VERSION = ['1', '20', '30'];

export interface Signable {
  signatures: Record<string, Signature>;
  signed: Signed;
}

export interface SignedOptions {
  version?: number;
  specVersion?: string;
  expires?: string;
  unrecognizedFields?: Record<string, JSONValue>;
}

export abstract class Signed {
  readonly specVersion: string;
  readonly expires: string;
  readonly version: number;
  readonly unrecognizedFields: Record<string, JSONValue>;

  constructor(options: SignedOptions) {
    this.specVersion = options.specVersion || SPECIFICATION_VERSION.join('.');

    const specList = this.specVersion.split('.');
    if (
      !(specList.length === 2 || specList.length === 3) ||
      !specList.every((item) => isNumeric(item))
    ) {
      throw new ValueError('Failed to parse specVersion');
    }

    // major version must match
    if (specList[0] != SPECIFICATION_VERSION[0]) {
      throw new ValueError('Unsupported specVersion');
    }

    this.expires = options.expires || new Date().toISOString();
    this.version = options.version || 1;
    this.unrecognizedFields = options.unrecognizedFields || {};
  }

  public equals(other: Signed): boolean {
    if (!(other instanceof Signed)) {
      return false;
    }

    return (
      this.specVersion === other.specVersion &&
      this.expires === other.expires &&
      this.version === other.version &&
      util.isDeepStrictEqual(this.unrecognizedFields, other.unrecognizedFields)
    );
  }

  public isExpired(referenceTime?: Date): boolean {
    if (!referenceTime) {
      referenceTime = new Date();
    }
    return referenceTime >= new Date(this.expires);
  }

  public static commonFieldsFromJSON(data: JSONObject): SignedOptions {
    const { spec_version, expires, version, ...rest } = data;

    if (isDefined(spec_version) && !(typeof spec_version === 'string')) {
      throw new TypeError('spec_version must be a string');
    }

    if (isDefined(expires) && !(typeof expires === 'string')) {
      throw new TypeError('expires must be a string');
    }

    if (isDefined(version) && !(typeof version === 'number')) {
      throw new TypeError('version must be a number');
    }

    return {
      specVersion: spec_version,
      expires,
      version,
      unrecognizedFields: rest,
    };
  }

  abstract toJSON(): JSONObject;
}

function isNumeric(str: string): boolean {
  return !isNaN(Number(str));
}