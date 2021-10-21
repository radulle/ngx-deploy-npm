import {
  getProjects,
  formatFiles,
  updateProjectConfiguration,
  ProjectConfiguration,
} from '@nrwl/devkit';
import type { Tree } from '@nrwl/devkit';

import type { InstallGeneratorOptions } from './schema';
import { npmAccess } from '../../core';
import { DeployExecutorOptions } from '../../executors/deploy/schema';

export default async function install(
  tree: Tree,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options: InstallGeneratorOptions
) {
  const libs = getBuildableLibraries(tree);

  // If there is no libraries to install throw an exception
  if (libs.size === 0) {
    throw new Error('There is no publishable libraries in this workspace');
  }

  Array.from(libs.entries()).forEach(([libKey, libConfig]) => {
    if (libConfig.targets) {
      const executorOptions: DeployExecutorOptions = {
        access: npmAccess.public,
        ...setUpProductionModeIfHasIt(libConfig),
      };

      libConfig.targets.deploy = {
        executor: '@bikecoders/ngx-deploy-npm:deploy',
        options: executorOptions,
      };

      updateProjectConfiguration(tree, libKey, libConfig);
    }
  });

  /* Supports Angular CLI workspace definition format, see https://github.com/nrwl/nx/discussions/6955#discussioncomment-1341893 */
  await formatFiles(tree);
}

/**
 * Get the libraries present in the workspace
 * @param workspace
 */
function getBuildableLibraries(tree: Tree): ReturnType<typeof getProjects> {
  const allProjects = getProjects(tree);

  Array.from(allProjects.entries())
    .filter(
      ([, project]) =>
        project.projectType !== 'library' || !project.targets?.build
    )
    .forEach(([key]) => allProjects.delete(key));

  return allProjects;
}

/**
 * Returns the configuration production if the library has a production mode on its build
 * @param lib The workspace of the library
 */
function setUpProductionModeIfHasIt(
  lib: ProjectConfiguration
): Pick<DeployExecutorOptions, 'buildTarget'> {
  return lib.targets?.build?.configurations?.production
    ? {
        buildTarget: 'production',
      }
    : {};
}
