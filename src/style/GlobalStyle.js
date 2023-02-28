import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
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
