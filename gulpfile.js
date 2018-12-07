'use strict';
const mkdirp = require('mkdirp');
const color = require('gulp-color');
const git = require('gulp-git');
const fs = require('fs');
const fsExtra = require('fs-extra');

const supportedPlugins = [
    'angular'
];

function cloneRepo(name, origin) {
    return new Promise((resolve, reject) => {
        console.log(color(`Cloning ${name}...`, 'BLUE'));
        git.init((err) => {
            if (err) {
                reject(err);
            } else {
                git.addRemote('origin', origin, async (err1) => {
                    if (err1) {
                        reject(err1);
                    } else {
                        git.pull('origin', 'master', {args: '--rebase'}, async (err2) => {
                            if (err2) {
                                fsExtra.removeSync(`../${name}`);
                                reject(err2);
                            } else {
                                console.log(color(`${name} plugin cloned successfully`, 'GREEN'));
                                resolve(true);
                            }
                        });
                    }
                });
            }
        });
    });
}

function createPlugin(name) {
    return new Promise((resolve, reject) => {
        name = name.toLowerCase();
        if (supportedPlugins.indexOf(name) === -1) {
            reject(new Error(` Plugin "${name}" does not exists.`));
        } else {
            mkdirp(`./plugins/${name}`, async (err) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        process.chdir(`./plugins/${name}/`);
                        // resolve(!!await cloneRepo(name, `https://github.com/WINKgroup/winkit-cli-${name}.git`));
                        resolve(!!await cloneRepo(name, `https://gitlab.com/winkular/winkular-cli.git`));
                    } catch (e) {
                        reject(e);
                    }
                }
            });
        }
    });
}

function updatePlugin(name) {
    return new Promise((resolve, reject) => {
        name = name.toLowerCase();
        if (supportedPlugins.indexOf(name) === -1 || !fs.existsSync(`./plugins/${name}/index.js`)) {
            reject(new Error(` Plugin "${name}" does not exists.`))
        } else {
            process.chdir(`./plugins/${name}/`);
            console.log(color(`Updating ${name}...`, 'BLUE'));
            git.pull('origin', 'master', (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(color(`${name} plugin updated successfully`, 'GREEN'));
                    resolve(true);
                }
            });
        }
    });
}

function deletePlugin(name) {
    return new Promise((resolve, reject) => {
        name = name.toLowerCase();
        if (supportedPlugins.indexOf(name) === -1 || !fs.existsSync(`./plugins/${name}/index.js`)) {
            reject(new Error(` Plugin "${name}" does not exists.`))
        } else {
            fsExtra.removeSync(`./plugins/${name}`);
            console.log(color(`${name} plugin deleted successfully`, 'GREEN'));
            resolve(true);
        }
    });
}

module.exports = {
    createPlugin,
    updatePlugin,
    deletePlugin,
    supportedPlugins
};