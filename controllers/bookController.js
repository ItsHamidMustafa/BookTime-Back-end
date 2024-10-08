const Book = require('../models/Book');

const findBooksLimited = async(req, res) => {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);

    res.status(200).json(books);
}

const findBooks = async(req, res) => {
    const books = await Book.find().sort({ createdAt: -1 });

    if(!books) {
        res.status(200).json({ message: 'No books found' });
    }

    res.status(200).json(books);
}

module.exports = {
    findBooksLimited,
    findBooks
}