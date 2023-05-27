import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductPrice from "../components/Price";

const url = "https://api.noroff.dev/api/v1/online-shop";

const Product = ({ setCartCount }) => {
  const { productId } = useParams();
  const [post, setPosts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await fetch(url + "/" + productId);
      const json = await response.json();
      setPosts(json);
    }
    getProducts();
  }, [productId]);

  const addToCart = () => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
    const cart = JSON.parse(localStorage.getItem("cart"));
    const isProductInCart = cart.find((item) => item.id === post.id);

    if (isProductInCart) {
      alert("Product is already added to the cart.");
    } else {
      cart.push(post);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product added to the cart");
      setCartCount(cart.length);
    }
  };

  return (
    <section>
      <div className="product" key={post.id}>
        <h1>{post.title}</h1>
        <img
          className="product-image"
          src={post.imageUrl}
          alt={post.title}
        ></img>
        <p>
          Rating: <b>{post.rating}</b>
        </p>
        <hr></hr>
        <p>{post.description}</p>
        <ProductPrice
          discountedPrice={post.discountedPrice}
          price={post.price}
        />
        <button onClick={addToCart}>Add to cart</button>
      </div>
    </section>
  );
};

export default Product;
