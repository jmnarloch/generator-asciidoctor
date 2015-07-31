'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    yeoman: {
      app: 'src/adocs',
      dist: 'dist/'
    },
    watch: {
      asciidoc: {
        files: ['src/adocs/**/*.adoc', 'src/stylesheet/**/*.css'],
        tasks: ['asciidoc']
      }
    },
    asciidoctor: {
      dist: {
        options: {
          showTitle: true,
          showNumberedHeadings: true,
          showToc: true,
          header_footer: true,
          safeMode: 'secure',
          doctype: 'article',
          backend: 'html5'
        },
        files: [{
          expand: true,
          cwd: 'src/adocs',
          src: '**/*.adoc',
          dest: '<%= yeoman.dist %>',
          rename: function(dest, src) {
            return dest + src.replace('.adoc','.html');
          }
        }]
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    copy: {
      style: {
        files: [{
          src: 'src/stylesheet/asciidoctor.css',
          dest: '<%= yeoman.dist %>/asciidoctor.css'
        }]
      }
    }
  });

  grunt.registerTask('serve', [
    'clean:server',
    'copy:style',
    'asciidoctor:dist',
    'watch'
  ]);

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'copy:style',
    'asciidoctor:dist'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
