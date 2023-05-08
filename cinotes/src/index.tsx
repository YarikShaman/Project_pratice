import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <GoogleOAuthProvider clientId={"184297119751-q3slghtjb995d54itm4bl8e7lrna6h90.apps.googleusercontent.com"}>
          <App />
          </GoogleOAuthProvider>
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
