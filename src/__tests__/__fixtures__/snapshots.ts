import fs from 'fs';
import path from 'path';

export const rawSnapshotJson = fs.readFileSync(
  path.resolve(__dirname, '../../../repository_data/metadata/snapshot.json'),
  'utf8'
);

export const snapshotJson = JSON.parse(rawSnapshotJson);
