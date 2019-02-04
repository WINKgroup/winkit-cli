#!/usr/bin/env node
const {createPlugin, updatePlugin, deletePlugin, usePlugin, supportedPlugins} = require('./gulpfile');
const program = require('commander');
const fs = require('fs');
const {version} = require('./package.json');

function addPlugin(plugin, p) {
    if (fs.existsSync(`${__dirname}/plugins/${plugin}/index.js`)) {
        const pi = require(`${__dirname}/plugins/${plugin}/index`);
        const c = pi.command;
        if (pi && c) {
            p.command(c.command).action(c.action).on('--help', c.onHelp);
        }
    }
}

program
    .version(version)
    .description('Winkit CLI.');

program
    .command('add:plugin <name>')
    .description('Add new plugin to your Winkit CLI.')
    .action(async (name) => {
        try {
            await createPlugin(name);
        } catch (e) {
            console.log('Error adding plugin!' + e.message);
        }
    });

program
    .command('update:plugin <name>')
    .description('Update an existing plugin of your Winkit CLI.')
    .action(async (name) => {
        try {
            await updatePlugin(name);
        } catch (e) {
            console.log('Error updating plugin!' + e.message);
        }
    });

program
    .command('use:plugin <name> <v>')
    .description('Use a specific version of a plugin of your Winkit CLI.')
    .action(async (name, v) => {
        try {
            await updatePlugin(name);
            await usePlugin(name, v);
        } catch (e) {
            console.log('Error using specific plugin version!' + e.message);
        }
    });

program
    .command('delete:plugin <name>')
    .description('Delete an existing plugin of your Winkit CLI.')
    .action(async (name) => {
        try {
            await deletePlugin(name);
        } catch (e) {
            console.log('Error deleting plugin!' + e.message);
        }
    });

supportedPlugins.forEach(p => {
    addPlugin(p, program);
});

program.parse(process.argv);
