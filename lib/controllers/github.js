const { Router } = require('express');
const {
  exchangeCodeForToken,
  getGithubProfile,
} = require('../services/github');

module.exports = Router()
  .get('/login', (req, res) => {
    // redirect to github login
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  })
  .get('/callback', async (req, res) => {
    // get the code from the URL Search Params
    const { code } = req.query;
    // exchange the code for a token
    const token = await exchangeCodeForToken(code);
    res.json({ token });
    // use the token to get info about the user from Github
    const user = await getGithubProfile(token);
    console.log(user);
    // create a user with that info in our database
    // login the user
    //    create a JWT
    // .  attach the JWT to a cookie
    // .  redirect to a authenticated page
  });
