import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import BookDetail from "./components/BookDetail";
import Favorites from "./components/Favorites";
import DBBookSearch from "./components/DBBookSearch";
import AddBook from "./components/AddBook";
import AdminLogin from "./components/AdminLogin";
import SearchPage from "./components/SearchPage";
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
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #d3d3d3;
    margin-bottom: 20px;

    .nav-left {
        display: flex;
        align-items: center;
    }

    .nav-left img {
        width: 24px;
        height: 24px;
        margin-right: 8px;
    }

    .nav-center {
        font-weight: bold;
    }

    .nav-right img {
        width: 24px;
        height: 24px;
        margin-left: 15px;
    }

    a {
        text-decoration: none;
        color: #9fb3d9;
        font-weight: bold;
        margin-right: 15px;
    }

    a:hover {
        text-decoration: underline;
    }
`;

const MainSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
    border: 1px solid #d3d3d3;
    padding: 20px;

    .main-text {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 16px;
    }

    .search {
        display: flex;
        gap: 10px;
        margin-bottom: 16px;
    }

    .search input {
        padding: 8px;
        font-size: 16px;
        width: 300px;
        border: 1px solid #d3d3d3;
        border-radius: 4px;
    }

    .search button {
        padding: 8px 16px;
        font-size: 16px;
        background-color: #858bd6;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .search button:hover {
        background-color: #6c70c6;
    }
`;

const Section = styled.div`
    margin-bottom: 30px;
    border: 1px solid #d3d3d3;
    padding: 20px;

    h2 {
        font-size: 20px;
        margin-bottom: 16px;
    }

    .books {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
    }

    .book {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .book-placeholder {
        width: 100%;
        max-width: 150px;
        height: 100px;
        border: 1px solid #d3d3d3;
        margin-bottom: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
    }
`;

function MainContent() {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearch = () => {
        if (searchText.trim()) {
            navigate(`/search?query=${searchText}`);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <>
            <MainSection>
                <div className="main-text">AI로 이미지 가져오기</div>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </MainSection>

            <Section>
                <h2>전공 서적</h2>
                <div className="books">
                    {[1, 2, 3, 4].map((_, index) => (
                        <div className="book" key={index}>
                            <div className="book-placeholder">이미지 예시 (title)</div>
                        </div>
                    ))}
                </div>
            </Section>

            <Section>
                <h2>전공외 서적</h2>
                <div className="books">
                    {[1, 2, 3, 4].map((_, index) => (
                        <div className="book" key={index}>
                            <div className="book-placeholder">이미지 예시 (title)</div>
                        </div>
                    ))}
                </div>
            </Section>
        </>
    );
}

function App() {
    return (
        <Router>
            <AppContainer>
                <NavBar>
                    <div className="nav-left">
                        <img src="/icons/home-icon.png" alt="Home Icon" />
                        <Link to="/">HOME</Link>
                    </div>
                    <div className="nav-center">Icon (및 Title)</div>
                    <div className="nav-right">
                        <Link to="/favorites">
                            <img src="/icons/heart-icon.png" alt="Favorites" />
                        </Link>
                    </div>
                </NavBar>

                <Routes>
                    <Route path="/" element={<MainContent />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/book/:isbn" element={<BookDetail />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/db-search" element={<DBBookSearch />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/add-book" element={<AddBook />} />
                </Routes>
            </AppContainer>
        </Router>
    );
}

export default App;