import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Message = styled.h1`
  text-align: center;
`;

function Checkout() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate("/");
    }
  }, [countdown, navigate]);

  return (
    <CheckoutContainer>
      <Message>Your purchase was successful!</Message>
      <p>returning to homepage in .. {countdown} seconds</p>
      <Link to="/">
        <button>Take me back to home page</button>
      </Link>
    </CheckoutContainer>
  );
}

export default Checkout;
