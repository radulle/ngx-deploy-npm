import type { GeneratorCallback, Tree } from '@nrwl/devkit';
import { addDependenciesToPackageJson } from '@nrwl/devkit';

export function addDependencies(tree: Tree): GeneratorCallback {
  return addDependenciesToPackageJson(tree, {}, {});
}
