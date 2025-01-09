// src/App.js
// main logic
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import Favorites from './components/Favorites';
import DBBookSearch from './components/DBBookSearch';
import AddBook from './components/AddBook';
import AdminLogin from './components/AdminLogin';
import AdminLogout from './components/AdminLogout';
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
                    <div>
                        <Link to="/">Home</Link>
                        <Link to="/favorites">Favorites</Link>
                        <Link to="/db-search">DB 도서 검색</Link>
                        {sessionStorage.getItem('isAdmin') && (
                            <Link to="/add-book">도서 추가</Link>
                        )}
                    </div>
                    {sessionStorage.getItem('isAdmin') && <AdminLogout />}
                </NavBar>
                <Routes>
                    <Route path="/" element={<BookList />} />
                    <Route path="/book/:isbn" element={<BookDetail />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/db-search" element={<DBBookSearch />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/add-book" element={<AddBook />} />
                </Routes>
            </Router>
        </AppContainer>
    );
}

export default App;
