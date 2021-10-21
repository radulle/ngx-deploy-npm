import { ProjectConfiguration, TargetConfiguration } from '@nrwl/devkit';
import { readJson, runNxCommandAsync } from '@nrwl/nx-plugin/testing';

import { DeployExecutorOptions } from '../../../packages/ngx-deploy-npm/src/executors/deploy/schema';
import { npmAccess } from '../../../packages/ngx-deploy-npm/src/core';
import {
  initNgxDeployNPMProject,
  installDependencies,
  installNgxDeployNPMProject,
} from './utils';

export const installTest = () => {
  let projectWorkSpace: ProjectConfiguration;

  let publisableLib: string;

  initNgxDeployNPMProject();
  installDependencies('@nrwl/node');

  // Init libs and projects
  beforeEach(async () => {
    publisableLib = 'node-lib';

    await runNxCommandAsync(
      `generate @nrwl/node:lib --name ${publisableLib} --publishable --importPath fake-team`
    );
  }, 120000);

  installNgxDeployNPMProject();

  beforeEach(() => {
    projectWorkSpace = readJson(`libs/${publisableLib}/project.json`);
  });

  it('should modify the workspace for publishable libs', () => {
    const expectedTarget: TargetConfiguration = {
      executor: '@bikecoders/ngx-deploy-npm:deploy',
      options: {
        access: npmAccess.public,
      } as DeployExecutorOptions,
    };

    expect(projectWorkSpace.targets?.deploy).toEqual(expectedTarget);
  });
};
