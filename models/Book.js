const mongoose = require('mongoose');

const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isbn: {
        type: Number,
        required: true
    },
    binding: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    cover : {
        type: String,
        required: false
    },
    pdfFile: {
        type: String,
        required: false
    }
});


module.exports = mongoose.model('Books', bookSchema);