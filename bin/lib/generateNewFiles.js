var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var clc = require('cli-color');

module.exports = function (filePath) {

  //check we get a valid filepath
  if (!filePath) {
    console.log('A valid filepath is required for the "new" command');
    process.exit(1);
  }

  var pathFragments = (filePath += '').split('/');
  var fileBase = pathFragments.shift(); // should be src

  var fileName = pathFragments.pop();

  var fileTestName = fileName.split('.');
  fileTestName.splice((fileTestName.length - 1), 0, 'spec');
  fileTestName = fileTestName.join('.');

  var dirPath = pathFragments.reduce(function (sum, dir) {
    return sum + '/' + dir;
  });

  //directory paths
  var resolvedTestDirPath = path.resolve(process.cwd(), 'test/unit', dirPath);
  var resolvedDirPath = path.resolve(process.cwd(), fileBase, dirPath);

  //file paths
  var resolvedTestFilePath = path.resolve(resolvedTestDirPath, fileTestName);
  var resolvedFilePath = path.resolve(resolvedDirPath, fileName);

  //check to see if file exists
  if(fs.existsSync(resolvedFilePath)){
    console.log(clc.red('File exists'));
    process.exit(1);
  }

  //make directory paths
  if(!fs.existsSync(resolvedTestDirPath)){
    console.log(clc.green('Created directory: %s', resolvedTestDirPath));
    mkdirp.sync(resolvedTestDirPath);
  }

  if(!fs.existsSync(resolvedDirPath)){
    console.log(clc.green('Created directory: %s', resolvedDirPath));
    mkdirp.sync(resolvedDirPath);
  }

  //write files
  fs.writeFileSync(resolvedTestFilePath, '', 'utf-8');
  console.log(clc.green('Created file: %s', resolvedTestFilePath));

  fs.writeFileSync(resolvedFilePath, '', 'utf-8');
  console.log(clc.green('Created file: %s', resolvedFilePath));
};
