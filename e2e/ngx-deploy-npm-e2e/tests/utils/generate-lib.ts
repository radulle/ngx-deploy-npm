import { runNxCommandAsync } from '@nrwl/nx-plugin/testing';

export function generateLib(
  nxPlugin: string,
  libName: string,
  extraOptions?: string
) {
  beforeEach(async () => {
    await runNxCommandAsync(
      `generate ${nxPlugin}:lib --name ${libName} --publishable --importPath ${libName} ${
        extraOptions || ''
      }`
    );
  }, 120000);
}
