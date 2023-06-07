import React, { useState, useEffect } from "react";
import CartIcon from "../CartIcon";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "../SearchBar";

const NavLinks = styled.li`
  font-size: large;
  font-weight: 600;
  position: relative;
  right: 0;
  transition: right ease 0.5s;
  padding: 10px;
  list-style-type: none;
  margin: 0px 10px;

  &:hover {
    right: -5px;
  }
`;

const SiteHeader = styled.header`
  background-color: ${(props) => props.theme.color.primary};
  padding: 10px;
`;

const Nav = styled.nav`
  padding: 10px;
  max-width: 1100px;
  margin: auto;
`;

const NavUl = styled.ul`
  display: flex;
  padding: 0px;
  margin: 5px 0px;
  align-items: center;
  justify-content: space-between;
`;

const NavDivider = styled.div`
  display: flex;
`;

const url = "https://api.noroff.dev/api/v1/online-shop";

function Header({ cartCount }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getProducts();
  }, []);

  return (
    <SiteHeader>
      <Nav>
        <NavUl>
          <NavDivider>
            <NavLinks>
              <Link to="/">Home</Link>
            </NavLinks>
            <NavLinks>
              <Link to="/ContactPage">Contact</Link>
            </NavLinks>
          </NavDivider>
          <NavLinks>
            <Link to="/cartPage">
              <CartIcon itemCount={cartCount} />
            </Link>
          </NavLinks>
        </NavUl>
        <SearchBar products={products} />
      </Nav>
    </SiteHeader>
  );
}

export default Header;
