import * as React from 'react';
import {useState}  from 'react';
import '../../scss/canvas.scss';
import Draggable from 'react-draggable';

const Canvas: React.FC = () => {
  /* 動的にキャンバスサイズを変える */
  const canvasSize = { width: '50vh', height: '50vh' };
  const [texts, setText] = useState<any>([])

  const addTextElements = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.target as HTMLInputElement;
    const cursor = document.body.style.cursor;
    
    // canvas__innerにis-activeクラスがあれば削除して処理終了
    if(!el.classList.contains('is-active')) {
      let flg;
      e.currentTarget.childNodes.forEach((i) => {
        const t = (i as HTMLElement)
        if (t.classList.contains('is-active')) {
          t.className = t.className.replace(' is-active', '')
          t.contentEditable = 'false'
          flg = true
        }
      })
      if (flg) {
        return true
      }
    }
    // テキスト追加 or 編集
    if (cursor === 'text' && el.className === 'canvas__inner') {
      const left = `${String(e.nativeEvent.offsetX)}px`
      const top = `${String(e.nativeEvent.offsetY)}px`
      setText([
        ...texts,
        {
          id: texts.length + 1,
          text: 'テキストを入力',
          top,
          left
        }
      ])
    } else if (cursor === 'text') {
      if(!el.classList.contains('is-active')) {
        el.className += ' is-active'
      } else {
        el.contentEditable = 'true'
        el.focus()
      }
    }
  };

  return (
    <div className="canvas" style={canvasSize}>
      <div className="canvas__inner" onClick={addTextElements}>
        {/* テキスト・画像を追加するとここに要素が追加 */}
        {texts.map((text: any, index: number) => (
          <Draggable handle=".is-active" key={index} defaultClassName="is-active">
          <div
            className={`canvas_text${String(index + 1)}`}
            key={index}
            style={{top: text.top, left: text.left}}
          >
            {text.text}
          </div>
          </Draggable>
        ))}
      </div>
    </div>
  )
}

export default Canvas;