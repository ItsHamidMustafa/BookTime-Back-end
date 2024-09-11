const Book = require('../models/Book');
const Search = require('../models/Search');

const search = async (req, res) => {
    const { query } = req.query;

    try {
        const results = await Book.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } },
                { binding: { $regex: query, $options: 'i' } },
                { tags: { $regex: query, $options: 'i' } }
            ]
        });

        if (!results) {
            res.status(200).json({ error: 'No items found' });
            return;
        }

        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const logSearch = async (req, res) => {
    const { query } = req.body;
    const userId = req.user ? req.user._id : null;

    try {
        const searchLog = await Search.create({ query, userId });
        res.status(200).json(searchLog);
    } catch {
        res.status(500).json({ error: 'Failed to log search' });
    }
};


module.exports = {
    search,
    logSearch
};