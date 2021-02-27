import * as React from 'react';
import { useState, useEffect }  from 'react';
import '../../scss/canvas.scss';
import Draggable from 'react-draggable';
import { v4 as uuidv4 } from 'uuid';
import EditModal from './EditModal'
import GoogleFontLoader from 'react-google-font-loader';

type Props = {
  canvasSize: any
}

const Canvas: React.FC<Props> = (props: Props) => {
  /* 動的にキャンバスサイズを変える */
  const canvasSize = props.canvasSize;
  const [texts, setText] = useState<any>([])
  const [currentTexts, setCurrentText] = useState<any>({})
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
          size: '24',
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
        const i = texts.findIndex((e: any) => e.uuid === el.dataset.uuid);
        setCurrentText(texts[i]);
        setModalState(true)
        el.contentEditable = 'true'
        el.focus()
      }
    }
  };

  const delTextElement = (e: any) => {
    const target = document.getElementsByClassName('is-active')[0] as HTMLInputElement;
    if (!!target && e.keyCode === 8) {
      const targetUUID = target.dataset.uuid;
      if (target.contentEditable === 'inherit' || target.contentEditable === 'false') {
        // 削除対象を除いた新しい配列を作成
        const newTexts = texts.filter((el: any) => {
          return el.uuid !== targetUUID;
        })
        setText([...newTexts])
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

  let isDraggable = false
  const snapTextElement = (event: any) => {
    if (event.type === "mousedown") {
      isDraggable = true
    } else if (event.type === "mouseup") {
      isDraggable = false
      document.querySelector('.h-line')?.remove()
      document.querySelector('.v-line')?.remove()
    } else {
      if (!isDraggable) return;

      // canvasサイズ取得
      const cWidth = Number(canvasSize.width.replace('px', ''))
      const cHeight = Number(canvasSize.height.replace('px', ''))

      // .is-active要素の中心座標を取得
      const canvas = document.querySelector(".canvas__inner") as HTMLElement
      const activeElement = document.querySelector(".is-active") as HTMLElement

      const parent = canvas?.getBoundingClientRect()
      const child = activeElement?.getBoundingClientRect()
      
      const childWidth = Math.ceil(activeElement?.offsetWidth / 2)
      const childHeight = Math.ceil(activeElement?.offsetHeight / 2)
      
      const eXCenter = child?.left - parent?.left + childWidth
      const eYCenter = child?.top - parent?.top + childHeight
      
      // スナップ要素作成
      const vSnap = document.createElement("span")
      const hSnap = document.createElement("span")

      vSnap.className = 'v-line'
      hSnap.className = 'h-line'

      vSnap.style.position = "absolute"
      hSnap.style.position = "absolute"

      vSnap.style.backgroundColor = '#208AAE'
      hSnap.style.backgroundColor = '#208AAE'
      
      vSnap.style.width = '2px' 
      vSnap.style.height = `${cHeight}px`
      vSnap.style.top = `0px`
      vSnap.style.left = `${cWidth ? cWidth / 2 : ""}px`

      hSnap.style.width = `${cWidth}px`
      hSnap.style.height = '2px'
      hSnap.style.top = `${cHeight ? cHeight / 2 : ""}px`

      // スナップ要素追加・削除
      if ((cWidth / 2) === eXCenter && !document.querySelector('.v-line')) {
        canvas.insertAdjacentElement("beforeend", vSnap)
      } else {
        document.querySelector('.v-line')?.remove()
      }

      if ((cHeight / 2) === eYCenter && !document.querySelector('.h-line')) {
        canvas.insertAdjacentElement("beforeend", hSnap)
      } else {
        document.querySelector('.h-line')?.remove()
      }
    }
    
  }

  return (
    <>
    <GoogleFontLoader fonts={fonts} />
    <div className="canvas" style={canvasSize} onMouseDown={snapTextElement} onMouseMove={snapTextElement} onMouseUp={snapTextElement}>
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
                  fontSize: text.size + 'px',
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