import { ensureNxProject, runNxCommandAsync } from '@nrwl/nx-plugin/testing';

export function initNgxDeployNPMProject() {
  // Init project
  beforeEach(async () => {
    ensureNxProject('ngx-deploy-npm', 'dist/packages/ngx-deploy-npm');

    await runNxCommandAsync('generate ngx-deploy-npm:init');
  }, 120000);
}

export function installNgxDeployNPMProject() {
  beforeEach(async () => {
    await runNxCommandAsync('generate ngx-deploy-npm:install');
  }, 5000);
}
