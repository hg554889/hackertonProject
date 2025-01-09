// src/components/SearchBar.js
import React, { useState } from 'react';
import styled from 'styled-components';

const SearchForm = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #f0ad4e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <SearchForm onSubmit={handleSubmit}>
            <SearchInput
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="도서 검색"
            />
            <SearchButton type="submit">검색</SearchButton>
        </SearchForm>
    );
};

export default SearchBar;