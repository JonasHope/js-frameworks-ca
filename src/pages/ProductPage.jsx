import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductPrice from "../components/renderPrice";

const url = "https://api.noroff.dev/api/v1/online-shop";

function Product() {
  const { productId } = useParams();
  const newURL = url + "/" + productId;
  const [post, setPosts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await fetch(newURL);
      const json = await response.json();
      setPosts(json);
    }
    getProducts();
  }, []);

  return (
    <section>
      <div className="" key={post.id}>
        <h1>{post.title}</h1>
        <p>Rating: {post.rating}</p>
        <img
          className="product-image"
          src={post.imageUrl}
          alt={post.title}
        ></img>
        <p>{post.description}</p>
        <ProductPrice
          discountedPrice={post.discountedPrice}
          price={post.price}
        />
      </div>
    </section>
  );
}

export default Product;
