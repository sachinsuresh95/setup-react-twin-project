#!/usr/bin/env node
const shell = require("shelljs");
const editPackageJson = require("@rogerpence/edit-package-json");

const html = require("./html");
const js = require("./javascript");
const dependencies = require("./dependencies");
const devDependencies = require("./devDependencies");
const webpackConfig = require("./webpack");
const babelConfig = require("./babelrc");
const babelMacros = require("./babelMacros");

const [, , ...args] = process.argv;

if (args[0]) {
  shell.mkdir("-p", args[0]);
  shell.cd(args[0]);
}

shell.echo("Setting up dependencies...");

// initialize npm project
shell.exec("npm init -y", { silent: true });

//install dependencies
shell.exec(`npm i -S ${dependencies.list}`);

//install dev dependencies
shell.echo("Setting up dev dependencies...");
shell.exec(`npm i -D ${devDependencies.list}`);

shell.echo("Done setting up dependencies.");

//set up directories
shell.echo("Setting up directories and initial files...");

shell.mkdir("src");
shell.mkdir("src/styles");
shell.touch("webpack.config.js");
shell.touch(".babelrc");
shell.touch(".gitignore");
shell.touch("babel-plugin-macros.config.js");
shell.touch("src/index.html");
shell.touch("src/index.js");
shell.touch("src/styles/GlobalStyles.js");

shell.ShellString(html.template).to("src/index.html");
shell.ShellString(js.template).to("src/index.js");
shell.ShellString(webpackConfig.template).to("webpack.config.js");
shell.ShellString(babelConfig.template).to(".babelrc");
shell.ShellString(babelMacros.template).to("babel-plugin-macros.config.js");
shell.ShellString("node_modules").to(".gitignore");

//init tailwind config
shell.echo("Creating tailwind config file...");
shell.exec("npx tailwindcss init");

//add webpack scripts to package.json
shell.echo("Updating scripts in package.json");
editPackageJson({
  key: "dev",
  value: "webpack serve",
  force: true,
});
editPackageJson({
  key: "build",
  value: "webpack",
  force: true,
});

//That's it!!
shell.echo("Done.");
