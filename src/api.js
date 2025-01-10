// src/api.js
import axios from 'axios';

const API_KEY = 'a4ef82796297c739eb25c800be53a4e3'; // 카카오 REST API 키
const API_BASE_URL = 'https://dapi.kakao.com/v3/search/book';

export const searchBooks = async (query, page = 1, size = 10) => {
    try {
        const response = await axios.get(API_BASE_URL, {
            headers: {
                Authorization: `KakaoAK ${API_KEY}`, // 이 부분을 확인
            },
            params: {
                query,
                page,
                size,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

// DB에 도서 추가
export const addBookToDB = async (bookData) => {
    try {
        const response = await axios.post('/api/db/books', bookData);
        console.log('도서 추가 응답:', response.data); // 로깅 추가
        return response.data;
    } catch (error) {
        console.error('도서 추가 중 오류:', error);
        throw error;
    }
};

// DB 도서 검색 (카카오 API와 별도)
export const searchDBBooks = async (query) => {
    try {
        const response = await axios.get(`/api/db/books/search`, {
            params: { query }
        });
        return response.data;
    } catch (error) {
        console.error('DB 도서 검색 중 오류:', error);
        throw error;
    }
};

// 전체 도서 목록 조회
export const getAllBooks = async () => {
    try {
        const response = await axios.get('/api/db/books');
        return response.data;
    } catch (error) {
        console.error('도서 목록 조회 중 오류:', error);
        throw error;
    }
};
