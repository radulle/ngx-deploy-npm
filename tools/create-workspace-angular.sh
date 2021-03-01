#!/bin/bash

cd ../..

mkdir -p workspace
cd workspace

# Delete the previous workspace
rm -Rif angular-workspace

npx @angular/cli new --name angular-workspace --strict --routing --style scss
cd angular-workspace

# Generate lib
npx ng generate library angular-lib

# Save your changes to easily differ the changes made on the angular.json
git add . && git commit -m "chore: create boiler plate"

# Link the project
yarn link ngx-deploy-npm

# Add it to the workspace
npx ng add ngx-deploy-npm

# Test the build
npx ng deploy angular-lib --dry-run
