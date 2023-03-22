import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CardSlider from './CardSlider'
import BrandLogo from "./BrandLogo";
function Header(props) {
  const navigate = useNavigate();
  return (
    <Container className="brand-container flex a-center j-between">
      <div className="brand-logo">
        <BrandLogo />
      </div>
      <button className="brand-btn" onClick={() => navigate(props.login ? "/login" : "/")}>
        {props.login ? "Sign In" : "Sign Up"}
      </button>
    </Container>
  );
}
const Container = styled.div`
  .logo {
  }
`;
export default Header;
