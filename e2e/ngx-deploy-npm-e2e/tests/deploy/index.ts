import { buildTest } from './build.test-factory';
import { libTest } from './libs';

export const deployTest = () => {
  describe('Build e2e', buildTest);
  describe('Specific Library', libTest);
};
