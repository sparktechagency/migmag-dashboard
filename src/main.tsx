import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import React from "react";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
} else {
  console.error("Root element not found.");
}
