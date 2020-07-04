const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
  try {
    let token = req.headers.authorization.split(" ")[1]
    token = jwt.verify(token, process.env.JWT_SECRET)
    req.user = {email: token.email, _id: token._id}
    next()
  } catch (error) {
    return res.status(401).json({message: "Auth failed"})
  }
}
