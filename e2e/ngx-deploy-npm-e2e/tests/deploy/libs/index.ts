import { angularLibs } from './angular.test-factory';
import { nestLibs } from './nest.test-factory';
import { nodeLibs } from './node.test-factory';
import { reactLibs } from './react.test-factory';
import { nxPlugins } from './nx-plugin.test-factory';

export const libTest = () => {
  describe('Basic deploy test for Angular Libs', angularLibs);
  describe('Basic deploy test for Nest Libs', nestLibs);
  describe('Basic deploy test for Node Libs', nodeLibs);
  describe('Basic deploy test for React Libs', reactLibs);
  describe('Basic deploy test for Nx Plugins', nxPlugins);
};
