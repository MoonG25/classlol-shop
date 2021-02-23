import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  padding: 35px 0;

  a:not(:first-child) {
    margin-left: 1em;
  }
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Link to="/">home</Link>
      <Link to="/products">products</Link>
      <Link to="/cart">cart</Link>
    </HeaderWrapper>
  );
}