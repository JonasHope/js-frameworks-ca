import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductPrice from "../components/Price";
import styled from "styled-components";
import PrimaryButton from "../styles/buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const url = "https://api.noroff.dev/api/v1/online-shop";

const ProductImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;

const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Hr = styled.hr`
  width: 50%;
`;

const ReviewCard = styled.div`
  border-radius: 5px;
  border: 2px solid ${(props) => props.theme.color.primary};
  padding: 15px;
  margin: 5px;
  min-width: 300px;
`;

const ReviewContainer = styled.div`
  margin: 10px;
`;

const ReviewHeader = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
`;

const Product = ({ setCartCount }) => {
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
      setCartCount(cart.length);
    }
  };

  if (product === null) {
    return <div></div>;
  }

  return (
    <section>
      <ProductItem key={product.id}>
        <h1>{product.title}</h1>
        <ProductImage src={product.imageUrl} alt={product.title}></ProductImage>
        <p>
          Rating: <b>{product.rating}</b>
        </p>
        <Hr></Hr>
        <p>{product.description}</p>
        <ProductPrice
          discountedPrice={product.discountedPrice}
          price={product.price}
        />
        <PrimaryButton onClick={addToCart}>Add to cart</PrimaryButton>
        <ReviewContainer>
          <h2>Reviews</h2>
          {product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <ReviewCard key={review.id}>
                <ReviewHeader>
                  <b>
                    {review.rating}{" "}
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                  </b>
                  <b>{review.username}</b>
                </ReviewHeader>
                <p>{review.description}</p>
              </ReviewCard>
            ))
          ) : (
            <p>There are no reviews posted.</p>
          )}
        </ReviewContainer>
      </ProductItem>
    </section>
  );
};

export default Product;
