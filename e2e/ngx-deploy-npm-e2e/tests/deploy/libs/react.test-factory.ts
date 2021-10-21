import { basicSetTestForLibs } from '../../utils/lib-test-set';

export const reactLibs = () => {
  const libName = 'react-lib';
  const nxPlugin = '@nrwl/react';

  basicSetTestForLibs(libName, nxPlugin, {
    libGenerator: '--style css',
  });
};
