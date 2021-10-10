'use strict';

const path = require('path');
const childProcess = require('child_process');

// wrapper function for grunt configuration
module.exports = function(grunt) {

  grunt.initConfig({

    // read in the package information
    pkg: grunt.file.readJSON('package.json'),

    // grunt-eslint plugin configuration (lint for JS)
    eslint: {
      options: {
      },
      target: [
        'Gruntfile.js',
        'test/**/*.js'
      ]
    },

    // grunt-contrib-clean plugin configuration (clean up files)
    clean: {
      build: [
        'test/config/'
      ],
      options: {
        force: true
      }
    },

    // grunt-mocha-test plugin configuration (unit testing)
    mochaTest: {
      strip: {
        options: {
          reporter: 'spec',
          timeout: 20000
        },
        src: [
          'test/TestClean.js'
        ]
      },
      test: {
        options: {
          reporter: 'spec',
          timeout: 20000
        },
        src: [
          'test/TestCompilation.js'
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('strip', 'Strip the sources.', ['clean:build', 'eslint', 'mochaTest:strip']);
  grunt.registerTask('build', 'Build the module.', ['clean:build', 'eslint', 'mochaTest:test']);
  grunt.registerTask('default', 'Default targets.', ['build']);
};
