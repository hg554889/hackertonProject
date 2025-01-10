// src/components/HomePage.js
import React, { useState } from 'react';
import styled from 'styled-components';

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  border: 1px solid #d3d3d3;
  padding: 20px;
  background-color: #d3d3d3;

  .main-text {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
    color: #ffffff;
  }

  .search {
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
  }

  .search input {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #000000;
  }

  .search button {
    padding: 8px 16px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .search button:hover {
    background-color: #0056b3;
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


function HomePage({ onSearch }) {
    const [searchText, setSearchText] = useState("");

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSearch(searchText);
        }
    };

    return (
        <div>
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
                    <button onClick={() => onSearch(searchText)}>Search</button>
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
        </div>
    );
}

export default HomePage;
