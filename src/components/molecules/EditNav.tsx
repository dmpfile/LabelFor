import React from 'react';
import '../../scss/editnav.scss';
import { ReactComponent as Text} from '../../assets/text.svg';
import { ReactComponent as Image} from '../../assets/image.svg';
import { ReactComponent as Printer} from '../../assets/printer.svg';
import html2canvas from 'html2canvas';

const EditNav: React.FC = () => {
  const changeCursor = (e: React.MouseEvent<HTMLElement>) => {
    const type = e.currentTarget.dataset.item;
    document.body.style.cursor = type === 'text' ? 'text': '';
  }

  const downloadImg = () => {
    html2canvas(document.querySelector('.canvas__inner') as HTMLElement).then(canvas => {
      const a = document.createElement('a')
      a.href = canvas.toDataURL("image/png")
      a.download = "canvas.png"
      a.click()
      a.remove()
    })
  }

  const printCanvas = () => {
    window.print()
  }

  return (
    <div className="editnav">
      <div className="editnav__inner">
        <ul>
          <li>テキスト<div className="editnav__logo" onClick={changeCursor} data-item={'text'}><Text/></div></li>
          <li>保存<div className="editnav__logo" onClick={downloadImg}><Image/></div></li>
          <li>印刷<div className="editnav__logo" onClick={printCanvas}><Printer/></div></li>
        </ul>
      </div>
    </div>
  )
}

export default EditNav;