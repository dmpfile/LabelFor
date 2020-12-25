import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../../scss/canvas.scss';

const Canvas: React.FC = () => {
  /* 動的にキャンバスサイズを変える */
  const canvasSize = { width: '50vh', height: '50vh' };
  const [texts, setText] = useState<any>([])

  const addTextElements = (e: React.MouseEvent<HTMLElement>) => {
    if (document.getElementById('canvas_input')?.childNodes.length) {
      ReactDOM.unmountComponentAtNode(document.getElementById('canvas_input')!);
      return true;
    }

    const el = e.target as HTMLInputElement;
    const cursor = document.body.style.cursor;
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
      e.currentTarget.childNodes.forEach((i) => {
        const t = i as HTMLElement
        t.className = t.className.replace(' is-active', '')
      })
      
      if(!el.classList.contains('is-active')) {
        if (el.type !== 'text') {
          el.className += ' is-active'
          addInputElements(el)
        }
      }
    }
  };

  const addInputElements = (target: HTMLInputElement) => {
    const currentText = target.innerHTML
    const targetPosition = {top: `${target.style.top}`, left: `${target.style.left}`, position: 'absolute'} as React.CSSProperties
    ReactDOM.render(
      <input
        type="text"
        defaultValue={currentText}
        onKeyPress={editTextElements}
        style={targetPosition}
        data-item={target.className} 
        autoFocus>
      </input>,
      document.getElementById('canvas_input')
    )
  }

  const editTextElements = (e: any) => {
    if (e.key === 'Enter') {
      const id = Number(e.target.dataset.item.replace('canvas_text', '').replace('is-active', ''))
      texts[id - 1].text = e.target.value
      setText([...texts])
      ReactDOM.unmountComponentAtNode(document.getElementById('canvas_input')!);
    }
  }

  return (
    <div className="canvas" style={canvasSize}>
      <div className="canvas__inner" onClick={addTextElements}>
        {/* テキスト・画像を追加するとここに要素が追加 */}
        {texts.map((text: any, index: number) => (
          <div 
            className={`canvas_text${String(index + 1)}`}
            key={index}
            style={{top: text.top, left: text.left}}
          >
            {text.text}
          </div>
        ))}
        <div id="canvas_input" className="canvas_input"></div>
      </div>
    </div>
  )
}

export default Canvas;