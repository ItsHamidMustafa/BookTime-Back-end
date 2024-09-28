const route = require('express').Router()
const uploadImage = require('../middleware/uploadImage')
const uploadController = require('../controllers/uploadController')
const multer = require('multer');
const path = require('path');
const isAdmin = require('../middleware/isAdmin');
const auth = require('../middleware/requireAuth');
const uploadPDF = require('../middleware/uploadPDF');


route.get('/covers/:filename', (req, res) => {
    const { filename } = req.params;

    const filePath = path.join(__dirname, '../book-covers/', filename);

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(400).json({ error: 'File not found!' });
        }
    });
});

route.get('/ping', (req, res) => {
    res.json('Hello there!');
})

route.post('/cover', auth, isAdmin, (req, res) => {
    uploadImage(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ msg: err.message + ', only 1MB uploads of jpg, jpeg or png are accepted!' });
        } else if (err) {
            return res.status(400).json({ msg: err.message });
        }
        uploadController.uploadCover(req, res);
    });
});

route.get('/pdf-files/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../pdf-files/', filename);

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(400).json({ error: 'File not found!' });
        }
    });
});

route.post("/pdf", auth, isAdmin, (req, res) => {
    uploadPDF(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ msg: err.message + ', only 5MB uploads of PDF are accepted!' });
        } else if (err) {
            return res.status(400).json({ msg: err.message });
        }
        uploadController.uploadPDF(req, res);
    });
});


module.exports = route;