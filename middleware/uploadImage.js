const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './book-covers/')
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
})

const filerFilter = (req, file, cb) => {

    if (
        file.mimetype.includes('jpeg') ||
        file.mimetype.includes('jpg') ||
        file.mimetype.includes('png')
    ) {
        cb(null, true)
    } else {
        cb(new Error('nsupported file type (Only jpg, jpeg, or png allowed'), false);
    }
};

let upload = multer({
    storage: storage,
    fileFilter: filerFilter,
    limits: { fileSize: 1024 * 1024 }
})

module.exports = upload.single('cover');