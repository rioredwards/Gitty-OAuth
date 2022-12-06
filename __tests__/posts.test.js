const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const Post = require('../lib/models/Post.js');

const mockUser = {
  email: 'test@example.com',
  password: '123456',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;

  // Create an "agent" that gives us the ability
  // to store cookies between requests in a test
  const agent = request.agent(app);

  // Create a user to sign in with
  const user = await UserService.create({ ...mockUser, ...userProps });

  // ...then sign in
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('posts', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });
  it('POST /api/v1/posts creates a new post with the current user', async () => {
    const [agent, user] = await registerAndLogin();
    const newPost = { text: 'this is a post!' };
    const resp = await agent.post('/api/v1/posts').send(newPost);
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      user_id: user.id,
      text: newPost.text,
      created_at: expect.any(String),
    });
  });

  it('GET /api/v1/posts returns all posts for all Users', async () => {
    // create a user
    const [agent, user] = await registerAndLogin();
    // add a post
    const testPost = await Post.insert({
      text: 'This is a post!',
      user_id: user.id,
    });
    const resp = await agent.get('/api/v1/posts');
    expect(resp.status).toEqual(200);
    expect(resp.body.length).toEqual(1);
    expect(resp.body[0].text).toEqual(testPost.text);
    expect(resp.body[0].user_id).toEqual(testPost.user_id);
  });

  it('GET /api/v1/items should return a 401 if not authenticated', async () => {
    const resp = await request(app).get('/api/v1/posts');
    expect(resp.status).toEqual(401);
  });
});
