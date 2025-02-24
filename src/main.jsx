//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router";

import { Provider as UIProvider } from "./components/ui/provider";

import { store } from "./store";

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <ReduxProvider store={store}>
    <UIProvider>
      <BrowserRouter basename="/crud-app">
        <App />
      </BrowserRouter>
    </UIProvider>
  </ReduxProvider>
  // </StrictMode>
);
