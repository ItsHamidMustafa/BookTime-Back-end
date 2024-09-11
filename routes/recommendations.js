const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const Search = require('../models/Search');
const Book = require('../models/Book');

router.get('/', requireAuth, (async (req, res) => {
    const userId = req.user._id;

    try {
        const searchLogs = await Search.find({ userId })

        if (!searchLogs.length) {
            return res.status(200).json({ msg: "No search history found for recommendations!" });
        }

        const searchQueries = searchLogs.map( log => log.query );

        const recommendations = await Book.find({
            $or: [
                {title: { $regex: searchQueries.join('|'), $options: 'i' }},
                {author: { $regex: searchQueries.join('|'), $options: 'i' }},
                {tags: { $regex: searchQueries.join('|'), $options: 'i' }}

            ]
        }).limit(10);

        res.status(200).json(recommendations);
    } catch (err) {
        return res.status(400).json({ error: "Failed to fetch recommendations!"});
    }
}));

module.exports = router;