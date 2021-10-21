import { checkFilesExist, runNxCommandAsync } from '@nrwl/nx-plugin/testing';

import {
  initNgxDeployNPMProject,
  installNgxDeployNPMProject,
} from './utils-ngx-deploy-npm';
import { installDependencies } from './install-deps';
import { generateLib } from './generate-lib';

export function basicSetTestForLibs(
  libName: string,
  nxPlugin: string,
  extraOptions?: {
    init?: string;
    libGenerator?: string;
  }
) {
  initNgxDeployNPMProject();
  installDependencies(nxPlugin, extraOptions?.init);

  generateLib(nxPlugin, libName, extraOptions?.libGenerator);

  // Install the project
  installNgxDeployNPMProject();

  it('should publish the lib', done => {
    expect(async () => {
      await runNxCommandAsync(`deploy ${libName} --dry-run`);
      done();
    }).not.toThrow();
  }, 120000);
}
