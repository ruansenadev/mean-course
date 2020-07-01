const express = require('express')
const User = require('../models/user')
const cors = require('cors')
const bcrypt = require('bcrypt')
const router = express.Router()
router.use(cors())

router.post('/signup', function(req, res, next) {
  const hash = bcrypt.hashSync(req.body.password, 10)
  const user = new User({
    email: req.body.email,
    password: hash
  })
  user.save((err, user) => {
    if(err) {
      return res.json(err)
    }
    res.json({msg: 'User created!', user})
  })
})

module.exports = router
