const express = require('express')
const cors = require('cors')
const jwtAuth = require('../middlewares/auth')
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

router.get('', function (req, res) {
  const items = +req.query.items || 4
  const left = +req.query.left || 0
  Post.countDocuments({}).then(count => {
    Post.find()
      .skip(left * items)
      .limit(items)
      .exec((err, posts) => {
        if (err) { return res.status(502).json({message: "Erro ao buscar posts"}) }
        res.json({ message: `${items} posts fetched, ${left * items} behind.`, posts, postsCount: count })
      })
  }).catch((err) => { res.status(502).json({message: "Erro ao buscar posts"}) })
})

router.post('', jwtAuth, multer({ storage: upload }).single("image"), function (req, res, next) {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    author: req.user._id
  })
  post.save((err, post) => {
    if (err) { return res.status(401).json({ message: "É necessário estar logado!" }) }
    res.json({ message: "Post adicionado", post })
  })
})

router.get('/:id', function (req, res) {
  Post.findById(req.params.id)
    .exec((err, post) => {
      if (err) { return res.status(400).json({ message: "Post não encontrado" }) }
      res.json(post)
    })
})

router.patch('/:id', jwtAuth, multer({ storage: upload }).single('image'), function (req, res) {
  let post = {
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
    imagePath: req.body.imagePath || `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  Post.updateOne({ _id: req.params.id, author: req.user._id }, post).exec((err, result) => {
    if (err) { return res.status(401).json({ message: "É necessário estar logado!" }) }
    if (result.nModified) {
      res.json({ message: "Post atualizado" })
    } else {
      res.status(400).json({ message: "O Autor não é o mesmo." })
    }
  })
})

router.delete('/:id', jwtAuth, function (req, res) {
  Post.deleteOne({ _id: req.params.id, author: req.user._id }).exec((err, result) => {
    if (err) { return res.status(401).json({ message: "É necessário estar logado!" }) }
    if (result.n) {
      res.json({ message: 'Post deleted' })
    } else {
      res.status(400).json({ message: "O Autor não é o mesmo." })
    }
  })
})

module.exports = router
