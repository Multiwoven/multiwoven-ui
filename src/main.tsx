import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { theme } from './theme'
import "./assets/styles/common_styles.scss"
import { themePro } from "./chakra.config";
const extenstion = {
  colors: {
    ...themePro.colors,
  },
}
const myTheme = extendTheme(extenstion, theme)
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={myTheme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
