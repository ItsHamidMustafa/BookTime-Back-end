const mongoose = require('mongoose');

const SearchSchema = new mongoose.Schema({
    query: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Search', SearchSchema);