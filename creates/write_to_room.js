const perform = (z, bundle) => {
  const options = {
    url:
      bundle.authData.serverURL +
      '/_matrix/client/r0/rooms/' +
      bundle.authData.roomID +
      '/send/m.room.message/' +
      bundle.inputData.txnid,
    method: 'PUT',
    headers: {},
    params: {
      access_token: bundle.authData.access_token
    },
    body: {
      body: bundle.inputData.body,
      msgtype: 'm.text'
    }
  };

  return z.request(options).then(response => {
    response.throwForStatus();
    const results = z.JSON.parse(response.content);

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'body',
        label: 'Message Body',
        type: 'string',
        helpText: 'The message body to send to matrix',
        required: true,
        list: false,
        altersDynamicFields: false
      },
      {
        key: 'txnid',
        label: 'Transaction ID',
        type: 'string',
        helpText:
          'The Transaction ID for the message, must be unique per matrix message\n\nPlease avoid using /, ? and newlines',
        required: true,
        list: false,
        altersDynamicFields: false
      },
      {
        key: 'roomID',
        label: 'Room ID',
        type: 'string',
        helpText:
          'ex: !636q39766251:example.com\nThis is the internal room id for the room. You can find under the "Advanced" tab of the room information.\nIt will look something like "!636q39766251:example.com"\nYou cannot use the public room name which begins with a #',
        required: true,
        list: false,
        altersDynamicFields: false
      }
    ]
  },
  key: 'write_to_room',
  noun: 'Message',
  display: {
    label: 'Send a Message',
    description: 'This sends a message to a room',
    hidden: false,
    important: true
  }
};
