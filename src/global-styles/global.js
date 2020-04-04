import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
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
    padding-left: 1em;
    padding-right: 1em;
    max-width: ${({ theme }) => theme.maxContentWidth};
    margin: auto;
  }
`;

export default GlobalStyles;
