import {
  checkFilesExist,
  readJson,
  runNxCommandAsync,
} from '@nrwl/nx-plugin/testing';

import {
  generateLib,
  initNgxDeployNPMProject,
  installDependencies,
  installNgxDeployNPMProject,
} from '../utils';

export const buildTest = () => {
  const publisableLib = 'basic-lib';
  const nxPlugin = '@nrwl/node';

  initNgxDeployNPMProject();
  installDependencies(nxPlugin);

  generateLib(nxPlugin, publisableLib);

  // Install the project
  installNgxDeployNPMProject();

  it('should build the lib', async () => {
    await runNxCommandAsync(`deploy ${publisableLib} --dry-run`);

    expect(() =>
      checkFilesExist(`dist/libs/${publisableLib}/package.json`)
    ).not.toThrow();
  }, 120000);
};
