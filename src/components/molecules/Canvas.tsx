import React, { useState } from 'react';
import '../../scss/canvas.scss';

const Canvas: React.FC = () => {
  /* 動的にキャンバスサイズを変える */
  const canvasSize = { width: '50vh', height: '50vh' };

  const [texts, setText] = useState<any>([])

  const addTextElements = (e: React.MouseEvent<HTMLElement>) => {
    const cursor = document.body.style.cursor;
    const left = `${String(e.nativeEvent.offsetX)}px`
    const top = `${String(e.nativeEvent.offsetY)}px`
    if (cursor === 'text') {
      setText([
        ...texts,
        {
          text: 'テキストを入力',
          top,
          left
        }
      ])
    }
  };
  return (
    <div className="canvas" style={canvasSize} onClick={addTextElements}>
      <div className="canvas__inner">
        {/* テキスト・画像を追加するとここに要素が追加 */}
        {texts.map((text: any, index: number) => (
          <div className={`canvas_text${String(index + 1)}`} key={index} style={{top: text.top, left: text.left}}>{text.text}</div>
        ))}
      </div>
    </div>
  )
}

export default Canvas;