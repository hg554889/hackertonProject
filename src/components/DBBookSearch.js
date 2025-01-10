import React, { useState } from 'react';
import { searchDBBooks } from '../api';
import styled from 'styled-components';

const SearchContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
`;

const SearchForm = styled.form`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const SearchButton = styled.button`
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const BookList = styled.div`
    display: grid;
    gap: 20px;
`;

const BookCard = styled.div`
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 4px;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BookTitle = styled.h3`
    margin: 0 0 10px 0;
    color: #333;
`;

const BookInfo = styled.p`
    margin: 5px 0;
    color: #666;
`;

const LoadingMessage = styled.div`
    text-align: center;
    padding: 20px;
    color: #666;
`;

const ErrorMessage = styled.div`
    color: #dc3545;
    padding: 10px;
    border-radius: 4px;
    background-color: #f8d7da;
    margin-bottom: 20px;
`;

function DBBookSearch() {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        try {
            setLoading(true);
            setError(null);
            const data = await searchDBBooks(query);
            setBooks(data);
        } catch (err) {
            setError('검색 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SearchContainer>
            <h2>DB 도서 검색</h2>
            <SearchForm onSubmit={handleSearch}>
                <SearchInput
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="도서 제목 또는 저자 검색"
                />
                <SearchButton type="submit">검색</SearchButton>
            </SearchForm>

            {loading && <LoadingMessage>검색 중...</LoadingMessage>}
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <BookList>
                {books.map((book) => (
                    <BookCard key={book._id}>
                        <BookTitle>{book.title}</BookTitle>
                        <BookInfo>저자: {book.author}</BookInfo>
                        <BookInfo>출판사: {book.publisher}</BookInfo>
                        <BookInfo>가격: {book.price}원</BookInfo>
                        {book.description && (
                            <BookInfo>설명: {book.description}</BookInfo>
                        )}
                    </BookCard>
                ))}
            </BookList>
        </SearchContainer>
    );
}

export default DBBookSearch;