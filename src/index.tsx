import React from 'react';
import { useState }  from 'react';
import { render } from 'react-dom';
import './scss/reset.scss';
import './scss/index.scss';

import Header from './components/molecules/Header';
import EditNav from './components/molecules/EditNav';
import Canvas from './components/molecules/Canvas';
import Footer from './components/molecules/Footer';

const App: React.FC = () => {
  const [canvasSize, setCanvasSize] = useState<any>({ width: '700px', height: '700px'})
  const [fineName, setFileName] = useState<any>('untitled')

  return(
    <>
      <Header canvasSize={canvasSize} setCanvasSize={setCanvasSize} setFileName={setFileName}></Header>
      <div className="container">
        <EditNav fileName={fineName}></EditNav>
        <Canvas canvasSize={canvasSize}></Canvas>
      </div>
      <Footer></Footer>
    </>
  );
}

render (
  <App/>,
  document.getElementById('root')
)
