/* jshint node:true */

module.exports = function (grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		connect: {
			options: {
				livereload: 35729
			},
			livereload: {
				options: {
					port: 9000,
					hostname: '*',
					base: '.'
				}
			}
		},

		watch: {
			options: {
				livereload: '<%= connect.options.livereload %>'
			},
			html: {
				files: ['index.html']
			},
			sass: {
				files: ['sass/**/*.scss'],
				tasks: ['sass']
			},
			scripts: {
				files: ['js/**/*.js', 'js/**/*.jsx', '!js/bundle.js'],
				tasks: ['browserify']
			},
			assets: {
				files: ['assets/**/*'],
			}
		},


		/**
		 * Sass
		 */
		sass: {
			options: {
				debug: true
			},
			dev: {
				files: {
					'sass/main.css': 'sass/main.scss'
				}
			}
		},

		/**
		 * Browserify
		 */
		browserify: {
			options: {
				browserifyOptions: {
					debug: true
				},
				transform: [
					['babelify', {
						presets: ['react']
					}]
				]
			},
			dev: {
				files: {
					'js/bundle.js': 'js/app.jsx'
				}
			}
		}
	});


	/* Grunt tasks */
	grunt.registerTask('dev', [
		'sass',
		'browserify'
	]);

	grunt.registerTask('server', [
		'connect',
		'dev',
		'watch'
	]);

	grunt.registerTask('default', 'server');
};
