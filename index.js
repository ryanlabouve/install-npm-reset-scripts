#!/usr/bin/env node

const fs = require('fs');

const defaultScripts = {
  "clean":
    "rm -rf node_modules bower_components dist && yarn clean:system_temp",
  "clean:system_temp":
    "find /var/folders -name 'broccoli-*' -type d -print 2> /dev/null | xargs rm -rf",
  "reset": "npm run clean clean && npm install"
};

function index() {
  let file;
  let packageJson;

  try {
    file = fs.readFileSync('package.json');
    packageJson = JSON.parse(file.toString()); 
  } catch {
    console.log("Error reading package.json");
  }

  packageJson.scripts = Object.assign({}, packageJson.scripts, defaultScripts);


  try {
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  } catch {
    console.log("Error writing package.json");
  }
}

index();
