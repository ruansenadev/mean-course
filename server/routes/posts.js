const express = require('express')
const cors = require('cors')
const multer = require('multer')
const Post = require('../models/post')
const router = express.Router()
router.use(cors())
const MIME_TYPES = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const upload = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!MIME_TYPES[file.mimetype]) {
      cb(new Error('invalid mime type'))
    } else {
      cb(null, 'server/images')
    }
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-')
    cb(null, `${name}-${Date.now()}.${MIME_TYPES[file.mimetype]}`)
  }
})


router.get('', function (req, res, next) {
  Post.find()
    .exec((err, posts) => {
      if (err) { return next(err) }
      res.json({ msg: "Posts fetched from server", posts })
    })
})

router.post('', multer({ storage: upload }).single("image"), function (req, res, next) {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  post.save((err, post) => {
    if (err) { return next(err) }
    res.json({ msg: "Post added to the server", post })
  })
})

router.get('/:id', function (req, res, next) {
  Post.findById(req.params.id)
    .exec((err, post) => {
      if (err) { return next(err) }
      res.json(post)
    })
})

router.patch('/:id', multer({ storage: upload }).single('image'), function (req, res, next) {
  let post = {
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
    imagePath: req.body.imagePath || `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  Post.updateOne({ _id: req.params.id }, post).exec((err) => {
    if (err) { return next(err) }
    res.json({ msg: "Post updated" })
  })
})

router.delete('/:id', function (req, res, next) {
  Post.deleteOne({ _id: req.params.id })
    .exec((err) => {
      if (err) { return next(err) }
      res.json({ msg: 'Post deleted' })
    })
})

module.exports = router
