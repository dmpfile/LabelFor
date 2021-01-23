import React from 'react';
import '../../scss/editnav.scss';
import { ReactComponent as Text} from '../../assets/text.svg';
import { ReactComponent as Printer} from '../../assets/printer.svg';

const EditNav: React.FC = () => {
  const changeCursor = (e: React.MouseEvent<HTMLElement>) => {
    const type = e.currentTarget.dataset.item;
    document.body.style.cursor = type === 'text' ? 'text': '';
  }

  const printCanvas = () => {
    window.print()
  }

  return (
    <div className="editnav">
      <div className="editnav__inner">
        <ul>
          <li>テキスト<div className="editnav__logo" onClick={changeCursor} data-item={'text'}><Text/></div></li>
          <li>印刷<div className="editnav__logo" onClick={printCanvas}><Printer/></div></li>
        </ul>
      </div>
    </div>
  )
}

export default EditNav;