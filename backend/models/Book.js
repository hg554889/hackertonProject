const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    publisher: { type: String },
    price: { type: Number },
    thumbnail: { type: String },
    description: { type: String }
}, {
    timestamps: true // 생성/수정 시간 자동 기록
});

// 검색을 위한 인덱스 생성
bookSchema.index({ title: 'text', author: 'text' });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;