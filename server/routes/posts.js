const express = require('express')
const postsController = require('../controllers/postsController')
const jwtAuth = require('../middlewares/auth')
const storeImage = require('../middlewares/storage')
const router = express.Router()
const cors = require('cors')
router.use(cors())

router.get('', postsController.getPosts)
router.post('', jwtAuth, storeImage, postsController.addPost)
router.get('/:id', postsController.getPost)
router.patch('/:id', jwtAuth, storeImage, postsController.editPost)
router.delete('/:id', jwtAuth, postsController.delPost)

module.exports = router
