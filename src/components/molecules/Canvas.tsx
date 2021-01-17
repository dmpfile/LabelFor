import * as React from 'react';
import { useState, useEffect }  from 'react';
import '../../scss/canvas.scss';
import Draggable from 'react-draggable';
import { v4 as uuidv4 } from 'uuid';
import EditModal from './EditModal'
import GoogleFontLoader from 'react-google-font-loader';

const Canvas: React.FC = () => {
  /* 動的にキャンバスサイズを変える */
  const canvasSize = { width: '50vh', height: '50vh' };
  const [texts, setText] = useState<any>([])
  const [fonts, setFont] = useState<any>([
    {
      font: 'Noto Sans JP',
      weights: [400]
  }
  ])
  const [modalState, setModalState] = useState<boolean>(false)

  const addTextElements = (e: React.MouseEvent<HTMLElement>) => {
    const cursor = document.body.style.cursor;
    const el = e.target as HTMLInputElement; // canvas_inner
    
    if(!el.classList.contains('is-active')) {
      let isFocus = false;
      e.currentTarget.childNodes.forEach((i) => {
        const t = (i as HTMLElement)
        if (t.classList.contains('is-active')) {
          t.className = t.className.replace(' is-active', '')
          t.contentEditable = 'false'
          isFocus = true;
          setModalState(false)

          // テキスト配列情報書き換え
          const targetUUID = t.dataset.uuid;
          const newTexts = texts.filter((el: any) => {
            if (el.uuid == targetUUID) {
              el.text = t.innerHTML ? t.innerHTML : '';
        }
            return true;
      })
          setText([...newTexts])
      }
      })
      if (isFocus) return;
    }

    if (cursor === 'text' && el.className === 'canvas__inner') {
      const left = `${String(e.nativeEvent.offsetX)}px`
      const top = `${String(e.nativeEvent.offsetY)}px`
      setText([
        ...texts,
        {
          uuid: uuidv4(),
          text: 'テキストを入力',
          size: '24px',
          font: 'Noto Sans JP',
          color: '#000000',
          top,
          left
        }
      ])
    } else if (cursor === 'text') {
      if(!el.classList.contains('is-active')) {
        el.className += ' is-active'
      } else {
        setModalState(true)
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
    <>
    <GoogleFontLoader fonts={fonts} />
    <div className="canvas" style={canvasSize}>
      <div className="canvas__inner" onClick={addTextElements}>
        {/* テキスト・画像を追加するとここに要素が追加 */}
        {texts.map((text: any, index: number) => (
          <Draggable key={index} handle=".is-active" defaultClassName="is-active" bounds="parent">
            <div
              className={ 'canvas_text' }
              data-uuid={ text.uuid }
              key={ index }
              style={
                {
                  fontSize: text.size,
                  color: text.color,
                  top: text.top,
                  left: text.left,
                  fontFamily: text.font
                }
              }
            >
              { text.text }
            </div>
          </Draggable>
        ))}
      </div>
    </div>
    { modalState ? <EditModal current={currentTexts} texts={texts} setText={setText} fonts={fonts} setFont={setFont} setModalState={setModalState}/> : null }
    </>
  )
}

export default Canvas;