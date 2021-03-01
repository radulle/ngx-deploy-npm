#!/bin/bash

cd ../..

# Delete the previous workspace
rm -Rif nx-workspace

# Generate the Workspace
npm init nx-workspace nx-workspace --preset empty --nx-cloud false
cd nx-workspace

# Install some deps
npm install -D @nrwl/angular \
  @nrwl/nest \
  @nrwl/react \
  @nrwl/node

# Generate all kind of libs
npx nx generate @nrwl/angular:lib --name angular-lib --publishable --importPath angular-lib --style scss &&
  npx nx generate @nrwl/react:lib --name react-lib --publishable --importPath react-lib --style scss &&
  npx nx generate @nrwl/nest:lib --name nest-lib --publishable --importPath nest-lib &&
  npx nx generate @nrwl/node:lib --name node-lib --publishable --importPath node-lib

# Save your changes to easily differ the changes made on the workspace.json
git add . && git commit -m "chore: create boiler plate"

# Link the project
yarn link ngx-deploy-npm

# Add it to the workspace
npx nx generate ngx-deploy-npm:ng-add

# Test the build
npx nx deploy react-lib --dry-run
npx nx deploy angular-lib --dry-run
npx nx deploy nest-lib --dry-run
npx nx deploy node-lib --dry-run
