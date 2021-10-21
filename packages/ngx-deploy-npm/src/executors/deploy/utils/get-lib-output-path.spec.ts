import * as path from 'path';
import * as fs from './fs-async';

import { getLibOutPutPath } from './get-lib-output-path';

describe('Getting Lib Output Path', () => {
  let projectRoot: Parameters<typeof getLibOutPutPath>[0];
  let buildOptions: Parameters<typeof getLibOutPutPath>[1];
  let libName: Parameters<typeof getLibOutPutPath>[2];
  let expectedOutput: string;

  beforeEach(() => {
    projectRoot = 'some/random/system/path';
    libName = 'random-name';
  });

  describe('With Output Path', () => {
    beforeEach(() => {
      buildOptions = {
        outputPath: 'some/dist/path',
      };

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expectedOutput = path.join(projectRoot, buildOptions.outputPath!);
    });

    it('should return the right path of the built project', async () => {
      const gottenPath = await getLibOutPutPath(
        projectRoot,
        buildOptions,
        libName
      );

      expect(gottenPath).toEqual(expectedOutput);
    });
  });

  describe('Without Output Path', () => {
    let finalDestination: string;

    beforeEach(() => {
      buildOptions = {
        project: 'libs/angular-lib/ng-package.json',
      };

      finalDestination = 'dist/random/dir';

      expectedOutput = path.join(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        path.dirname(path.join(projectRoot, buildOptions.project!)),
        finalDestination
      );

      jest
        .spyOn(fs, 'readFileAsync')
        .mockImplementation(() =>
          Promise.resolve(`{ "dest": "${finalDestination}" }`)
        );
    });

    it('should return the right path of the built project', async () => {
      const gottenPath = await getLibOutPutPath(
        projectRoot,
        buildOptions,
        libName
      );

      expect(gottenPath).toEqual(expectedOutput);
    });
  });
});
