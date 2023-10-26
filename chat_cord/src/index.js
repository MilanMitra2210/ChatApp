import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter  ,Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Chat from './Components/chat';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
        <Routes>
          <Route path='/' exact Component={App} />
          <Route path='/chat'  Component={Chat} />
        </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
