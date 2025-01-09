import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const ErrorMessage = styled.div`
    color: #dc3545;
    margin-top: 10px;
`;

function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // 실제 환경에서는 이 비밀번호를 환경변수나 서버에서 관리해야 합니다
        const ADMIN_PASSWORD = 'admin123'; 

        if (password === ADMIN_PASSWORD) {
            // 로그인 성공 시 세션스토리지에 관리자 상태 저장
            sessionStorage.setItem('isAdmin', 'true');
            navigate('/add-book');
        } else {
            setError('비밀번호가 올바르지 않습니다.');
        }
    };

    return (
        <LoginContainer>
            <h2>관리자 로그인</h2>
            <LoginForm onSubmit={handleSubmit}>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="관리자 비밀번호 입력"
                    required
                />
                <Button type="submit">로그인</Button>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </LoginForm>
        </LoginContainer>
    );
}

export default AdminLogin;