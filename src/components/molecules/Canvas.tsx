import * as React from 'react';
import { useState, useEffect }  from 'react';
import '../../scss/canvas.scss';
import Draggable from 'react-draggable';
import { v4 as uuidv4 } from 'uuid';

const Canvas: React.FC = () => {
  /* 動的にキャンバスサイズを変える */
  const canvasSize = { width: '50vh', height: '50vh' };
  const [texts, setText] = useState<any>([])

  const generateId = (data: any) => {
    const ids = data.map((el: any) => el.id)
    return ids.length ? Math.max(...ids) + 1 : 0
  }

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
          id: generateId(texts),
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

  const delTextElement = (e: any) => {
    const target = document.getElementsByClassName('is-active')[0] as HTMLInputElement;
    if (e.keyCode === 8) {
      // contentEditableが「初期値 or false」のとき削除される
      // contentEditableはBoolean型ではなく文字列
      if (target && (target.contentEditable === 'inherit' || target.contentEditable === 'false')) {
        const targetId = Number(target.classList[0].replace('canvas_text', '')) - 1
        const index = texts.findIndex((el: any) => el.id === targetId)
        texts.splice(index, 1)
        setText([...texts])
      }
    }
  }

  // 全要素削除されるのを防ぐ処理
  useEffect(() => {
    window.addEventListener('keydown', delTextElement)
    return () => {
      window.removeEventListener('keydown', delTextElement)
    }
  }, [delTextElement])

  return (
    <div className="canvas" style={canvasSize}>
      <div className="canvas__inner" onClick={addTextElements}>
        {/* テキスト・画像を追加するとここに要素が追加 */}
        {texts.map((text: any, index: number) => (
          <Draggable key={index} handle=".is-active" defaultClassName="is-active" bounds="parent">
            <div
              className={ 'canvas_text' }
              data-uuid={ text.uuid }
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