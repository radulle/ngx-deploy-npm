# README for contributors

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

### 2. npm link

Use the following instructions to make `ngx-deploy-npm` available locally via `npm link`.

1. Clone the project

   ```sh
   git clone git@github.com:bikecoders/ngx-deploy-npm.git
   cd ngx-deploy-npm
   ```

2. Install the dependencies

   ```sh
   cd src
   npm install
   ```

3. Create a local version of the package:

   ```sh
   npm run link
   ```

Read more about the `link` feature in the [official NPM documentation](https://docs.npmjs.com/cli/link).

### 3. Adding to an Angular project -- ng add

Once you have completed the previous steps to `npm link` the local copy of `ngx-deploy-npm`, follow these steps to use it in a local Angular project.

1. Enter the project directory

   ```sh
   cd your-workspace
   ```

2. Add the local version of `ngx-deploy-npm`.

   ```sh
   npm link ngx-deploy-npm
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
npm test
```

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

## Publish to NPM

```sh
cd src
npm release # to create a new version
npm deploy
```
