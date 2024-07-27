import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { store } from './Store/store.js';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout.jsx';
import LandingPage from './Components/LandingPage.jsx';
import Market from './Components/Market.jsx';
import SingleCoin from './Components/SingleCoin.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="market" element={<Market />} />
            <Route path='/crypto/:id' element={<SingleCoin/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
