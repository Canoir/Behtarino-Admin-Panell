import './index.css';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import TagManager from 'react-gtm-module';
import reportWebVitals from './reportWebVitals';

const tagManagerArgs = {
  gtmId: 'GTM-PB9SG2B',
  dataLayerName: 'AdminPanelDataLayer'
};

TagManager.initialize(tagManagerArgs);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
