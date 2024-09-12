require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const booksRoutes = require('./routes/booksRoutes');
const userRoutes = require('./routes/user');
const searchRoutes = require('./routes/search')
const recommendationsRoutes = require('./routes/recommendations');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json('Hello');
});

app.get("/favicon.ico", (req, res) => {
    res.json('favicon');
})

app.use('/api/books', booksRoutes);
app.use('/api/user', userRoutes);
app.use('/api', searchRoutes);
app.use('/api/recommendations', recommendationsRoutes);

app.use("./book-covers", express.static("book-covers"));

app.use(uploadRoutes);

mongoose.connect(process.env.MONG_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Connected and Listening on port ${process.env.PORT}`);
    });
});

module.exports = app;