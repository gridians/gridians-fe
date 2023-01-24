import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'ClimateCrisisKR-1979';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/ClimateCrisisKR-1979.woff2') format('woff2');
  font-weight: 900;
  font-style: normal;
 }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  body {
    /* line-height: 1.5; */
    margin: 0;
    padding: 0;
    height: 100vh;
    #root{
        width: 100%;
        height: 100%;
    }
  }
  p {
    margin:0;
    padding:0;
  }
  h1 {
    margin:0;
    padding:0;
  }
  button{
    margin:0;
    padding:0;
  }
  a{
    text-decoration: none;
  }
`;

export default GlobalStyle;
