import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../redux';

const HeaderWrapper = styled.header`
  padding: 35px 0;

  a:not(:first-child) {
    margin-left: 1em;
  }
`;

const mapStateToProps = (state: RootState) => ({
  count: Object.keys(state.cart.cart).length
});

const connector = connect(mapStateToProps);

type HeaderProps = {
  count: number;
}

const Header: React.FC<HeaderProps> = ({ count }) => {
  return (
    <HeaderWrapper>
      <Link to="/">home</Link>
      <Link to="/products">products</Link>
      <Link to="/cart">cart{count ? `(${count})` : ''}</Link>
    </HeaderWrapper>
  );
};

export default connector(Header);