const Book = require('../models/Book');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const createBook = async (req, res) => {
    const { title, author, pages, price, isbn, binding, publicationDate, description, tags, cover, pdfFile } = req.body;

    try {
        const book = await Book.create({ title, author, pages, price, isbn, binding, publicationDate, description, tags, cover, pdfFile });
        res.status(200).json(book);
    } catch {
        res.status(400).json({ error: "All fields must be filled!" });
    }
}

const deleteBook = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such book! ID is not valid" });
    }

    const book = await Book.findOneAndDelete({ _id: id });

    if (!book) {
        return res.status(400).json({ error: "No such book!" });
    }

    const coverPath = path.join(__dirname, '../book-covers/', book.cover);

    if (fs.existsSync(coverPath)) {
        try {
            fs.unlinkSync(coverPath);
            console.log(`Book cover ${book.cover} deleted successfully`);
        } catch (err) {
            console.error(`Error deleting book cover: ${error.message}`);
        }
    } else {
        console.log(`Book cover ${book.cover} don't exist.`);
    }

    if (book.pdfFile) {
        const pdfFilePath = path.join(__dirname, '../pdf-files/', book.pdfFile);
        if (fs.existsSync(pdfFilePath)) {
            try {
                fs.unlink(pdfFilePath, (err) => {
                    if (err) {
                        return res.status(400).json(err);
                    }

                    res.status(400).json({msg: 'PDF uploaded successfully'});
                });
            } catch (err) {
                return res.status(400).json({error: `Error deleting book PDF: ${book.pdfFile}`});
            }
        } else {
            res.status(400).json({ error: `Book's PDF file ${book.pdfFile} don't exists.` })
        }
    }

    res.status(200).json(book);
}

const updateBook = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such book! ID not valid" });
    }

    const book = await Book.findOneAndUpdate({ _id: id }, {
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages,
        price: req.body.price,
        isbn: req.body.isbn,
        binding: req.body.binding,
        publicationDate: req.body.publicationDate,
        description: req.body.description,
        tags: req.body.tags,
        cover: req.body.cover,
        pdfFile: req.body.pdfFile
    }, { new: true });

    if (!book) {
        res.status(400).json({ error: "No such book!" });
    }
    res.status(200).json(book);
}

module.exports = {
    createBook,
    deleteBook,
    updateBook,
}