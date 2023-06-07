import React from "react";
import { styled } from "styled-components";

const SiteFooter = styled.footer`
  background-color: ${(props) => props.theme.color.primary};
  padding: 20px;
  margin-top: 10px;
  text-align: center;
`;

function Footer() {
  return <SiteFooter>Copyright © Jonas Hope 2023</SiteFooter>;
}

export default Footer;
