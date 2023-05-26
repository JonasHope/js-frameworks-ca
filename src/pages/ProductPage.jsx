import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const url = "https://api.noroff.dev/api/v1/online-shop";

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

  const renderPrice = (post) => {
    if (post.discountedPrice !== post.price) {
      return (
        <>
          <span className="original-price">{post.price}</span>
          <b className="discounted-price">{post.discountedPrice}</b>
        </>
      );
    }
    return <b className="price">{post.price}</b>;
  };

  return (
    <section className="home-page">
      <div className="card-container">
        {posts.map((post) => (
          <div className="product-card" key={post.id}>
            <img
              className="product-image"
              src={post.imageUrl}
              alt={post.title}
            ></img>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            {renderPrice(post)}
            <Link to={`/ProductPage/${post.id}`}>
              <button>View Product</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Home;
