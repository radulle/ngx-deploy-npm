import { DeployExecutorOptions } from '../schema';

export type NpmPublishOptions = Pick<
  DeployExecutorOptions,
  'access' | 'tag' | 'otp' | 'dryRun'
>;

export interface BuildTarget {
  name: string;
  options?: Record<string, unknown>;
}
