import React from "react";

function ProductPrice({ discountedPrice, price }) {
  if (discountedPrice !== price) {
    return (
      <>
        <span className="original-price">{price}</span>
        <b className="discounted-price">{discountedPrice}</b>
      </>
    );
  }
  return <b className="price">{price}</b>;
}

export default ProductPrice;
