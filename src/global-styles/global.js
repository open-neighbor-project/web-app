import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html {
    font-family: sans-serif;
  }

  body {
    background-color: ${({ theme }) => theme.primaryLight};
    color: ${({ theme }) => theme.primaryDark};
  }

  a {
    color: ${({ theme }) => theme.highlight};
  }

  h1,h2,h3 {
    font-weight: 700;
    color: ${({ theme }) => theme.primaryDark};
  }

  h4,h5,h6 {
    color: ${({ theme }) => theme.secondaryDark};
  } 

  p {
    color: ${({ theme }) => theme.secondaryDark};
  }

  section {
    max-width: ${({ theme }) => theme.maxContentWidth};
    margin: auto;
  }
`;

export default GlobalStyles;
