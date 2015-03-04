/*
 * grunt-init-commonjs
 * https://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a scribe plugin module, including mocha unit tests.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_.'

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url'),
    init.prompt('node_version'),
    init.prompt('main')
  ], function(err, props) {
    props.keywords = [];
    props.devDependencies = {
      'mocha': '^2.0.1',
      'lodash': '^2.4.1',
      'chai': '1.9.1',
      'http-server': '^0.7.1',
      'scribe-test-harness': '^0.0.6',
      'selenium-webdriver': '^2.44.0',
      'webdriver-manager': '^1.0.1',
      "bower": "^1.3.12",
      "glob": "^4.1.5",
      "mversion": "^1.3.0"
    };

    props.scripts = {
      "test-firefox": "TEST_SERVER_PORT=9090 BROWSER_NAME='firefox' ./run-tests.sh",
      "test-chrome": "TEST_SERVER_PORT=9090 BROWSER_NAME='chrome' ./run-tests.sh",
      "test": "npm run test-chrome",
      "postinstall": "bower install",
      "build": "browserify src/{%= name %} --standalone {%= name %} -t babelify > ./build/{% name %}.js",
      "build-prod": "npm run build && uglifyjs ./build/{%= name %}.js > ./build/{%= name %}.min.js"
    };

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};
