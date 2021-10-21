import { basicSetTestForLibs } from '../../utils/lib-test-set';

export const nestLibs = () => {
  const libName = 'nest-lib';
  const nxPlugin = '@nrwl/nest';

  basicSetTestForLibs(libName, nxPlugin);
};
