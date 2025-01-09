// src/components/BookItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BookItemContainer = styled.div`
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const BookTitle = styled.h3`
  margin-top: 0;
`;

const BookAuthor = styled.p`
  color: #555;
`;

const BookPrice = styled.p`
  font-weight: bold;
`;

const BookThumbnail = styled.img`
  max-width: 100px;
  max-height: 150px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BookItem = ({ book }) => {
    return (
        <BookItemContainer>
            <Link to={`/book/${book.isbn}`}>
                <BookThumbnail src={book.thumbnail ? book.thumbnail : '/placeholder.png'} alt={book.title} />
                <BookTitle>{book.title}</BookTitle>
                <BookAuthor>
                    저자: {book.authors.join(', ')}
                </BookAuthor>
                <BookPrice>가격: {book.price}원</BookPrice>
            </Link>
        </BookItemContainer>
    );
};

export default BookItem;