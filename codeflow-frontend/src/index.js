import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import App from "./App";
import theme from "./utils/Themes/chakraTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}></ChakraProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
