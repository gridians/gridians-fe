import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SUIT-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  &::-webkit-scrollbar {
    width: 10px;
    background-color: #0E0909;
  }
  &::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 10px;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font-family:'SUIT-Regular' ;
    #root{
        /* width: 100%;
        height: 100%; */
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
