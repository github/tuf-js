import fs from 'fs';
import path from 'path';

export const targetsJson = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../../../repository_data/metadata/targets.json'),
    'utf-8'
  )
);

export const role1Json = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../../../repository_data/metadata/role1.json'),
    'utf-8'
  )
);