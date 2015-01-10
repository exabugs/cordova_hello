'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bower: {
      install: {
        options: {
          targetDir: 'www',
          layout: function(type) {
            return type;
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-npm-install');
  grunt.loadNpmTasks('grunt-bower-install');
  grunt.loadNpmTasks('grunt-bower-task');

  grunt.registerTask('default', [
    'npm-install'
  ]);

};
