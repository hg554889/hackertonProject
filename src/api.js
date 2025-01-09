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
