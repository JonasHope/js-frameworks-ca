import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RenderPrice from "../components/RenderPrice";

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
            <RenderPrice
              discountedPrice={post.discountedPrice}
              price={post.price}
            />
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
