module.exports = function(grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        eslint: {
            all: ['Gruntfile.js', 'lib/compiler.js']
        },
        browserify: {
          dist: {
            files: {
              'build/compiler.all.js': ['lib/compiler.js']
            }
          }
        },
        copy: {
            editor: {
                files: [
                    // {
                    //     expand: true,
                    //     src: [
                    //         'WaveDrom.js', 'editor.js', 'init.js',
                    //         'editor.html', 'tutorial.html',
                    //         'images/ic_*.png', 'images/favicon.ico', 'images/logo.png',
                    //         'skins/*', 'css/*', 'scripts/*'
                    //     ],
                    //     dest: 'demo/',
                    //     filter: 'isFile'
                    // },
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'node_modules/codemirror/lib/codemirror.css',
                            'node_modules/codemirror/lib/codemirror.js',
                            'node_modules/codemirror/addon/search/search.js',
                            'node_modules/codemirror/addon/search/searchcursor.js',
                            'node_modules/codemirror/mode/javascript/javascript.js',
                            'node_modules/codemirror/addon/dialog/dialog.css',
                            'lib/colorforth.css',
                            'lib/forth.js',
                            'lib/editor.html'
                        ],
                        dest: 'build/',
                        filter: 'isFile'
                    }
            ]
            }
        },
        clean: {
            node: ['node_modules', 'build']
        },
        watch: {
            scripts: {
                files: ['lib/*.*', 'node_modules/shift-forth/lib/*.js'],
                tasks: ['default'],
                options: {
                    spawn: false
                }
            }
        },
        'bower-install-simple': {
            options: {
                color: true,
                directory: 'components'
            },
            prod: {
                options: {
                    production: true
                }
            },
            dev: {
                options: {
                    production: false
                }
            }
        }
    });

    // plugins
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-bower-install-simple');

    // tasks
    grunt.registerTask('default', ['eslint', 'copy', 'browserify']);
};
