import { runCommandAsync, runNxCommandAsync } from '@nrwl/nx-plugin/testing';

export function installDependencies(
  nxPlugin: string,
  extraInitOptions?: string
) {
  beforeEach(async () => {
    await runCommandAsync(`yarn add -D ${nxPlugin}`);
    await runNxCommandAsync(
      `generate ${nxPlugin}:init ${extraInitOptions || ''}`
    );
  }, 120000);
}
