import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // useNavigate 추가
import { searchBooks } from "../api";
import styled from "styled-components";

const SearchPageContainer = styled.div`
    padding: 20px;
    font-family: "Arial", sans-serif;
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

const SearchBar = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    gap: 10px;

    input {
        padding: 8px;
        font-size: 16px;
        width: 300px;
        border: 1px solid #d3d3d3;
        border-radius: 4px;
    }

    button {
        padding: 8px 16px;
        font-size: 16px;
        background-color: #858bd6;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            background-color: #6c70c6;
        }
    }
`;

const BookGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
`;

const BookCard = styled.div`
    border: 1px solid #d3d3d3;
    border-radius: 8px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    img {
        width: 120px;
        height: 174px;
        object-fit: cover;
        margin-bottom: 10px;
        border-radius: 4px;
    }

    .book-title {
        font-weight: bold;
        margin-bottom: 5px;
        font-size: 0.9rem;
    }

    .book-author, .book-publisher {
        color: #666;
        font-size: 0.8rem;
        margin-bottom: 5px;
    }

    .book-price {
        color: #858bd6;
        font-weight: bold;
        font-size: 0.9rem;
        margin-bottom: 10px;
    }

    button {
        padding: 5px 10px;
        background-color: #858bd6;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.8rem;

        &:hover {
            background-color: #6c70c6;
        }
    }
`;

const LoadMoreButton = styled.button`
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #858bd6;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        background-color: #6c70c6;
    }
`;

const SearchPage = () => {
    const [books, setBooks] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchText, setSearchText] = useState(searchParams.get("query") || "");
    const [page, setPage] = useState(1);
    const [isEnd, setIsEnd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const query = searchParams.get("query");
        if (query) {
            setSearchText(query);
            fetchBooks(query);
        }
    }, [searchParams]);

    const fetchBooks = async (query, newPage = 1) => {
        if (!query) return;

        try {
            setLoading(true);
            setError(null);
            const data = await searchBooks(query, newPage);

            if (newPage === 1) {
                setBooks(data.documents);
            } else {
                setBooks(prevBooks => [...prevBooks, ...data.documents]);
            }

            setIsEnd(data.meta.is_end);
            setPage(newPage);
        } catch (error) {
            console.error("도서 검색 중 오류가 발생했습니다.", error);
            setError("도서 검색 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (searchText.trim()) {
            setSearchParams({ query: searchText });
            setPage(1);
            fetchBooks(searchText, 1);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const loadMore = () => {
        if (!isEnd && !loading) {
            const nextPage = page + 1;
            fetchBooks(searchText, nextPage);
        }
    };

    const addToFavorites = async (book) => {
        try {
            const response = await fetch("/api/favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bookId: book.isbn,
                    title: book.title,
                    author: book.authors.join(", "),
                }),
            });

            if (response.ok) {
                alert(`"${book.title}"가 즐겨찾기에 추가되었습니다!`);
            } else {
                alert("즐겨찾기 추가에 실패했습니다.");
            }
        } catch (error) {
            console.error("즐겨찾기 추가 중 오류가 발생했습니다.", error);
            alert("즐겨찾기 추가 중 오류가 발생했습니다.");
        }
    };

    const handleBookClick = (isbn) => {
        navigate(`/book/${isbn}`); // 클릭 시 BookDetail 페이지로 이동
    };

    return (
        <SearchPageContainer>
            <SearchBar>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearch}>Search</button>
            </SearchBar>

            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}

            <BookGrid>
                {books.map((book) => (
                    // BookCard를 클릭 가능한 div로 변경하고 onClick 이벤트 핸들러 추가
                    <div onClick={() => handleBookClick(book.isbn)} key={book.isbn} style={{ cursor: 'pointer' }}>
                        <BookCard>
                            <img
                                src={book.thumbnail || '/placeholder.png'}
                                alt={book.title}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/placeholder.png';
                                }}
                            />
                            <div className="book-title">{book.title}</div>
                            <div className="book-author">{book.authors.join(", ")}</div>
                            <div className="book-publisher">{book.publisher}</div>
                            {book.price > 0 && (
                                <div className="book-price">{book.price.toLocaleString()}원</div>
                            )}
                            <button onClick={(event) => {
                                event.stopPropagation(); // 이벤트 버블링 중지
                                addToFavorites(book);
                            }}>
                                즐겨찾기 추가
                            </button>
                        </BookCard>
                    </div>
                ))}
            </BookGrid>

            {!isEnd && !loading && books.length > 0 && (
                <LoadMoreButton onClick={loadMore}>
                    더 보기
                </LoadMoreButton>
            )}
            {loading && <div style={{ textAlign: 'center' }}>로딩 중...</div>}
        </SearchPageContainer>
    );
};

export default SearchPage;