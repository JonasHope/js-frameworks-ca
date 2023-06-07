import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0px 20px;
  margin: 10px;
`;

const SearchInput = styled.input`
  padding: 8px 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SearchResults = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 50vh;
  padding: 10px;
  background-color: ${(props) => props.theme.color.primary};
  list-style-type: none;
  font-size: 14px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
  box-shadow: 0px 15px 10px -15px #ccc;
`;

const SearchResultItem = styled.li`
  padding: 5px;
  margin: 10px 0px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.color.secondary});
  border-radius: 5px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ProductImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

const ProductTitle = styled.p`
  padding: 5px;
`;

const SearchBar = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isInputFocused, setInputFocused] = useState(false);
  const searchInputRef = useRef(null);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredResults = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setInputFocused(false);
    }, 200);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search products"
        id="searchbar"
        value={searchQuery}
        onChange={handleSearch}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={searchInputRef}
      />
      {isInputFocused && searchQuery.length > 0 && (
        <SearchResults>
          {searchResults.map((product) => (
            <Link to={`/ProductPage/${product.id}`} key={product.id}>
              <SearchResultItem key={product.id}>
                <ProductImg
                  src={product.imageUrl}
                  alt={product.title}
                ></ProductImg>
                <ProductTitle>{product.title}</ProductTitle>
              </SearchResultItem>
            </Link>
          ))}
        </SearchResults>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
