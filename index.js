#!/usr/bin/env node
const {createPlugin, updatePlugins, deletePlugin} = require('./gulpfile');

const program = require('commander');
const angular = require('./plugins/angular/index');

const version = '0.1a';
const plugins = [
];

function addPlugin(plugin, p) {
    const c = angular.command;
    p.command(c.command).action(c.action).on('--help', c.onHelp);
}

program
    .version(version)
    .description('Winkit CLI.');

program
    .command('add:plugin <name>')
    .description('Add new plugin to your Winkit CLI.')
    .action((name) => {
        createPlugin(name);
    });

program
    .command('update:plugins <name>')
    .description('Update an existing plugin of your Winkit CLI.')
    .action((name, args) => {
        updatePlugins(name, args);
    });

program
    .command('delete:plugin <name>')
    .description('Delete an existing plugin of your Winkit CLI.')
    .action((name) => {
        deletePlugin(name);
    });

plugins.forEach(p => {
    addPlugin(p, program);
});

program.parse(process.argv);