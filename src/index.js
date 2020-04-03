import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Reset from "./global-styles/reset";
import GlobalStyles from "./global-styles/global";
import { ThemeProvider } from "styled-components";
import siteTheme from "./utils/theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={siteTheme}>
      <Reset />
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
