import React from 'react';
import ReactDOM from 'react-dom/client'; // Using ReactDOM.createRoot
import App from './App.jsx';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

// Use ReactDOM.createRoot instead of ReactDOM.render
ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>
);