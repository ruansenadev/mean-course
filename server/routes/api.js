const express = require('express')
const cors = require('cors')
const Post = require('../models/post')
const router = express.Router()
router.use(cors())

router.get('/posts', function(req, res, next) {
  Post.find()
  .exec((err, posts) => {
    if (err) {return next(err)}
    res.json({msg: "Posts fetched from server", posts})
  })
})

router.post('/posts', function(req, res, next) {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  post.save((err, doc) => {
    if(err) {return next(err)}
    res.json({msg: "Post added to the server", post: doc})
  })
})

router.delete('/posts/:id', function(req, res, next) {
  Post.deleteOne({_id: req.params.id})
  .exec((err) => {
    if(err) {return next(err)}
    res.json({msg: 'Post deleted'})
  })
})

module.exports = router
