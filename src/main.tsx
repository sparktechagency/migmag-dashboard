import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import React from "react";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </StrictMode>
  );
} else {
  console.error("Root element not found.");
}
