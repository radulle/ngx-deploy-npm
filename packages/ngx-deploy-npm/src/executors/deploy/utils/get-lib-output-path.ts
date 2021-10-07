import * as path from 'path';

import { readFileAsync } from './fs-async';

type IBuildOptions = {
  project?: string;
  outputPath?: string;
};

export async function getLibOutPutPath(
  projectRoot: string,
  buildOptions: IBuildOptions,
  libName: string
): Promise<string> {
  if (buildOptions.outputPath) {
    return withOutputPath();
  } else {
    return withoutOutputPath();
  }

  function withOutputPath() {
    if (
      !buildOptions.outputPath ||
      typeof buildOptions.outputPath !== 'string'
    ) {
      throw new Error(
        `Cannot read the project output path option of the library '${libName}' in the workspace`
      );
    }

    return path.join(projectRoot, buildOptions.outputPath);
  }

  async function withoutOutputPath() {
    if (!buildOptions.project || typeof buildOptions.project !== 'string') {
      throw new Error(
        `Cannot read the project path option of the library '${libName}' in the workspace`
      );
    }

    const ngPackagePath = path.join(projectRoot, buildOptions.project);

    let ngPackageContentStr: string;

    try {
      ngPackageContentStr = await readFileAsync(ngPackagePath, {
        encoding: 'utf8',
      });
    } catch (error) {
      throw new Error(`Error reading the ng-package.json`);
    }

    const ngPackageContent = JSON.parse(ngPackageContentStr);

    if (!ngPackageContent.dest || typeof ngPackageContent.dest !== 'string') {
      throw new Error(
        `Cannot read the project 'dest' option of the ng-package.json`
      );
    }

    const outputPath = path.join(
      path.dirname(ngPackagePath),
      ngPackageContent.dest
    );

    return outputPath;
  }
}
