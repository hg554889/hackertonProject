import React, { useState } from 'react';
import { addBookToDB } from '../api';
import styled from 'styled-components';

const AddBookContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
`;

const BookForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const SubmitButton = styled.button`
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #218838;
    }
`;

function AddBook() {
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        isbn: '',
        publisher: '',
        price: '',
        thumbnail: '',
        description: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // price를 숫자로 변환
            const formattedData = {
                ...bookData,
                price: Number(bookData.price)
            };
            
            await addBookToDB(formattedData);
            setMessage('도서가 성공적으로 추가되었습니다!');
            // 폼 초기화
            setBookData({
                title: '',
                author: '',
                isbn: '',
                publisher: '',
                price: '',
                thumbnail: '',
                description: ''
            });
        } catch (error) {
            setMessage('도서 추가 중 오류가 발생했습니다.');
        }
    };

    return (
        <AddBookContainer>
            <h2>도서 추가</h2>
            <BookForm onSubmit={handleSubmit}>
                <FormGroup>
                    <label>제목</label>
                    <Input
                        type="text"
                        name="title"
                        value={bookData.title}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <label>저자</label>
                    <Input
                        type="text"
                        name="author"
                        value={bookData.author}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <label>ISBN</label>
                    <Input
                        type="text"
                        name="isbn"
                        value={bookData.isbn}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <label>출판사</label>
                    <Input
                        type="text"
                        name="publisher"
                        value={bookData.publisher}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>가격</label>
                    <Input
                        type="number"
                        name="price"
                        value={bookData.price}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>썸네일 URL</label>
                    <Input
                        type="url"
                        name="thumbnail"
                        value={bookData.thumbnail}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>설명</label>
                    <textarea
                        name="description"
                        value={bookData.description}
                        onChange={handleChange}
                        style={{ padding: '8px', borderRadius: '4px' }}
                    />
                </FormGroup>
                <SubmitButton type="submit">도서 추가</SubmitButton>
            </BookForm>
            {message && (
                <div style={{ 
                    marginTop: '20px', 
                    padding: '10px', 
                    backgroundColor: message.includes('성공') ? '#d4edda' : '#f8d7da',
                    color: message.includes('성공') ? '#155724' : '#721c24',
                    borderRadius: '4px'
                }}>
                    {message}
                </div>
            )}
        </AddBookContainer>
    );
}

export default AddBook;