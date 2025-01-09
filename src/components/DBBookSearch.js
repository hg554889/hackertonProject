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

            {loading && <div>검색 중...</div>}
            {error && <div style={{color: 'red'}}>{error}</div>}

            <BookList>
                {books.map((book) => (
                    <BookCard key={book._id}>
                        <h3>{book.title}</h3>
                        <p>저자: {book.author}</p>
                        <p>출판사: {book.publisher}</p>
                        {book.thumbnail && (
                            <img 
                                src={book.thumbnail} 
                                alt={book.title} 
                                style={{maxWidth: '100px'}}
                            />
                        )}
                    </BookCard>
                ))}
            </BookList>
        </SearchContainer>
    );
}

export default DBBookSearch;