import React from 'react';
import styled from 'styled-components';
import Header from './header';

const LayoutWrapper = styled.main`
  width: 767px;
  margin: 0 auto;
`;

const Layout: React.FC = ({children}) => {
  return (
    <LayoutWrapper>
      <Header />
      {children}
    </LayoutWrapper>
  );
};

export default Layout;