#!/usr/bin/env node
const {createPlugin, updatePlugin, deletePlugin, supportedPlugins} = require('./gulpfile');
const program = require('commander');
const fs = require('fs');

const version = '0.1';

function addPlugin(plugin, p) {
    if (fs.existsSync(`./plugins/${plugin}/index.js`)) {
        const pi = require(`./plugins/${plugin}/index`);
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