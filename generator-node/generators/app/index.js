"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const _ = require("lodash");
const { basename } = require("path");
const mkdirp = require("mkdirp");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the lovely ${chalk.red("generator-node")} generator!`)
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Project name",
        default: this.appname
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  installingDependencies() {
    this.npmInstall(
      ["standard", "prettier-standard", "husky", "lint-staged", "snazzy"],
      { "save-dev": true }
    );
  }

  default() {
    if (basename(this.destinationPath()) !== this.props.name) {
      this.log(
        `Your generator must be inside a folder named ${
          this.props.name
        }\nI'll automatically create this folder.`
      );
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  writing() {
    const pkg = _.merge(
      {
        name: this.props.name,
        version: "0.0.1",
        private: true,
        description: "",
        author: {
          name: "Miklos Suveges",
          email: "miklos.suveges@gmail.com"
        },
        license: "MIT",
        scripts: {
          format: "prettier-standard {src,test,config}/**/*.{js,json}",
          lint: "standard --verbose {src,test,config}/**/*.{js,json} | snazzy",
          "lint:fix":
            "standard --verbose --fix {src,test,config}/**/*.{js,json} | snazzy",
          start: "node src",
          test: "true",
          dev: "nodemon -e js,yaml,json src",
          inspect: "node --inspect-brk src"
        },
        standard: {
          env: ["node"]
        },
        husky: {
          hooks: {
            "pre-commit": "lint-staged",
            "pre-push": "npm run --silent test"
          }
        },
        "lint-staged": {
          "{src,test,config}/**/*.{js,json}": [
            "npm run --silent format",
            "npm run --silent lint:fix",
            "git add"
          ]
        },
        main: "",
        engines: {
          npm: ">= 10.0.0"
        }
      },
      this.fs.readJSON(this.destinationPath("package.json"), {})
    );
    this.fs.writeJSON(this.destinationPath("package.json"), pkg);

    this.fs.copy(
      this.templatePath(".editorconfig"),
      this.destinationPath(".editorconfig")
    );

    this.fs.copy(
      this.templatePath(".gitignore"),
      this.destinationPath(".gitignore")
    );

    this.fs.copy(
      this.templatePath("index.js"),
      this.destinationPath("src/index.js")
    );

    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      {
        projectName: pkg.name,
        author: {
          name: pkg.author.name,
          email: pkg.author.email
        },
        license: pkg.license
      }
    );
  }

  install() {
    this.installDependencies({ bower: false });
  }
};
