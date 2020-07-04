const Post = require('../models/post')

exports.getPost = function (req, res) {
  Post.findById(req.params.id)
    .exec((err, post) => {
      if (err) { return res.status(400).json({ message: "Post não encontrado" }) }
      res.json(post)
    })
}
exports.getPosts = function (req, res) {
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
}
exports.addPost = function (req, res) {
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
}
exports.editPost = function (req, res) {
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
}
exports.delPost = function (req, res) {
  Post.deleteOne({ _id: req.params.id, author: req.user._id }).exec((err, result) => {
    if (err) { return res.status(401).json({ message: "É necessário estar logado!" }) }
    if (result.n) {
      res.json({ message: 'Post deleted' })
    } else {
      res.status(400).json({ message: "O Autor não é o mesmo." })
    }
  })
}
