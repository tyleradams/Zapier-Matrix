require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Create - write_to_room', () => {
  zapier.tools.env.inject();

  it('should create an object', async () => {
    const bundle = {
      authData: {
        user: process.env.USER,
        password: process.env.PASSWORD,
        serverURL: process.env.SERVER_URL,
        oauth_consumer_key: process.env.OAUTH_CONSUMER_KEY,
        oauth_consumer_secret: process.env.OAUTH_CONSUMER_SECRET,
        oauth_token: process.env.OAUTH_TOKEN,
        oauth_token_secret: process.env.OAUTH_TOKEN_SECRET
      },

      inputData: {}
    };

    const result = await appTester(
      App.creates['write_to_room'].operation.perform,
      bundle
    );
    result.should.not.be.an.Array();
  });
});
