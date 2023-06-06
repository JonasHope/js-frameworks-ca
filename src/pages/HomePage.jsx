import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductPrice from "../components/Price";
import styled from "styled-components";

const url = "https://api.noroff.dev/api/v1/online-shop";

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1100px;
  margin: auto;
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  height: 550px;
  border-radius: 3px;
  margin: 23px;
  padding: 10px;
  background-color: white;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;

const H1 = styled.h1`
  max-width: 1100px;
  padding: 20px;
  margin: auto;
  text-align: center;
`;

const H2 = styled.h2`
  text-align: center;
`;

const ProductImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await fetch(url);
      const json = await response.json();
      setPosts(json);
    }
    getProducts();
  }, []);

  return (
    <section>
      <H1>Products</H1>
      <CardContainer>
        {posts.map((post) => (
          <Link to={`/ProductPage/${post.id}`}>
            <ProductCard key={post.id}>
              <ProductImage src={post.imageUrl} alt={post.title}></ProductImage>
              <H2>{post.title}</H2>
              <p>{post.description}</p>
              <ProductPrice
                discountedPrice={post.discountedPrice}
                price={post.price}
              />
            </ProductCard>
          </Link>
        ))}
      </CardContainer>
    </section>
  );
}

export default Home;
