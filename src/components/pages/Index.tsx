import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const IndexPageWrapper = styled.div`
  position: relative;
  .service-hint {
    background-color: beige;
    height: 410px;
    padding: 15px;
    p {
      font-size: 48px;
      font-weight: bold;
      margin: 15px;
    }
    p:nth-child(1) {
      // color: dodgerblue;
    }
    p:nth-child(2) {
      // color: mediumvioletred;
    }
    p:nth-child(3) {
      // color: yellowgreen;
    }
  }
`;

const StyledLink = styled(Link)`
  position: absolute;
  right: 30px;
  bottom: 30px;
  border: 2px solid darkviolet;
  padding: 15px 20px;
  border-radius: 7px;
  font-size: 22px;
  color: darkviolet;

  :hover {
    background-color: darkviolet;
    color: white;
  }
`;

const IndexPage = () => {
  return (
    <IndexPageWrapper>
      <div className="service-hint">
        <p>보고</p>
        <p>듣고</p>
        <p>배우고</p>
        <StyledLink to="/products">보러가기</StyledLink>
      </div>
    </IndexPageWrapper>
  );
};

export default IndexPage;