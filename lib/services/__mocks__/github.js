const exchangeCodeForToken = async (code) => {
  // eslint-disable-next-line
  console.log(`CALLING MOCK exchangeCodeForToken! ${code}`);
  return 'MOCK TOKEN FOR CODE';
};

const getGithubProfile = async (token) => {
  // eslint-disable-next-line
  console.log(`CALLING MOCK getGithubProfile ${token}`);
  return {
    login: 'fake_github_user',
    avatar_url: 'https://www.placecage.com/gif/300/300',
    email: 'not-real@example.com',
  };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
