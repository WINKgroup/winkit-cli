const chai = require('chai');
chai.use(require('chai-fs'));
chai.use(require('chai-http'));
const expect = require('chai').expect;
const mockFS = require('mock-fs');

const { addPluginHelp } = require('./index');
const { createPlugin, updatePlugin, deletePlugin, supportedPlugins } = require('./gulpfile');

describe('winkit plugin managment', function() {
    before(function() {
        expect(supportedPlugins).to.be.an('array');
        mockFS();
    });

    after(function() {
        mockFS.restore();
    });

    describe('add \<name\>', function() {
        // const mockCommand = sinon.mock(createPlugin);
        const INVALID_NAME = 'invalidPlugin';
        const VALID_NAME = 'angular';
        const PLUGIN_FOLDER_PATH = `${__dirname}/plugins/${VALID_NAME}/`;

        after(function() {
            // mockFS.restore();
            // mockCommand.restore();
        });

        it('should reject with an invalid plugin name', async function() {
            let errorMessage;
            try {
                await createPlugin(INVALID_NAME)
            } catch (e) {
                errorMessage = e.message;
            }
            expect(errorMessage.trim().toLowerCase()).to.equal(`Plugin "${INVALID_NAME}" does not exists.`.toLowerCase())
        });

        it('should create /plugins/<pluginName> folder', async function() {
            let errorMessage;
            try {
                await createPlugin(VALID_NAME);
            } catch (e) {
                errorMessage = e.message;
            }
            if (errorMessage) {
                expect(errorMessage).to.be.a('string');
            } else {
                expect(PLUGIN_FOLDER_PATH).to.be.a.directory();
            }
        });

        it('should clone github/WINKgroup/winkit-cli-<pluginName> repository into /plugins/<pluginName> folder', async function() {

            const requester = chai.request(`https://api.github.com/repos/WINKgroup/winkit-cli-${VALID_NAME}/contents`);
            let response;

            try {
                response = await requester.get('/');
                await createPlugin(VALID_NAME);
            } catch (e) {
                response = e;
            }
            if (response instanceof Error) {
                expect(response).to.have.property('message').to.be.a('string');
            } else {
                expect(response).to.have.property('status', 200);
                expect(response).to.have.property('body').that.is.an('array');
                const subDirs = response.body.filter(el => el.type === 'dir').map(el => el.path);
                const files = response.body.filter(el => el.type === 'file').map(el => el.path + 'xasd'); // Forcing test to fail
                expect(PLUGIN_FOLDER_PATH).to.be.a.directory().and.include.files(files);
                expect(PLUGIN_FOLDER_PATH).to.be.a.directory().and.include.subDirs(subDirs);
            }
        });
    });

    describe('update \<name\>', function() {
        // const mockCommand = sinon.mock(updatePlugin);

        after(function() {
            // mockCommand.restore();
        });

        it('should resolve if plugin is updated, else reject', async function() {
            expect(true).to.equal(false);
        });
    });

    describe('delete \<name\>', function() {
        // const mockCommand = sinon.mock(deletePlugin);

        after(function() {
            // mockCommand.restore();
        });

        it('should resolve if plugin files are deleted, else reject', async function() {
            expect(true).to.equal(false);
        });
    });
});
