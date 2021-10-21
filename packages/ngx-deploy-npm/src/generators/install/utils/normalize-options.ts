import type { InstallGeneratorOptions } from '../schema';

export function normalizeOptions(
  options: InstallGeneratorOptions
): InstallGeneratorOptions {
  return {
    ...options,
  };
}
