import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  padding: 15px;

  a:not(:first-child) {
    margin-left: 1em;
  }
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Link to="/">index</Link>
      <Link to="/products">products</Link>
      <Link to="/cart">cart</Link>
      <Link to="/error">error</Link>
    </HeaderWrapper>
  );
}