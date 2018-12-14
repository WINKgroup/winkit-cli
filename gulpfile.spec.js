const chai = require('chai');
chai.use(require('chai-fs'));
const expect = require('chai').expect;
const mockFS = require('mock-fs');
const FS = require('fs');
const sinon = require('sinon');

const addPluginHelp = require('./index').addPlugin;
const { createPlugin, updatePlugin, deletePlugin, supportedPlugins } = require('./gulpfile');

describe('winkit plugin managment', function() {
    after(function() {
        mockFS.restore();
    });

    describe('add \<name\>', function() {
        const mockCommand = sinon.mock(createPlugin);

        before(function() {
            expect(supportedPlugins).to.be.an('array');
            mockFS();
        });

        after(function() {
            mockFS.restore();
            mockCommand.restore();
        });

        it('should reject with an invalid plugin name', async function() {
            const INVALID_NAME = 'invalidPlugin';
            let errorMessage;
            try {
                await createPlugin(INVALID_NAME)
            } catch (e) {
                errorMessage = e.message;
            }
            expect(errorMessage.trim().toLowerCase()).to.equal(`Plugin "${INVALID_NAME}" does not exists.`.toLowerCase())
        });

        it('should create ./plugins/<pluginName> folder', async function() {

            const VALID_NAME = 'angular';
            let errorMessage;
            try {
                await createPlugin(VALID_NAME)
            } catch (e) {
                errorMessage = e.message;
            }
            if (errorMessage) {
                expect(errorMessage).to.be.a('string');
            } else {
                expect(`${__dirname}/plugins/${VALID_NAME}/`).to.be.a.directory();
            }
        });
    });

    describe('update \<name\>', function() {
        const mockCommand = sinon.mock(updatePlugin);

        after(function() {
            mockCommand.restore();
        });

        it('should resolve if plugin is updated, else reject', async function() {
            expect(true).to.equal(false);
        });
    });

    describe('delete \<name\>', function() {
        const mockCommand = sinon.mock(deletePlugin);

        after(function() {
            mockCommand.restore();
        });

        it('should resolve if plugin files are deleted, else reject', async function() {
            expect(true).to.equal(false);
        });
    });
});
