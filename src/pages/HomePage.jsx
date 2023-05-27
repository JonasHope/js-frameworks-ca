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
    <section className="home-page">
      <CardContainer>
        {posts.map((post) => (
          <Link to={`/ProductPage/${post.id}`}>
            <div className="product-card" key={post.id}>
              <img
                className="product-image"
                src={post.imageUrl}
                alt={post.title}
              ></img>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <ProductPrice
                discountedPrice={post.discountedPrice}
                price={post.price}
              />
            </div>
          </Link>
        ))}
      </CardContainer>
    </section>
  );
}

export default Home;
