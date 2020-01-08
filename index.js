const authentication = require('./authentication');
const writeToRoomCreate = require('./creates/write_to_room.js');

module.exports = {
  platformVersion: require('zapier-platform-core').version,
  version: require('./package.json').version,
  authentication: authentication,
  creates: { [writeToRoomCreate.key]: writeToRoomCreate }
};
