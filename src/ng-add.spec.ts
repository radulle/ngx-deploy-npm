import { Tree, SchematicContext } from '@angular-devkit/schematics';

import { ngAdd } from './ng-add';
import { Workspace } from 'interfaces';

describe('ng-add', () => {
  let originalAngularJSON: Workspace;
  let expectedAngularJSON: Workspace;

  beforeEach(() => {
    originalAngularJSON = {
      projects: {
        testing: {
          projectType: 'application',
          architect: {
            build: {
              builder: 'a',
              options: { b: 'b' }
            }
          }
        },
        publishable: {
          projectType: 'library',
          architect: {
            build: {
              builder: '@angular-devkit/build-ng-packagr:build',
              options: { a: 'a', b: 'b' }
            }
          }
        },
        publishable2: {
          projectType: 'library',
          architect: {
            build: {
              builder: 'my-custom-builder',
              options: {
                a: 'a',
                b: 'b'
              }
            }
          }
        },
        'non-publishable': {
          projectType: 'library',
          architect: {
            lint: {
              builder: 'a',
              options: {
                b: 'b'
              }
            }
          }
        },
        'non-publishable2': {
          projectType: 'library',
          architect: {
            lint: {
              builder: 'a',
              options: {
                b: 'b'
              }
            }
          }
        }
      },
      defaultProject: 'testing'
    };

    expectedAngularJSON = JSON.parse(JSON.stringify(originalAngularJSON));

    ['publishable', 'publishable2']
      .map(
        publishableProjectKey =>
          expectedAngularJSON.projects[publishableProjectKey]
      )
      .forEach(project => {
        if (project.architect) {
          project.architect.deploy = {
            builder: 'ngx-deploy-npm:deploy',
            options: {
              access: 'public'
            }
          };
        }
      });
  });

  describe('generating files', () => {
    let tree: Tree;

    beforeEach(() => {
      tree = Tree.empty();
      tree.create('angular.json', JSON.stringify(originalAngularJSON));
    });

    it('should set the deployer only on publishable libraries', () => {
      const result = ngAdd()(tree, {} as SchematicContext);

      const angularJsonModified = JSON.parse(
        result.read('angular.json')!.toString()
      );

      expect(angularJsonModified).toEqual(expectedAngularJSON);
    });
  });

  describe('error handling', () => {
    it('Should throw if angular.json not found', () => {
      expect(() => ngAdd()(Tree.empty(), {} as SchematicContext)).toThrowError(
        'Could not find angular.json'
      );
    });

    it('Should throw if angular.json can not be parsed', () => {
      const tree = Tree.empty();
      tree.create('angular.json', 'hi');
      expect(() => ngAdd()(tree, {} as SchematicContext)).toThrowError(
        'Could not parse angular.json'
      );
    });

    it('Should throw if angular.json can not be parsed', () => {
      expect(() => ngAdd()(Tree.empty(), {} as SchematicContext)).toThrowError(
        'Could not find angular.json'
      );
    });

    it('should throw if there is no library to add the deployer', () => {
      // Delete all libraries
      Object.keys(originalAngularJSON.projects)
        .filter(
          projectKey =>
            originalAngularJSON.projects[projectKey].projectType === 'library'
        )
        .forEach(libraryKey => {
          delete originalAngularJSON.projects[libraryKey];
        });
      const treeWithoutLibs = Tree.empty();
      treeWithoutLibs.create(
        'angular.json',
        JSON.stringify(originalAngularJSON)
      );

      expect(() =>
        ngAdd()(treeWithoutLibs, {} as SchematicContext)
      ).toThrowError('There is no libraries to add this deployer');
    });
  });
});
