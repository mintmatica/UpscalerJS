import fs from 'fs';
import { copySync } from 'fs-extra';
import path from 'path';
import { getAllAvailableModelPackages } from '../../../scripts/package-scripts/utils/getAllAvailableModels';

const ROOT = path.resolve(__dirname, '../../../');
const MODELS = path.resolve(ROOT, 'models');
const FIXTURES = path.resolve(ROOT, 'test/__fixtures__');
interface CopyFixtureOpts {
  includeFixtures?: boolean;
  includeModels?: boolean;
}

export const copyFixtures = (dist: string, { includeFixtures = true, includeModels = false }: CopyFixtureOpts = {} ) => {
  fs.mkdirSync(path.join(dist, 'pixelator'), { recursive: true });
  fs.copyFileSync(path.join(FIXTURES, 'pixelator/pixelator.json'), path.join(dist, 'pixelator/pixelator.json'))
  fs.copyFileSync(path.join(FIXTURES, 'pixelator/pixelator.weights.bin'), path.join(dist, 'pixelator/pixelator.weights.bin'))
  if (includeFixtures) {
    fs.copyFileSync(path.join(FIXTURES, 'flower-small.png'), path.join(dist, 'flower-small.png'))
  }
  if (includeModels) {
    getAllAvailableModelPackages().map(packageName => {
      const srcDir = path.resolve(MODELS, packageName, 'models');
      const destDir = path.resolve(dist, 'models', packageName, 'models');
      copySync(srcDir, destDir, { overwrite: true });
    });
  }
};
