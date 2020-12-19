import React from 'react';
import ReactDOM from 'react-dom';
import './scss/reset.scss';
import './scss/index.scss';

import Header from './components/molecules/Header';
import Canvas from './components/molecules/Canvas';
import EditNav from './components/molecules/EditNav';
import Footer from './components/molecules/Footer';

ReactDOM.render(
  <React.StrictMode>
    <Header></Header>
    <div className="container">
      <EditNav></EditNav>
      <Canvas></Canvas>
    </div>
    <Footer></Footer>
  </React.StrictMode>,
  document.getElementById('root')
);
