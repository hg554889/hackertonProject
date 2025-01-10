const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const Favorite = require('./models/Favorite');
const Book = require('./models/Book');

// 미들웨어 설정
app.use(cors()); // CORS 문제 방지
app.use(express.json()); // JSON 요청 본문 파싱

// MongoDB 연결
mongoose.connect('mongodb+srv://hg554889:kimhungjin88@cluster0.pc1hb.mongodb.net/todo-api?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));

// API 라우트들
app.get('/api/books', (req, res) => {
    const books = [
        { id: 1, title: 'React for Beginners', author: 'John Doe' },
        { id: 2, title: 'Node.js in Action', author: 'Jane Smith' },
    ];
    res.json(books);
});

// 즐겨찾기 추가
app.post('/api/favorites', async (req, res) => {
    const { bookId, title, author } = req.body;
    try {
        const newFavorite = new Favorite({ bookId, title, author });
        await newFavorite.save();
        res.status(201).json({ message: 'Favorite added successfully!', favorite: newFavorite });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add favorite' });
    }
});

// 즐겨찾기 조회
app.get('/api/favorites', async (req, res) => {
    try {
        const favorites = await Favorite.find();
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
});

// 즐겨찾기 삭제
app.delete('/api/favorites/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Favorite.findByIdAndDelete(id);
        res.json({ message: 'Favorite deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete favorite' });
    }
});

// DB에 도서 추가 API
app.post('/api/db/books', async (req, res) => {
    try {
        // 새 도서 생성
        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher,
            price: Number(req.body.price),
            description: req.body.description
        });

        // DB에 저장
        const savedBook = await newBook.save();
        
        console.log('도서 추가 성공:', savedBook); // 로깅 추가

        res.status(201).json({
            success: true,
            data: savedBook,
            message: '도서가 성공적으로 추가되었습니다.'
        });
    } catch (error) {
        console.error('도서 추가 중 오류:', error); // 자세한 에러 로깅
        res.status(500).json({ 
            success: false,
            error: '도서 추가 중 오류가 발생했습니다.',
            details: error.message 
        });
    }
});

// DB 도서 검색 API
app.get('/api/db/books/search', async (req, res) => {
    const { query } = req.query;
    try {
        const books = await Book.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });
        
        console.log('검색된 도서 수:', books.length); // 로깅 추가
        res.json(books);
    } catch (error) {
        console.error('도서 검색 중 오류:', error);
        res.status(500).json({ error: '도서 검색 중 오류가 발생했습니다.' });
    }
});

// 전체 도서 목록 조회 API 추가
app.get('/api/db/books', async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.json(books);
    } catch (error) {
        console.error('도서 목록 조회 중 오류:', error);
        res.status(500).json({ error: '도서 목록 조회 중 오류가 발생했습니다.' });
    }
});

// 정적 파일 서빙 설정 - API 라우트 다음에 위치
app.use(express.static(path.join(__dirname, '../build')));

// React 앱의 모든 라우트를 처리하는 와일드카드 라우트는 맨 마지막에 위치
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
