import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { Store, persist } from "../Toolkit/Store.jsx";
import { Provider } from 'react-redux'
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persist}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
