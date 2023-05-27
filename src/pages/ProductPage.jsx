import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RenderPrice from "../components/RenderPrice";

const url = "https://api.noroff.dev/api/v1/online-shop";

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function getProduct() {
      const response = await fetch(url + "/" + productId);
      const data = await response.json();
      setProduct(data);
    }
    getProduct();
  }, [productId]);

  const addToCart = () => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
    const cart = JSON.parse(localStorage.getItem("cart"));
    const isProductInCart = cart.find((item) => item.id === product.id);

    if (isProductInCart) {
      alert("Product is already added to the cart.");
    } else {
      const productWithQuantity = { ...product, quantity: 1 };
      cart.push(productWithQuantity);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product added to the cart");
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className="product" key={product.id}>
        <h1>{product.title}</h1>
        <img
          className="product-image"
          src={product.imageUrl}
          alt={product.title}
        ></img>
        <p>
          Rating: <b>{product.rating}</b>
        </p>
        <hr />
        <p>{product.description}</p>
        <RenderPrice
          discountedPrice={product.discountedPrice}
          price={product.price}
        />
        <button onClick={addToCart}>Add to cart</button>
      </div>
    </section>
  );
}

export default Product;
