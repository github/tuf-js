import util from 'util';
import { isDefined, isObjectRecord } from '../utils/guard';
import { JSONObject, JSONValue, MetadataKind } from '../utils/types';
import { Signed, SignedOptions } from './base';
import { MetaFile } from './file';

type MetaFileMap = Record<string, MetaFile>;

export interface SnapshotOptions extends SignedOptions {
  meta?: MetaFileMap;
}

/**
 * A container for the signed part of snapshot metadata.
 *
 * Snapshot contains information about all target Metadata files.
 * A top-level role that specifies the latest versions of all targets metadata files,
 * and hence the latest versions of all targets (including any dependencies between them) on the repository.
 */
export class Snapshot extends Signed {
  readonly type = MetadataKind.Snapshot;
  readonly meta: MetaFileMap;

  constructor(opts: SnapshotOptions) {
    super(opts);
    this.meta = opts.meta || { 'targets.json': new MetaFile({ version: 1 }) };
  }

  public equals(other: Snapshot): boolean {
    if (!(other instanceof Snapshot)) {
      return false;
    }

    return super.equals(other) && util.isDeepStrictEqual(this.meta, other.meta);
  }

  public toJSON(): JSONObject {
    return {
      meta: metaToJSON(this.meta),
      spec_version: this.specVersion,
      version: this.version,
      expires: this.expires,
      ...this.unrecognizedFields,
    };
  }

  public static fromJSON(data: JSONObject): Snapshot {
    const { unrecognizedFields, ...commonFields } =
      Signed.commonFieldsFromJSON(data);
    const { meta, ...rest } = unrecognizedFields as { meta: JSONObject };

    return new Snapshot({
      ...commonFields,
      meta: metaFromJSON(meta),
      unrecognizedFields: rest,
    });
  }
}

function metaToJSON(meta: MetaFileMap): JSONObject {
  return Object.entries(meta).reduce(
    (acc, [path, metadata]) => ({
      ...acc,
      [path]: metadata.toJSON(),
    }),
    {}
  );
}

function metaFromJSON(data: JSONValue): MetaFileMap | undefined {
  let meta;

  if (isDefined(data)) {
    if (!isObjectRecord(data)) {
      throw new TypeError('meta field is malformed');
    } else {
      meta = Object.entries(data).reduce<MetaFileMap>(
        (acc, [path, metadata]) => ({
          ...acc,
          [path]: MetaFile.fromJSON(metadata),
        }),
        {}
      );
    }

    return meta;
  }
}
