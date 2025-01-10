const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },      // 제목
    author: { type: String, required: true },     // 저자
    publisher: { type: String, required: true },  // 출판사
    price: { type: Number, required: true },      // 가격
    description: { type: String }                 // 설명
});

// 검색을 위한 인덱스 생성
bookSchema.index({ title: 'text', author: 'text' });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;