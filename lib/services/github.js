const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  // make a request to github.com/login.oauth/access_token
  const resp = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // send up the code, the client_id, the client_secret
    body: JSON.stringify({
      client_id: process.env.GH_CLIENT_ID,
      client_secret: process.env.GH_CLIENT_SECRET,
      code,
    }),
  });
  // should get a token back as a response
  const data = await resp.json();
  console.log('=================');
  console.log(data);
  console.log('=================');
  return data.access_token;
};

const getGithubProfile = async (token) => {
  const resp = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  const data = await resp.json();
  return data;
};

module.exports = { exchangeCodeForToken, getGithubProfile };
