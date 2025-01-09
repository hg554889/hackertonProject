// src/App.js
// main logic
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import Favorites from './components/Favorites'; // 즐겨찾기 페이지 추가
import styled from "styled-components";

const AppContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
`;

const NavBar = styled.nav`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    a {
        text-decoration: none;
        color: #007bff;
        font-weight: bold;
        margin-right: 15px;
    }

    a:hover {
        text-decoration: underline;
    }
`;

function App() {
    return (
        <AppContainer>
            <Router>
                <NavBar>
                    <Link to="/">Home</Link>
                    <Link to="/favorites">Favorites</Link> {/* 즐겨찾기 링크 추가 */}
                </NavBar>
                <Routes>
                    <Route path="/" element={<BookList />} />
                    <Route path="/book/:isbn" element={<BookDetail />} />
                    <Route path="/favorites" element={<Favorites />} /> {/* 즐겨찾기 라우트 추가 */}
                </Routes>
            </Router>
        </AppContainer>
    );
}

export default App;