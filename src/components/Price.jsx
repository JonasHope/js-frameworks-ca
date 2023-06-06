import React from "react";
import styled from "styled-components";

const OriginalPrice = styled.span`
  text-decoration: line-through;
  padding-right: 10px;
  color: grey;
`;

const DiscountPercentage = styled.b`
  color: red;
`;

const NewPrice = styled.b`
  display: flex;
  padding: 10px;
  justify-content: center;
  font-size: large;
`;

const DiscountContainer = styled.div`
  display: flex;
  justify-content: center;
`;

function ProductPrice({ discountedPrice, price }) {
  const percentageDifference = ((price - discountedPrice) / price) * 100;
  const formattedPercentageDifference = percentageDifference.toFixed(0);
  if (discountedPrice !== price) {
    return (
      <>
        <div>
          <DiscountContainer>
            <DiscountPercentage>
              {" "}
              {formattedPercentageDifference}% Discount
            </DiscountPercentage>
          </DiscountContainer>
          <NewPrice>
            <OriginalPrice>${price}</OriginalPrice>${discountedPrice}
          </NewPrice>
        </div>
      </>
    );
  }
  return <NewPrice>${price}</NewPrice>;
}

export default ProductPrice;
