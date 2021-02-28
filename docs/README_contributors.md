# README for contributors <!-- omit in toc -->

## Table of content <!-- omit in toc -->

- [How to start](#how-to-start)
- [Local development](#local-development)
  - [1. Angular CLI](#1-angular-cli)
  - [2. yarn link](#2-yarn-link)
  - [3. Adding to an Angular project --ng-add](#3-adding-to-an-angular-project---ng-add)
  - [4. Testing](#4-testing)
  - [5. Debugging](#5-debugging)
    - [Option A), the traditional one](#option-a-the-traditional-one)
    - [Option B), the easy one](#option-b-the-easy-one)
- [Making a Contribution](#making-a-contribution)
- [Creating a Workspace to test your library](#creating-a-workspace-to-test-your-library)
  - [Nx](#nx)
  - [Angular](#angular)
- [Publish to NPM](#publish-to-npm)

## How to start

TL;DR – execute this:

```sh
cd src
npm i
npm run build
npm test
```

## Local development

If you want to try the latest package locally without installing it from NPM, use the following instructions.
This may be useful when you want to try the latest non-published version of this library or you want to make a contribution.

Follow the instructions for [checking and updating the Angular CLI version](#angular-cli) and then link the package.

### 1. Angular CLI

1. Install the next version of the Angular CLI.

   ```sh
   npm install -g @angular/cli
   ```

2. Run `ng version`, make sure you have installed Angular CLI v8.3.0 or greater.

3. Update your existing project using the command:

   ```sh
   ng update @angular/cli @angular/core
   ```

### 2. yarn link

Use the following instructions to make `ngx-deploy-npm` available locally via `yarn link`.

1. Clone the project

   ```sh
   git clone git@github.com:bikecoders/ngx-deploy-npm.git
   cd ngx-deploy-npm
   ```

2. Install the dependencies

   ```sh
   cd src
   yarn install
   ```

3. Create a local version of the package:

   ```sh
   yarn run link
   ```

Read more about the `link` feature in the [official NPM documentation](https://docs.npmjs.com/cli/link).

### 3. Adding to an Angular project --ng-add

Once you have completed the previous steps to `yarn link` the local copy of `ngx-deploy-npm`, follow these steps to use it in a local Angular project.

1. Enter the project directory

   ```sh
   cd your-workspace
   ```

2. Add the local version of `ngx-deploy-npm`.

   ```sh
   yarn link ngx-deploy-npm
   ```

3. Now execute the `ng-add` schematic.

   ```sh
   ng add ngx-deploy-npm
   ```

4. You can now publish your library to NPM.

   ```sh
   ng deploy
   ```

   Or with the old builder syntax:

   ```sh
   ng run your-angular-project:deploy
   ```

5. You can remove the link later by running `npm run unlink`

### 4. Testing

Testing is done with [Jest](https://jestjs.io/).
To run the tests:

```sh
cd ./src
npm run test
npm run test:cov
```

### 5. Debugging

There are two ways of debug:

#### Option A), the traditional one

To debug your builder you need to:

1. Place `debugger` statement, where you want your deployer stops.
2. Follow the steps of [yarn run link](#2-**yarn-link)\*\* described here. compile, link and install linked in a local project
3. Now, on the project that you linked the deployer, run it on debug mode using:
   | Normal Command | Command on Debug Mode |
   | :--------------------- | :------------------------------------------------------------------------ |
   | `ng deploy` | `node --inspect-brk ./node_modules/@angular/cli/bin/ng deploy` |
   | `ng add YOUR_DEPLOYER` | `node --inspect-brk ./node_modules/@angular/cli/bin/ng add YOUR_DEPLOYER` |

4. Use your favorite [Inspector Client](https://nodejs.org/de/docs/guides/debugging-getting-started/#inspector-clients) to debug

> This is the standard procedure to debug a NodeJs project. If you need more information you can read the official Docs of NodeJs to learn more about it.
>
> _[https://nodejs.org/de/docs/guides/debugging-getting-started/](https://nodejs.org/de/docs/guides/debugging-getting-started/)_

#### Option B), the easy one

> Only works on VsCode!

First do:

1. Place `debugger` statement or a red-point, where you want your deployer stops.
2. Follow the steps of [yarn link](#2-yarn-link) described here. compile, link and install linked in a local project

On VsCode, just create a [_JavaScript Debug Terminal_](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_javascript-debug-terminal) and execute the command that you want to debug

## Making a Contribution

1. Verify the issues if your problem or request has been already addressed
2. Fork it
3. Create your branch
4. Create your commits using [our guidelines](https://www.conventionalcommits.org/en/v1.0.0/)
   - This is **very** important, we use the commit history to generate automagically the changelog, do your best describing the changes that you introduce 😄
   - We encourage the use of unit test for the fixes and new features. You don't know how to write unit test? Don't let that to stop your contribution, we are here to help 👋.
5. Make a PR against master
6. Wait for the review
7. Merge and Party 🎉

Questions 🤔? Drop your message on our [discord server](https://discord.gg/cPa78y6rXn)

## Creating a Workspace to test your library

You may want to test your changes in a real life scenario.
We have some scripts that you can execute to create your workspace
and test your flaming changes 🔥

> The creation of a new workspace will delete the previous one

### Nx

`yarn run create-workspace:nx` will create a `nx-workspace` folder with a Nx workspace with
4 publishable libraries to make your test on whatever lib you want

- react-lib
- angular-lib
- nest-lib
- node-lib

### Angular

`yarn run create-workspace:angular` will create a `angular-workspace` folder with an Angular workspace with
1 publishable libraries to make your test

- angular-lib

## Publish to NPM

```sh
cd src
yarn release # to create a new version
yarn deploy
```
