import React, { useState, useEffect } from 'react';
import { searchBooks } from '../api';
import BookItem from './BookItem';
import SearchBar from './SearchBar';
import styled from 'styled-components';

const BookListContainer = styled.div`
    padding: 20px;
`;

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState('프론트엔드'); // 초기 검색어
    const [page, setPage] = useState(1);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await searchBooks(query, page);
                setBooks(prevBooks => page === 1 ? data.documents : [...prevBooks, ...data.documents]);
                setIsEnd(data.meta.is_end);
            } catch (error) {
                console.error('도서 정보를 가져오는데 실패했습니다.', error);
            }
        };

        fetchBooks();
    }, [query, page]);

    const handleSearch = (newQuery) => {
        setQuery(newQuery);
        setPage(1); // 검색어 변경 시 page를 1로 초기화
        setBooks([]); // 검색어 변경 시 기존 목록 초기화
    };

    const loadMore = () => {
        if (!isEnd) {
            setPage(prevPage => prevPage + 1);
        }
    };

    // 즐겨찾기 추가 함수
    const addToFavorites = async (book) => {
        try {
            const response = await fetch('/api/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookId: book.isbn, // 도서의 ISBN을 고유 ID로 사용
                    title: book.title,
                    author: book.authors.join(', '), // 저자 리스트를 문자열로 변환
                }),
            });

            if (response.ok) {
                alert(`"${book.title}"가 즐겨찾기에 추가되었습니다!`);
            } else {
                alert('즐겨찾기 추가에 실패했습니다.');
            }
        } catch (error) {
            console.error('즐겨찾기 추가 중 오류가 발생했습니다.', error);
            alert('즐겨찾기 추가 중 오류가 발생했습니다.');
        }
    };

    return (
        <BookListContainer>
            <SearchBar onSearch={handleSearch} />
            {books.map(book => (
                <div key={book.isbn} style={{ marginBottom: '20px' }}>
                    <BookItem book={book} />
                    <button onClick={() => addToFavorites(book)}>즐겨찾기 추가</button>
                </div>
            ))}
            {!isEnd && <button onClick={loadMore}>더 보기</button>}
        </BookListContainer>
    );
};

export default BookList;
