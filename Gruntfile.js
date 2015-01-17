'use strict';

// @see: https://gist.github.com/jonathandixon/7418730

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['www'],

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
    },

    connect: {
      server: {
        options: {
          port: 7000,
          hostname: 'localhost',
          base: 'www',
          keepalive: true
        }
      }
    },

    cordovacli: {
      options: {
        path: './'
      },
      add_platforms: {
        options: {
          command: 'platform',
          action: 'add',
          platforms: ['ios', 'android']
        }
      },
      add_plugins: {
        options: {
          command: 'plugin',
          action: 'add',
          plugins: [
    //        'console',
            'dialogs',
            'geolocation',
            'vibration',
    //        'network-information',
    //        'splashscreen',
            'https://github.com/phonegap-build/PushPlugin.git',
            'https://github.com/petermetz/cordova-plugin-ibeacon.git',
            'https://github.com/katzer/cordova-plugin-local-notifications.git',
            'https://github.com/katzer/cordova-plugin-background-mode.git',
            'device'
          ]
        }
      },
      build_ios: {
        options: {
          command: 'build',
          platforms: ['ios']
        }
      },
      build_android: {
        options: {
          command: 'build',
          platforms: ['android']
        }
      },
      prepare_ios: {
        options: {
          command: 'prepare',
          platforms: ['ios']
        }
      },
      prepare_android: {
        options: {
          command: 'prepare',
          platforms: ['android']
        }
      },
      serve: {
        options: {
          command: 'serve',
          port: 7000
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-npm-install');
  grunt.loadNpmTasks('grunt-bower-install');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-cordovacli');

  grunt.registerTask('default', [
    'clean',
    'npm-install',
    'bower',
    'copy',
    'compass',
    'jade',
    'uglify'
  ]);

};
