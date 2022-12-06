const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
// const authorize = require('../middleware/authorize.js');
const Post = require('../models/Post');

module.exports = Router()
  .get('/', [authenticate], async (req, res, next) => {
    try {
      const posts = await Post.getAll();
      res.json(posts);
    } catch (e) {
      next(e);
    }
  })
  .post('/', [authenticate], async (req, res, next) => {
    try {
      const post = await Post.insert({
        text: req.body.text,
        user_id: req.user.id,
      });
      console.log(post);
      res.json(post);
    } catch (e) {
      next(e);
    }
  });
