const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const router = express.Router()
router.use(cors())

router.post('/signup', function (req, res, next) {
  const hash = bcrypt.hashSync(req.body.password, 10)
  const user = new User({
    email: req.body.email,
    password: hash
  })
  user.save((err, user) => {
    if (err) {
      return res.status(502).json({message: "E-mail já cadastrado"})
    }
    res.json({ message: 'Usuário criado!', user })
  })
})

router.post('/login', function (req, res) {
  User.findOne({ email: req.body.email })
    .exec((err, user) => {
      if (err) { return res.status(500).json({message: "Falha ao buscar usuário"}) }
      if (!user) {
        return res.status(401).json({ message: 'E-mail não cadastrado' })
      }
      bcrypt.compare(req.body.password, user.password, (err, isValid) => {
        if (err) { return res.status(401).json({ message: 'Credenciais inválidas' }) }
        if (!isValid) {
          return res.status(401).json({ message: 'Senha incorreta' })
        }
        const token = jwt.sign({email: user.email, _id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.json({token, expiresIn: (1 * 3600 * 1000), _id: user._id})
      })
    })
})

module.exports = router
