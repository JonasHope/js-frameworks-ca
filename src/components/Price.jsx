import React from "react";

function ProductPrice({ discountedPrice, price }) {
  if (discountedPrice !== price) {
    return (
      <>
        <div>
          <span className="original-price">${price}</span>
          <b className="discounted-price">${discountedPrice}</b>
        </div>
      </>
    );
  }
  return <b className="price">{price}</b>;
}

export default ProductPrice;
