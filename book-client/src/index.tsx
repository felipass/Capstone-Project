import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Auth0Provider } from '@auth0/auth0-react';
import { authConfig } from './config'
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <Auth0Provider

    domain={authConfig.domain}
    clientId={authConfig.clientId}
    redirectUri={window.location.origin}
    audience='https://books-api-project'>


    <App />



  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
