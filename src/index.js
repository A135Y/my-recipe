import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from '@react-oauth/google';
const envVariables = process.env;
const GOOGLE_CLIENT_ID = envVariables.REACT_APP_GOOGLE_CLIENT_ID;


ReactDOM.render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);

reportWebVitals();
