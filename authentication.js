const testAuth = (z, bundle) => {
  const options = {
    url: bundle.authData.serverURL + '/_matrix/client/r0/sync',
    method: 'GET',
    headers: {},
    params: {
      access_token: bundle.authData.access_token
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
  type: 'session',
  test: testAuth,
  fields: [
    {
      computed: false,
      key: 'user',
      required: true,
      label: 'Username',
      type: 'string',
      helpText: 'The username zapier should use to post messages'
    },
    {
      computed: false,
      key: 'password',
      required: true,
      label: 'Password',
      type: 'password',
      helpText:
        'The password for the account zapier should use to send messages'
    },
    {
      computed: false,
      key: 'serverURL',
      required: true,
      label: 'Server URL',
      type: 'string',
      helpText: 'This is the URL for your Matrix Server, ex: https://matrix.org'
    }
  ],
  sessionConfig: {
    perform: {
      source:
        "const options = {\n  url: bundle.authData.serverURL + '/_matrix/client/r0/login',\n  method: 'POST',\n  headers: {\n\n  },\n  params: {\n\n  },\n  body: {\n    'user': bundle.authData.user,\n    'password': bundle.authData.password,\n    'type': 'm.login.password'\n  }\n}\n\nreturn z.request(options)\n  .then((response) => {\n    response.throwForStatus();\n    const results = z.JSON.parse(response.content);\n\n    // You can do any parsing you need for results here before returning them\n\n    return {\n      'access_token': results.access_token\n    };\n  });"
    }
  }
};
