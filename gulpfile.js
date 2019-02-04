'use strict';
const mkdirp = require('mkdirp');
const color = require('gulp-color');
const git = require('gulp-git');
const fs = require('fs');
const fsExtra = require('fs-extra');

const supportedPlugins = [
    'angular',
    'node'
];

function cloneRepo(name, origin) {
    return new Promise((resolve, reject) => {
        console.log(color(`Installing ${name} plugin...`, 'BLUE'));
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
                                fsExtra.removeSync(`${__dirname}/plugins/${name}`);
                                reject(err2);
                            } else {
                                console.log(color(`${name} plugin installed successfully.`, 'GREEN'));
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
            reject(new Error(` Plugin "${name}" does not exist.`));
        } else {
            mkdirp(`${__dirname}/plugins/${name}`, async (err) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        process.chdir(`${__dirname}/plugins/${name}/`);
                        resolve(!!await cloneRepo(name, `https://github.com/WINKgroup/winkit-cli-${name}.git`));
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
        if (supportedPlugins.indexOf(name) === -1 || !fs.existsSync(`${__dirname}/plugins/${name}/index.js`)) {
            reject(new Error(` Plugin "${name}" does not exist.`))
        } else {
            process.chdir(`${__dirname}/plugins/${name}/`);
            console.log(color(`Updating ${name}...`, 'BLUE'));
            git.pull('origin', 'master', async (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(color(`${name} plugin updated successfully`, 'GREEN'));
                    await usePlugin(name, 'latest');
                    resolve(true);
                }
            });
        }
    });
}

function deletePlugin(name) {
    return new Promise((resolve, reject) => {
        name = name.toLowerCase();
        if (supportedPlugins.indexOf(name) === -1 || !fs.existsSync(`${__dirname}/plugins/${name}/index.js`)) {
            reject(new Error(` Plugin "${name}" does not exist.`))
        } else {
            fsExtra.removeSync(`${__dirname}/plugins/${name}`);
            console.log(color(`${name} plugin deleted successfully`, 'GREEN'));
            resolve(true);
        }
    });
}


function usePlugin(name, version) {
    return new Promise((resolve, reject) => {
        process.chdir(`${__dirname}/plugins/${name}/`);
        let branch;
        if (version === 'latest') {
            branch = 'master';
        } else if (version.indexOf('v') === -1) {
            branch = `tags/v${version}`;
        } else {
            branch = `tags/${version}`;
        }
        git.checkout(branch, null, (err) => {
            if (err) {
                reject(err);
            } else {
                console.log(color(`Swithced to ${version} successfully`, 'GREEN'));
                resolve(true);
            }
        });
    });
}

module.exports = {
    createPlugin,
    updatePlugin,
    deletePlugin,
    usePlugin,
    supportedPlugins
};
