import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { searchBooks } from '../api';
import styled from 'styled-components';

const BookDetailContainer = styled.div`
    padding: 30px;
    font-family: 'Arial', sans-serif;
    color: #333;
    line-height: 1.6;
    background-color: #f8f8f8;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const BookContent = styled.div`
    display: flex;
    gap: 30px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const BookCover = styled.img`
    width: 250px;
    height: 350px;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;

    @media (max-width: 768px) {
        width: 50%;
        height: auto;
    }
`;

const BookInfo = styled.div`
    flex-grow: 1;
`;

const SectionTitle = styled.h3`
    border-bottom: 3px solid #f0ad4e;
    padding-bottom: 8px;
    margin-top: 0;
    font-size: 1.4em;
    color: #d9534f;
`;

const DataLabel = styled.dt`
    font-weight: bold;
    margin-top: 10px;
    color: #555;
`;

const DataValue = styled.dd`
    margin-left: 0;
    margin-bottom: 15px;
    font-size: 1.1em;
`;

const UrlButton = styled.a`
    display: inline-block;
    background-color: #4285f4;
    color: white;
    padding: 8px 16px;
    margin-top: 10px;
    border-radius: 5px;
    text-decoration: none;
    font-size: 1em;
    transition: background-color: 0.3s ease;

    &:hover {
        background-color: #3367d6;
    }
`;

const BookDetail = () => {
    let { isbn } = useParams();
    const [book, setBook] = useState(null);

    if (isbn.includes(' ')) {
        isbn = isbn.split(' ')[1];
    }

    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                const data = await searchBooks(isbn);
                if (data.documents.length > 0) {
                    setBook(data.documents[0]);
                }
            } catch (error) {
                console.error('도서 상세 정보를 가져오는데 실패했습니다.', error);
            }
        };

        fetchBookDetail();
    }, [isbn]);

    if (!book) {
        return <div>도서 정보를 불러오는 중...</div>;
    }

    return (
        <BookDetailContainer>
            <h2>{book.title}</h2>
            <BookContent>
                <BookCover src={book.thumbnail} alt={book.title} />
                <BookInfo>
                    <SectionTitle>기본 정보</SectionTitle>
                    <dl>
                        <DataLabel>ISBN</DataLabel>
                        <DataValue>{book.isbn}</DataValue>

                        <DataLabel>저자</DataLabel>
                        <DataValue>{book.authors.join(', ')}</DataValue>

                        <DataLabel>출판사</DataLabel>
                        <DataValue>{book.publisher}</DataValue>

                        <DataLabel>출판일</DataLabel>
                        <DataValue>{new Date(book.datetime).toLocaleDateString()}</DataValue>

                        <DataLabel>번역자</DataLabel>
                        <DataValue>{book.translators.length > 0 ? book.translators.join(', ') : '없음'}</DataValue>

                        <DataLabel>정가</DataLabel>
                        <DataValue>{book.price}원</DataValue>

                        <DataLabel>판매가</DataLabel>
                        <DataValue>{book.sale_price}원</DataValue>

                        <DataLabel>판매 상태</DataLabel>
                        <DataValue>{book.status}</DataValue>

                        <DataLabel>URL</DataLabel>
                        <DataValue>
                            <UrlButton href={book.url} target="_blank" rel="noopener noreferrer">
                                도서 URL
                            </UrlButton>
                        </DataValue>
                    </dl>
                </BookInfo>
            </BookContent>
        </BookDetailContainer>
    );
};

export default BookDetail;