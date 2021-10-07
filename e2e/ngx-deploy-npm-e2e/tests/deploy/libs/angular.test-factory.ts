import { basicSetTestForLibs } from '../../utils/lib-test-set';

export const angularLibs = () => {
  const libName = 'angular-lib';
  const nxPlugin = '@nrwl/angular';

  basicSetTestForLibs(libName, nxPlugin, {
    init: '--style css',
  });
};
