'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var glob = require('glob');
var path = require('path');

module.exports = yeoman.generators.Base.extend({

  init: function() {
    this.getStylesheetNames = function() {

      var styles = this.templatePath('styleesheets');
      return glob.sync('**/*.css', {cwd: styles})
        .map(function(name){return path.basename(name, '.css')});
    }
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Asciidoctor') + ' generator!'
    ));

    var prompts = [
      {
        type: 'list',
        name: 'stylesheet',
        message: 'Select your stylesheet',
        choices: this.getStylesheetNames(),
        default: 0
      }
    ];

    this.prompt(prompts, function (props) {
      this.stylesheet = props.stylesheet;

      done();
    }.bind(this));
  },

  writing: {
    docs: function () {
      this.fs.copy(
        this.templatePath('_main.adoc'),
        this.destinationPath('src/adocs/main.adoc')
      );
      this.fs.copy(
        this.templatePath('styleesheets/' + this.stylesheet + '.css'),
        this.destinationPath('src/stylesheet/asciidoctor.css')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_gruntfile.js'),
        this.destinationPath('Gruntfile.js')
      );
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
    }
  },

  install: function () {
    this.installDependencies({
      bower: false
    });
  }
});
