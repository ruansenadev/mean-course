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
      return res.json(err)
    }
    res.json({ msg: 'User created!', user })
  })
})

router.post('/login', function (req, res, next) {
  User.findOne({ email: req.body.email })
    .exec((err, user) => {
      if (err) { return next(err) }
      if (!user) {
        return res.status(401).json({ msg: 'Auth failed' })
      }
      bcrypt.compare(req.body.password, user.password, (err, isValid) => {
        if (err) { return next(err) }
        if (!isValid) {
          return res.status(401).json({ msg: 'Auth failed' })
        }
        const token = jwt.sign({email: user.email, _id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.json({token})
      })
    })
})

module.exports = router
