import {
  BuilderContext,
  Target,
  targetFromTargetString
} from '@angular-devkit/architect';
import { logging } from '@angular-devkit/core';

import * as path from 'path';

import { Schema } from './schema';
import { readFileAsync } from '../utils';
import { BuildTarget } from 'interfaces';

export default async function deploy(
  engine: {
    run: (
      dir: string,
      options: Schema,
      logger: logging.LoggerApi
    ) => Promise<void>;
  },
  context: BuilderContext,
  buildTarget: BuildTarget,
  options: Schema
) {
  if (options.noBuild) {
    context.logger.info(`📦 Skipping build`);
  } else {
    if (!context.target) {
      throw new Error('Cannot execute the build target');
    }

    const configuration = options.configuration;

    context.logger.info(
      `📦 Building "${context.target.project}". ${
        configuration ? `Configuration "${configuration}"` : ''
      }`
    );

    const target = {
      target: 'build',
      project: context.target.project
    } as Target;

    // Set the configuration if set on the options
    if (configuration) {
      target.configuration = configuration;
    }

    const build = await context.scheduleTarget(target);
    await build.result;
  }

  const targetFromStr = targetFromTargetString(buildTarget.name);
  const buildOptions = await context.getTargetOptions(targetFromStr);

  if (!buildOptions.project || typeof buildOptions.project !== 'string') {
    throw new Error(
      `Cannot read the project path option of the Angular library '${buildTarget.name}' in angular.json`
    );
  }

  const outputPath = await getOutPutPath(
    context.workspaceRoot,
    buildOptions.project
  );

  await engine.run(
    outputPath,
    options,
    (context.logger as unknown) as logging.LoggerApi
  );
}

async function getOutPutPath(
  projectRoot: string,
  relativeNgPackagePath: string
): Promise<string> {
  const ngPackagePath = path.join(projectRoot, relativeNgPackagePath);

  let ngPackageContentStr: string;

  try {
    ngPackageContentStr = await readFileAsync(ngPackagePath, {
      encoding: 'utf8'
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
