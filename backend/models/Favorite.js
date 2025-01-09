const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    bookId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
