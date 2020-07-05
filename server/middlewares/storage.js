const multer = require('multer')

const IMAGE_MIME_TYPES = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const upload = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!IMAGE_MIME_TYPES[file.mimetype]) {
      cb(new Error('invalid image type'))
    } else {
      cb(null, 'images')
    }
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-')
    cb(null, `${name}-${Date.now()}.${IMAGE_MIME_TYPES[file.mimetype]}`)
  }
})

module.exports = multer({ storage: upload }).single("image")
