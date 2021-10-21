import { basicSetTestForLibs } from '../../utils/lib-test-set';

export const nodeLibs = () => {
  const libName = 'node-lib';
  const nxPlugin = '@nrwl/node';

  basicSetTestForLibs(libName, nxPlugin);
};
