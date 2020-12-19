import React from 'react';
import '../../scss/canvas.scss';

const Canvas: React.FC = () => {
  /* 動的にキャンバスサイズを変える */
  const canvasSize = { width: '50vh', height: '50vh' };
  return (
    <div className="canvas" style={canvasSize}>
      <div className="canvas__inner">
        {/* テキスト・画像を追加するとここに要素が追加 */}
      </div>
    </div>
  )
}

export default Canvas;