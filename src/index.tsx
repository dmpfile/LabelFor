import React from 'react';
import ReactDOM from 'react-dom';
import './scss/reset.scss';
import './scss/index.scss';

import Header from './components/molecules/Header';
import Footer from './components/molecules/Footer';

ReactDOM.render(
  <React.StrictMode>
    <Header></Header>
    <Footer></Footer>
  </React.StrictMode>,
  document.getElementById('root')
);
