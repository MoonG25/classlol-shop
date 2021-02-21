import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const theme = {
  color: {
    primary: '#123456',
    secondary: '#654321',
  },
};

export const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    color: #111;
    background-color: #fff;
    font-family: 'NanumSquare', sans-serif;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  h1 {
    font-size: 24px;
    margin: 2px 0;
  }
  h2 {
    font-size: 22px;
  }
  h3 {
    font-size: 20px;
  }
  h4 {
    font-size: 16px;
  }
  h5 {
    font-size: 14px;
  }
`;