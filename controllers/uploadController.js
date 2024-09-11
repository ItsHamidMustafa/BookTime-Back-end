const User = require('../models/User');

const uploadController = {
    uploadCover: async (req, res) => {

        const filename = req.file.filename;

        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded or invalid file type!' });
        }
        return res.status(200).json({ msg: 'Book Cover uploaded successfully', filename });
    },
    deleteCover: async (req, res) => {
        console.log('Book Cover')
    },
    uploadPDF: async (req, res) => {
        const filename = req.file.filename;

        if (!req.file) {
            return res.status(400).json({ msg: 'No PDF file uploaded or invalid file type!' });
        }
        return res.status(200).json({ msg: 'PDF uploaded successfully', filename });
    },
    deletePDF: async (req, res) => {
        const { filename } = req.params;
        const filePath = path.join(__dirname, '../pdf-files/', filename);

        fs.unlink(filePath, (err) => {
            if (err) {
                return res.status(400).json({ msg: 'PDF file not found!' });
            }
            return res.status(200).json({ msg: 'PDF deleted successfully' });
        });
    }
}

module.exports = uploadController;