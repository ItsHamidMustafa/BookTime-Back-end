const express = require('express');
const isAdmin = require('../middleware/isAdmin');
const { findBooksLimited, findBooks } = require('../controllers/bookController');
const { createBook, deleteBook, updateBook, uploadCover } = require('../controllers/adminController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.get('/fetch-latest', findBooksLimited);
router.get('/', findBooks);
router.use(requireAuth);
router.post('/', isAdmin, createBook);
router.delete('/:id', isAdmin, deleteBook);
router.patch('/:id', isAdmin,updateBook);

module.exports = router;