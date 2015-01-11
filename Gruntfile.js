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
    },

    watch: {
      jade: {
        tasks: 'jade',
        files: ['src/**/*.jade']
      },
      scss: {
        tasks: 'compass',
        files: ['src/**/*.scss']
      },
      js: {
        tasks: 'uglify',
        files: ['src/**/*.js']
      }
    },

    copy: {
      img: {
        expand: true,
        cwd: 'src/img',
        src: '*',
        dest: 'www/img/',
        filter: 'isFile'
      }
    },

    compass: {
      dist: {
        options: {
          relativeAssets: true,
          httpPath: '/',
          sassDir: 'src/css',
          cssDir: 'www/css',
          imagesDir: 'src/img',
          generatedImagesDir: 'www/img',
          javascriptsDir: 'js'
        }
      }
    },

    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/js/',
          src: '*.js',
          dest: 'www/js/',
          ext: '.min.js'
        }]
      }
    },

    jade: {
      compile: {
        options: {
          pretty: true //htmlをインデント表記させる
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: [
            '*.jade',
            '!_*.jade'
          ],
          dest: 'www/',
          ext: '.html'
        }]
      }
    }


  });

  grunt.loadNpmTasks('grunt-npm-install');
  grunt.loadNpmTasks('grunt-bower-install');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', [
    'npm-install',
    'bower',
    'copy'
  ]);

};
