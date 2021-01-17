import React from 'react';
import ReactDOM from 'react-dom';
import './scss/reset.scss';
import './scss/index.scss';

import Header from './components/molecules/Header';
import EditNav from './components/molecules/EditNav';
import Canvas from './components/molecules/Canvas';
import Footer from './components/molecules/Footer';

ReactDOM.render(
  <>
    <Header></Header>
    <div className="container">
      <EditNav></EditNav>
      <Canvas></Canvas>
    </div>
    <Footer></Footer>
  </>,
  document.getElementById('root')
);
