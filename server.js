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
    res.json(`Hello`);
});

app.get("/favicon.ico", (req, res) => {
    res.json('no favicon');
})

app.get("/favicon.png", (req, res) => {
    res.json('no favicon');
})

app.use('/api/books', booksRoutes);
app.use('/api/user', userRoutes);
app.use('/api/uploader', uploadRoutes);
app.use('/api/recommendations', recommendationsRoutes);
app.use('/api/search', searchRoutes);

app.use("./book-covers", express.static("book-covers"));


mongoose.connect(process.env.MONG_URI, {
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected and Listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
  });

module.exports = app;